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
  getEmployeeMonthlyAbsent,
  getSingleEmployee,
  getAllEmployeeMonthlyAttendancecount,
  markAttendance,
  setDefaultAttendance,
  updateattendance,
  deleteAttendance,
} from "../controller/attendance.controller";

const router = Router();

// get today present employee
router.get("/TotalPresent", getTodayPresentEmployees);

// get today count  present employee
router.get("/countPresent", getCountTodayPresentEmployees); //for graph

// get today Late Arrival employee
router.get("/TotalLate", getTodayLateArrivalEmployees);

// get today absent employee
router.get("/TotalAbsent", getTodayAbsentEmployees);

// get today count absent employee
router.get("/countAbsent", getCountTodayAbsentEmployees); //for graph

// get all employee monthly present
router.get("/Total-Month-present", getMonthlyAttendanceCounts);

// get sigle employee monthly present count
router.get("/monthly/:employeeId", getEmployeeMonthlyAttendance); //for graph

// get sigle employee monthly late arrival count
router.get("/monthly-late/:employeeId", getEmployeeMonthlyLateArrival); //for graph

// get sigle employee monthly absent count
router.get("/monthly-absent/:employeeId", getEmployeeMonthlyAbsent);

// get all employee monthly attandance count
router.get("/all/monthly-attendance", getAllEmployeeMonthlyAttendancecount);//for leave page graph

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
