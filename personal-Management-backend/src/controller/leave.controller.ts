import { NextFunction, Request, Response } from "express";
import Leave from "../model/leave.model";
import { startOfMonth, endOfMonth } from "date-fns";
import { ObjectId } from "mongodb";

export const getAllLeave = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const leaves = await Leave.find({});

    res.status(200).json({
      message: "Leaves get successfully",
      data: leaves,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getSingleLeave = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      throw new Error("No record found");
    }

    res.status(200).json({
      message: "Leave get successully",
      data: leave,
    });
  } catch (err: any) {
    next(err);
  }
};


// Controller to get monthly leave counts for an employee
export const getMonthlyLeaveCounts = async (req: Request, res: Response,next: NextFunction) => {
  try {
    const { employeeId, year, month } = req.query;
    console.log(employeeId, year, month);

    if (!employeeId || !year || !month) {
      return res
        .status(400)
        .json({ error: "Employee ID, year, and month are required" });
    }

    const employeeObjectId = new ObjectId(employeeId as string);
    const startDate = startOfMonth(new Date(Number(year), Number(month) - 1));
    const endDate = endOfMonth(new Date(Number(year), Number(month) - 1));

    const leaveCounts = await Leave.aggregate([
      {
        $match: {
          employeeId: employeeObjectId,
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: "$leaveType",
          count: { $sum: 1 },
        },
      },
    ]);

    const response = {
      "Non-Leave":0,
      "Paid-Leave": 0,
      "Sick-Leave": 0,
    };

    leaveCounts.forEach((leave) => {
      response[leave._id as keyof typeof response] = leave.count;
    });

    // Get the total number of days in the current month
    const today = new Date();
    const currentMonthTotalDays = new Date(Number(year), Number(month) - 1 + 1, 0).getDate(); // Days in the month
    const currentDay = today.getDate(); 
    
    // Calculate Non-Leave as (Total Days in the month till today) - (Paid-Leave + Sick-Leave)
    const nonLeave = currentDay - (response["Paid-Leave"] + response["Sick-Leave"]);
    response["Non-Leave"] = nonLeave >= 0 ? nonLeave : 0; 


    return res.json({ employeeId, year, month, leaveCounts: response });
  } catch (error:any) {
    next(error)
  }
};

// Controller function to get today's count of leaveStatus
export const getTodayLeaveStatusCounts = async (req: Request, res: Response) => {
  try {
    // Get the start and end of today in ISO format
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const todayCounts = await Leave.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfDay, $lte: endOfDay },
        },
      },
      {
        $group: {
          _id: "$leaveStatus",
          count: { $sum: 1 },
        },
      },
    ]);

    const counts = todayCounts.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    res.status(200).json({
      approved: counts["Approved"] || 0,
      denied: counts["Denied"] || 0,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching today's leave status counts", error });
  }
};

// Controller function to get monthly count of leaveStatus
export const getMonthlyLeaveStatusCounts = async (req: Request, res: Response) => {
  try {
    const monthlyCounts = await Leave.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
            leaveStatus: "$leaveStatus",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: { month: "$_id.month", year: "$_id.year" },
          statuses: {
            $push: {
              leaveStatus: "$_id.leaveStatus",
              count: "$count",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          year: "$_id.year",
          counts: {
            Approved: {
              $cond: {
                if: {
                  $gt: [
                    {
                      $arrayElemAt: [
                        "$statuses.count",
                        {
                          $indexOfArray: ["$statuses.leaveStatus", "Approved"],
                        },
                      ],
                    },
                    0,
                  ],
                },
                then: {
                  $arrayElemAt: [
                    "$statuses.count",
                    { $indexOfArray: ["$statuses.leaveStatus", "Approved"] },
                  ],
                },
                else: 0,
              },
            },
            Denied: {
              $cond: {
                if: {
                  $gt: [
                    {
                      $arrayElemAt: [
                        "$statuses.count",
                        { $indexOfArray: ["$statuses.leaveStatus", "Denied"] },
                      ],
                    },
                    0,
                  ],
                },
                then: {
                  $arrayElemAt: [
                    "$statuses.count",
                    { $indexOfArray: ["$statuses.leaveStatus", "Denied"] },
                  ],
                },
                else: 0,
              },
            },
          },
        },
      },
      {
        $sort: { year: 1, month: 1 },
      },
    ]);

    res.status(200).json(monthlyCounts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching monthly leave status counts", error });
  }
};



// Function to count leave types
export const getCountLeaveTypes = async (req: Request, res: Response) => {
  try {
    const leaveCounts = await Leave.aggregate([
      {
        $group: {
          _id: "$leaveType", 
          count: { $sum: 1 }, 
        },
      },
    ]);

    res.status(200).json({
      counts: leaveCounts,
    });
  } catch (error) {
    res.status(500).json({ message: "Error counting leave types", error });
  }
};

export const addLeave = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;

    if (Object.keys(data).length === 0) {
      throw new Error("Request body is empty");
    }

    const leave = await Leave.create(data);

    res.status(201).json({
      message: "Leave created successfully",
      data: leave,
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateLeave = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      throw new Error("No record found");
    }

    const data = await Leave.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      message: "Leave updated successfully",
      data: data,
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteLeave = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await Leave.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (err: any) {
    next(err);
  }
};
