import { NextFunction, Request, Response } from "express";
import Attendance from "../model/attendance.model";
import { startOfDay, endOfDay, startOfMonth, endOfMonth, format } from "date-fns";  // date-fns library to get start and end of today
import Employee from "../model/employee.model";
import cron from "node-cron";


export const getAllEmployeeAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const attendanceRecords = await Attendance.find({})
      .populate("employeeId") // Populates the employee data
      .exec();;

    res.status(200).json({
      count: attendanceRecords.length,
      attendanceRecords: attendanceRecords,
    });
  } catch (error:any) {
    next(error);
  }
};

// Function to get today's "Present" employees
export const getTodayPresentEmployees = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const today = new Date();
    const start = startOfDay(today);
    const end = endOfDay(today);

    const presentEmployees = await Attendance.find({
      status: "Present",
      date: { $gte: start, $lte: end },
    });

    res.status(200).json({
      count: presentEmployees.length,
      employees: presentEmployees,
    });
  } catch (error: any) {
    next(error);
  }
};


// Function to get today's "OnLeave" employees
export const getTodayAbsentEmployees = async (req: Request, res: Response,next: NextFunction) => {
  try {
    const today = new Date();
    const start = startOfDay(today);
    const end = endOfDay(today);

    const onLeaveEmployees = await Attendance.find({
      status: "Absent",
      date: { $gte: start, $lte: end },
    });

    res.status(200).json({
      count: onLeaveEmployees.length,
      employees: onLeaveEmployees,
    });
  } catch (error) {
    next(error);
  }
};



// Function to get today's "LateArrival" employees
export const getTodayLateArrivalEmployees = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const start = startOfDay(today);
    const end = endOfDay(today);

    const lateArrivalEmployees = await Attendance.find({
      status: "LateArrival",
      date: { $gte: start, $lte: end },
    });

    res.status(200).json({
      count: lateArrivalEmployees.length,
      employees: lateArrivalEmployees,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching late-arrival employees", error });
  }
};

export const getSingleEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const employee = await Attendance.findById(req.params.id);

    if (!employee) {
      throw new Error("No record found");
    }

    res.status(200).json({
      message: "Employee get successully",
      data: employee,
    });
  } catch (err: any) {
    next(err);
  }
};

