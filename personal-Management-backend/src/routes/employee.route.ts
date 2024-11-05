import { Router } from "express";
import {
  getAllEmployee,
  getSingleEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee
} from "../controller/employee.controller";

const router = Router();

// get all employee 
router.get("/all", getAllEmployee);

// get single employee 
router.get("/single/:id", getSingleEmployee);

// employee create 
router.post("/create", addEmployee);

//update employee 
router.put("/update/:id", updateEmployee);

// delete employee
router.delete("/delete/:id", deleteEmployee);

export default router;
