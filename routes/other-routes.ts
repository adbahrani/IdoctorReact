import { Router } from "express";

import otherController from "../controllers/other-controller";

let otherRoutes = Router();

otherRoutes.post("/contact", otherController.contactUs);

export default otherRoutes;
