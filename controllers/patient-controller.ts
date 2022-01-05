import { RequestHandler } from "express";
import { Document, startSession } from "mongoose";

import PatientModel, { IPatient } from "../models/PatientModel";
import UserModel, { IUser } from "../models/UserModel";
import validationErrorHandler from "../utils/validation-error-handler";
import PatientVisitModel, { IPatientVisit } from "../models/PatientVisitModel";

const getAllPatients: RequestHandler = async (req, res, next) => {
  let patients;

  let { userId } = req.params;
  try {
    let user: IUser | null = await UserModel.findById(userId);
    if (user) {
      let patientIds = user.patients;
      if (user.email.toLocaleLowerCase().includes("admin"))
        patients = await PatientModel.find({}).limit(1000);
      else
        patients = await PatientModel.find({ _id: { $in: patientIds } }).limit(
          100
        );
    } else {
      return res
        .status(404)
        .json({ message: "Your user id is not found, try login out and in" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  return res.json({
    patients: patients.map(patient => {
      return patient.toObject({ getters: true });
    })
  });
};

const createPatient: RequestHandler = async (req, res, next) => {
  const validationError = validationErrorHandler(req, res);

  if (validationError) {
    console.log(validationError);
    return validationError;
  }

  const { userId } = req.body;

  let newPatient = { ...req.body };
  delete newPatient.userId;

  let currentUser: (IUser & Document<any, any, IUser>) | null;
  try {
    currentUser = await UserModel.findById(userId);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!currentUser) {
    return res
      .status(404)
      .json({ message: "Your user id is not found, try login out and in" });
  }

  let createdPatient = new PatientModel({
    ...newPatient,
    history: {},
    visits: []
  });

  try {
    const sess = await startSession();
    sess.startTransaction();
    await createdPatient.save();
    currentUser.patients.push(createdPatient.id);
    await currentUser.save();
    sess.commitTransaction();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }

  res.status(201).json({ patient: createdPatient.toObject({ getters: true }) });
};

const updateHistory: RequestHandler = async (req, res, next) => {
  const validationError = validationErrorHandler(req, res);

  if (validationError) {
    return validationError;
  }

  let requestBody = req.body;

  let foundPatient: (IPatient & Document<any, any, IPatient>) | null;
  try {
    foundPatient = await PatientModel.findById(requestBody.patient);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!foundPatient) {
    return res
      .status(404)
      .json({ message: "Could not find patient for given patient ID" });
  }

  foundPatient.history = requestBody;

  let updatedPatient: (IPatient & Document<any, any, IPatient>) | null;
  try {
    updatedPatient = await foundPatient.save();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json({ patient: updatedPatient });
};

const deletePatient: RequestHandler = async (req, res, next) => {
  const validationError = validationErrorHandler(req, res);

  let patientId = req.params.patientId;

  if (validationError) {
    return validationError;
  }

  let foundPatient: (IPatient & Document<any, any, IPatient>) | null;

  try {
    const sess = await startSession();
    sess.startTransaction();
    foundPatient = await PatientModel.findById(patientId);

    if (!foundPatient) {
      return res
        .status(404)
        .json({ message: "Could not find patient for given patient ID" });
    }

    let { visits: visitIds }: any = foundPatient;
    await foundPatient.delete();
    let visits: Document<any, any, IPatientVisit>[] | null =
      await PatientVisitModel.find({ _id: { $in: visitIds } });
    let records = await PatientVisitModel.deleteMany({ _id: visits });
    console.log(records);
    sess.commitTransaction();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.status(204).json({ patient: foundPatient });
};

const getPatient: RequestHandler = async (req, res, next) => {
  const validationError = validationErrorHandler(req, res);

  if (validationError) {
    return validationError;
  }

  let requestBodyParams = req.params;

  let foundPatient: (IPatient & Document<any, any, IPatient>) | null;
  try {
    foundPatient = await PatientModel.findById(requestBodyParams.patientId);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!foundPatient) {
    return res
      .status(404)
      .json({ message: "Could not find patient for given patient ID" });
  }

  res.json({ patient: foundPatient });
};

const patientController = {
  getAllPatients,
  getPatient,
  createPatient,
  updateHistory,
  deletePatient
};

export default patientController;
