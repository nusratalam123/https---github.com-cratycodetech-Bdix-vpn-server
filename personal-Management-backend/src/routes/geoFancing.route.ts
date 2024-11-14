import { Router } from "express";
import {
  geocodeLocation,
  getAllGeocodeLocation,
  getSingleGeocodeLocation,
  getsingleEmployeeLocation,
} from "../controller/geoFancing.controller";

const router = Router();

router.post("/create", geocodeLocation);
router.get("/all", getAllGeocodeLocation);
// get single employee
router.get("/single/:id", getSingleGeocodeLocation);
router.get("/single-employee", getsingleEmployeeLocation);

export default router;
