import { Router } from "express";
import {
  getTodayPresentEmployees,
  getTodayAbsentEmployees,
  getTodayLateArrivalEmployees,
  getMonthlyAttendanceCounts,
  getAllEmployeeAttendance,
  getEmployeeMonthlyAttendance,
  getEmployeeMonthlyLateArrival,
  getSingleEmployee,
  markAttendance,
  updateattendance,
  deleteAttendance,
} from "../controller/attendance.controller";

const router = Router();

// get today present employee
router.get("/TotalPresent", getTodayPresentEmployees);

// get today Late Arrival employee
router.get("/TotalLate", getTodayLateArrivalEmployees);

// get today absent employee
router.get("/TotalAbsent", getTodayAbsentEmployees);

// get all employee monthly present
router.get("/Total-Month-present", getMonthlyAttendanceCounts);

// get sigle employee monthly present
router.get("/monthly/:employeeId", getEmployeeMonthlyAttendance);

// get sigle employee monthly late arrival
router.get("/monthly-late/:employeeId", getEmployeeMonthlyLateArrival);

// get all employee attandance
router.get("/all", getAllEmployeeAttendance);

// get single employee attandance
router.get("/single/:id", getSingleEmployee);

// employee create
router.post("/create", markAttendance);

//update employee
router.put("/update/:id", updateattendance);

// delete employee
router.delete("/delete/:id", deleteAttendance);

export default router;
