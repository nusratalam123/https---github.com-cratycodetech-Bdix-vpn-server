import { Router } from "express";
import {
  getAllSalary,
  getSingleSalary,
  addSalary,
  updateSalary,
  deleteSalary,
} from "../controller/salary.controller";

const router = Router();

// get all salary
router.get("/all", getAllSalary);

// get single salary
router.get("/single/:id", getSingleSalary);

// create employee salary
router.post("/create", addSalary);

//update employee salary
router.put("/update/:id", updateSalary);

// delete employee salary
router.delete("/delete/:id", deleteSalary);

export default router;
