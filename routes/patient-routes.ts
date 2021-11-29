import { Router } from "express";
import { check } from "express-validator";

import patientController from "../controllers/patient-controller";

const patientRoutes = Router();

patientRoutes.get("/all", patientController.getAllPatients);

patientRoutes.post(
  "",
  [
    check("fullName").not().isEmpty().withMessage("must not be empty"),
    check("gender").not().isEmpty().withMessage("must not be empty"),
    // check("phoneNumber")
    //   .isMobilePhone("ar-IQ")
    //   .withMessage("is an invalid phone number"),
    check("maritalStatus")
      .isAlphanumeric("en-US")
      .withMessage("must only contain alphanumeric characters")
      .isLength({ min: 1, max: 1 })
      .withMessage("must only contain 1 character")
  ],
  patientController.createPatient
);

patientRoutes.patch(
  "/history",
  check("patient").not().isEmpty().withMessage("must not be empty"),
  patientController.updateHistory
);

patientRoutes.get("/:patientId", patientController.getPatient);

patientRoutes.delete("/:patientId", patientController.deletePatient);

export default patientRoutes;
