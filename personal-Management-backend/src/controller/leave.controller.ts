import { NextFunction, Request, Response } from "express";
import Leave from "../model/leave.model";

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

// Function to count leave types
export const getCountLeaveTypes = async (req: Request, res: Response) => {
  try {
    const leaveCounts = await Leave.aggregate([
      {
        $group: {
          _id: "$leaveType", // Group by leaveType
          count: { $sum: 1 }, // Count each leave type
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
