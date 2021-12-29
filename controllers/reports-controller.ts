import { RequestHandler } from "express";

import PatientModel from "../models/PatientModel";
import PatientVisitModel from "../models/PatientVisitModel";
import UserModel, { IUser } from "../models/UserModel";

const newCountAggregate = [
  {
    $group: {
      _id: {
        $dateToString: {
          format: "%Y-%m-%d",
          date: "$createdAt"
        }
      },
      count: { $sum: 1 }
    }
  },
  {
    $sort: {
      _id: -1
    }
  },
  {
    $project: {
      date: "$_id",
      count: 1,
      _id: 0
    }
  }
];

const getNewPatients: RequestHandler = async (req, res, next) => {
  let newPatients;
  let { userId } = req.params;
  console.log(userId);
  try {
    let user: IUser | null = await UserModel.findById(userId);

    let aggregate = [
      { $match: { _id: { $in: user?.patients } } },
      ...newCountAggregate
    ];
    console.log(aggregate);
    newPatients = await PatientModel.aggregate(aggregate);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  return res.json({ newPatients });
};

const getNewVisits: RequestHandler = async (req, res, next) => {
  let newVisits;

  try {
    newVisits = await PatientVisitModel.aggregate(newCountAggregate);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  return res.json({ newVisits });
};

const reportsController = {
  getNewPatients,
  getNewVisits
};

export default reportsController;
