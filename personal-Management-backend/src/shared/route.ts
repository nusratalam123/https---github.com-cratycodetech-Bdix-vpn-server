import { Router } from "express";
import authRoutes from "./../routes/auth.route";
import employeeRoutes from "./../routes/employee.route";
import dashbroadRoutes from "./../routes/adminDashbroad.route";
import attendanceRoutes from "./../routes/attendance.route";
import leaveRoutes from "./../routes/leave.route";
import salaryRoutes from "./../routes/salary.route";
import announcementRoutes from "./../routes/announcement.route";


const router = Router();

// Root route
router.get("/", (_, res) => {
  res.send("App Working successfully");
});

// general Routes
router.use("/auth", authRoutes);
router.use("/employee", employeeRoutes);
router.use("/dashbroad", dashbroadRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/leave", leaveRoutes);
router.use("/salary", salaryRoutes);
router.use("/announcement", announcementRoutes);



// Handle not found
router.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default router;
