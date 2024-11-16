import { Router } from "express";
import {
  deleteLeave,
  updateLeave,
  addLeave,
  getSingleLeave,
  getCountLeaveTypes,
  getMonthlyLeaveStatusCounts,
  getTodayLeaveStatusCounts,
  getMonthlyLeaveCounts,
  getAllLeave,
} from "../controller/leave.controller";

const router = Router();

// get all leave employee
router.get("/all", getAllLeave);

// get single leave  employee
router.get("/single/:id", getSingleLeave);

// get count value according to  type of leave  employee
router.get("/type", getCountLeaveTypes);

// get count value according to  type of leave  employee
router.get("/leave-counts", getMonthlyLeaveCounts); //for graph

// get count today value according to  type of leave status  employee
router.get("/today-leave-status-counts", getTodayLeaveStatusCounts); //for graph

// get count monthly value according to  type of leave status  employee
router.get("/leave-status-counts", getMonthlyLeaveStatusCounts);

// employee create leave
router.post("/create", addLeave);

//update employee leave info
router.put("/update/:id", updateLeave);

// delete employee leave info
router.delete("/delete/:id", deleteLeave);

export default router;
