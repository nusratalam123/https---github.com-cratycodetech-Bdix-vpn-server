import { Router } from "express";
import {
  geocodeLocation,
  getAllGeocodeLocation,
  getLocationsByEmployeeId,
  getsingleEmployeeLocation,
} from "../controller/geoFancing.controller";

const router = Router();

//get all employee geofancing info
router.get("/all", getAllGeocodeLocation);

// get single employee
router.get("/single/:employeeId", getLocationsByEmployeeId);

//get single employeeId ,employeeName,location
router.get("/single-employee", getsingleEmployeeLocation);

// create employee latitude and longitude according to location
router.post("/create", geocodeLocation);

export default router;