// Function to get monthly attendance counts
export const getMonthlyAttendanceCounts = async (
  req: Request,
  res: Response,
) => {
  try {
    const { month, year } = req.query;
    if (!month || !year) {
      return res.status(400).json({ message: "Month and year are required." });
    }

    const start = startOfMonth(new Date(Number(year), Number(month) - 1));
    const end = endOfMonth(start);

    const attendanceCounts = await Attendance.aggregate([
      {
        $match: {
          date: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: "$employeeId",
          totalPresent: { $sum: "$totalPresent" },
          totalLateArrival: { $sum: "$totalLateArrival" },
        },
      },
      {
        $lookup: {
          from: "employees",
          localField: "_id",
          foreignField: "_id",
          as: "employeeInfo",
        },
      },
      {
        $unwind: "$employeeInfo",
      },
      {
        $project: {
          _id: 0,
          employeeId: "$_id",
          employeeName: "$employeeInfo.name",
          totalPresent: 1,
          totalLateArrival: 1,
        },
      },
    ]);

    res.status(200).json(attendanceCounts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving monthly attendance counts", error });
  }
};


// Function to get employee monthly attendance
export const getEmployeeMonthlyAttendance = async (
  req: Request,
  res: Response,
) => {
  try {
    const { employeeId } = req.params;
    const month = parseInt(req.query.month as string);
    const year = parseInt(req.query.year as string);

    // Calculate the start and end of the specified month
    const start = startOfMonth(new Date(year, month - 1));
    const end = endOfMonth(new Date(year, month - 1));

    // Find attendance records for the employee within the specified month
    const attendanceRecords = await Attendance.find({
      employeeId,
      date: { $gte: start, $lte: end },
    });

    // Count the total days marked as "Present" and "LateArrival"
    const totalPresent = attendanceRecords.filter(
      (record) => record.status === "Present",
    ).length;
    const totalLateArrival = attendanceRecords.filter(
      (record) => record.status === "LateArrival",
    ).length;

    const present=totalPresent+totalLateArrival

    // Return the summary
    res.status(200).json({
      employeeId,
      month,
      year,
      present,
      totalLateArrival,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving attendance data", error });
  }
};

// Function to get employee monthly attendance
export const getEmployeeMonthlyLateArrival = async (
  req: Request,
  res: Response,
) => {
  try {
    const { employeeId } = req.params;
    const month = parseInt(req.query.month as string);
    const year = parseInt(req.query.year as string);

    // Calculate the start and end of the specified month
    const start = startOfMonth(new Date(year, month - 1));
    const end = endOfMonth(new Date(year, month - 1));

    // Find attendance records for the employee within the specified month
    const attendanceRecords = await Attendance.find({
      employeeId,
      date: { $gte: start, $lte: end },
    });

    const totalLateArrival = attendanceRecords.filter(
      (record) => record.status === "LateArrival",
    ).length;

    // Return the summary
    res.status(200).json({
      employeeId,
      month,
      year,
      totalLateArrival,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving attendance data", error });
  }
};



// Utility function to check time range
const isTimeInRange = (time: string, start: string, end: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  const [startHours, startMinutes] = start.split(":").map(Number);
  const [endHours, endMinutes] = end.split(":").map(Number);

  const currentTime = hours * 60 + minutes;
  const startTime = startHours * 60 + startMinutes;
  const endTime = endHours * 60 + endMinutes;

  return currentTime >= startTime && currentTime <= endTime;
};

// Schedule a cron job to reset totalPresent at the start of each month
cron.schedule("0 0 1 * *", async () => {
  try {
    await Attendance.updateMany(
      {},
      { $set: { totalPresent: 0, totalLateArrival: 0 } },
    );
    console.log("TotalPresent count reset for all employees.");
  } catch (error) {
    console.error("Error resetting totalPresent count:", error);
  }
});

export const markAttendance = async (req: Request, res: Response) => {
  try {
    const { employeeId } = req.body;
    const date = startOfDay(new Date());
    const arrivalTime = req.body.arrivalTime || format(new Date(), "HH:mm"); // Set to current time if not provided
    let status = "Absent"; // Default status

    // Determine the status based on arrivalTime
    if (arrivalTime && isTimeInRange(arrivalTime, "09:00", "09:10")) {
      status = "Present";
    } else if (arrivalTime && isTimeInRange(arrivalTime, "09:10", "17:00")) {
      status = "LateArrival";
    } else {
      const start = startOfDay(date);
      const end = endOfDay(date);

      // Fetch all employees from the Employee collection
      const allEmployees = await Employee.find();

      // Loop through each employee
      const promises = allEmployees.map(async (employee) => {
        const attendanceRecord = await Attendance.findOne({
          employeeId: employee._id,
          date: { $gte: start, $lte: end },
        });

        // If no attendance record or the status is neither "Present" nor "LateArrival"
        if (
          !attendanceRecord ||
          (attendanceRecord.status !== "Present" &&
            attendanceRecord.status !== "LateArrival")
        ) {
          // Either update existing record to "Absent" or create a new record with "Absent" status
          await Attendance.updateOne(
            { employeeId: employee._id, date: { $gte: start, $lte: end } },
            { $set: { status: "Absent", date: date } },
            { upsert: true }, // Create a new document if no match is found
          );
        }
      });

      // Wait for all promises to complete
      await Promise.all(promises);
    }

    // Update attendance and increment totalPresent or totalLateArrival
    const attendance = await Attendance.findOneAndUpdate(
      { employeeId, date },
      {
        employeeId,
        arrivalTime,
        date,
        status,
        officeHour: "09:00",
        $inc:
          status === "Present"
            ? { totalPresent: 1 }
            : status === "LateArrival"
              ? { totalLateArrival: 1 }
              : {},
      },
      { new: true, upsert: true },
    );

    const savedAttendance = await attendance.save();
    res.status(201).json(savedAttendance);
  } catch (error) {
    res.status(500).json({ message: "Error marking attendance", error });
  }
};

export const updateattendance = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const attandance = await Attendance.findById(req.params.id);

    if (!attandance) {
      throw new Error("No record found");
    }

    const data = await Attendance.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      message: "Attendance updated successfully",
      data: data,
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteAttendance = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Attendance deleted successfully",
    });
  } catch (err: any) {
    next(err);
  }
};
