import { Router } from "express";
import {
  getTodayPresentEmployees,
  getTodayAbsentEmployees,
  getTodayLateArrivalEmployees,
  getCountTodayPresentEmployees,
  getCountTodayAbsentEmployees,
  getMonthlyAttendanceCounts,
  getAllEmployeeAttendance,
  getEmployeeMonthlyAttendance,
  getEmployeeMonthlyLateArrival,
  getSingleEmployee,
  markAttendance,
  setDefaultAttendance,
  updateattendance,
  deleteAttendance,
} from "../controller/attendance.controller";

const router = Router();

// get today present employee
router.get("/TotalPresent", getTodayPresentEmployees);

// get today count  present employee
router.get("/countPresent", getCountTodayPresentEmployees);

// get today Late Arrival employee
router.get("/TotalLate", getTodayLateArrivalEmployees);

// get today absent employee
router.get("/TotalAbsent", getTodayAbsentEmployees);

// get today count absent employee
router.get("/countAbsent", getCountTodayAbsentEmployees);

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

// set default employee attandance
router.post("/set-default-attendance",setDefaultAttendance);

// create employee attendance
router.post("/create", markAttendance);

//update employee attendance
router.put("/update/:id", updateattendance);

// delete employee attendance
router.delete("/delete/:id", deleteAttendance);

export default router;
