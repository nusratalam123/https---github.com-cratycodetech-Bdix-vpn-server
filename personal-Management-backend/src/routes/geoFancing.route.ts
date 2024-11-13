import { Router } from "express";
import {
  geocodeLocation,
  getAllGeocodeLocation,
  getsingleEmployeeLocation,
} from "../controller/geoFancing.controller";

const router = Router();

router.post("/create", geocodeLocation);
router.get("/all", getAllGeocodeLocation);
router.get("/single-employee", getsingleEmployeeLocation);

export default router;
