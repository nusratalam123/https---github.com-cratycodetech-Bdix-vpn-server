import { Router } from "express";

import {
  geocodeLocation,
  getAllGeocodeLocation,
} from "../controller/geoFancing.controller";

const router = Router();


router.post("/create", geocodeLocation);
router.get("/all", getAllGeocodeLocation);



export default router;
