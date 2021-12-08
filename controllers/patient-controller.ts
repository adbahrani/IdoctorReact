import { RequestHandler } from "express";
import { Document, startSession } from "mongoose";

import PatientModel, { IPatient } from "../models/PatientModel";
import UserModel, { IUser } from "../models/UserModel";
import validationErrorHandler from "../utils/validation-error-handler";

const getAllPatients: RequestHandler = async (req, res, next) => {
  let patients;

  try {
    patients = await PatientModel.find({});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  return res.json({
    patients: patients.map((patient) => {
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

  const {
    fullName,
    dob,
    gender,
    phoneNumber,
    address,
    zipCode,
    maritalStatus,
    job = "",
    userId
  } = req.body;

  console.log(req.body);

  let currentUser: (IUser & Document<any, any, IUser>) | null;
  try {
    currentUser = await UserModel.findById(userId);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  let createdPatient = new PatientModel({
    fullName,
    dob,
    gender,
    phoneNumber,
    address,
    zipCode,
    maritalStatus,
    job,
    history: {},
    visits: []
  });

  if (!currentUser) {
    return res
      .status(404)
      .json({ message: "Could not find patient for given User ID" });
  }

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
  console.log(req.params);

  if (validationError) {
    return validationError;
  }

  let foundPatient: (IPatient & Document<any, any, IPatient>) | null;
  try {
    foundPatient = await PatientModel.findById(patientId);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!foundPatient) {
    return res
      .status(404)
      .json({ message: "Could not find patient for given patient ID" });
  }

  try {
    foundPatient = await foundPatient.delete();
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
