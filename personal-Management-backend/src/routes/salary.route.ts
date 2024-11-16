import { Router } from "express";
import {
  getAllSalary,
  getSingleSalary,
  getCountDistributionSalary,
  getCountPendingSalary,
  getCountDeductionSalary,
  addSalary,
  updateSalary,
  deleteSalary,
} from "../controller/salary.controller";

const router = Router();

// get all salary
router.get("/all", getAllSalary);

// get single salary
router.get("/single/:id", getSingleSalary);

// get count Distribution count salary
router.get("/distribution", getCountDistributionSalary); //for graph

// get count deduction  count salary
router.get("/deduction", getCountDeductionSalary);//for graph

// get count Pending  count salary
router.get("/pending", getCountPendingSalary);//for graph

// create employee salary
router.post("/create", addSalary);

//update employee salary
router.put("/update/:id", updateSalary);

// delete employee salary
router.delete("/delete/:id", deleteSalary);

export default router;
