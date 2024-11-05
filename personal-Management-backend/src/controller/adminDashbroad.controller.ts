import { NextFunction, Request, Response } from "express";
import Employee from "../model/employee.model";

// get  total employees
export const getTotalEmployee = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    res.status(200).json({
      success: true,
      message: "Total employees get successfully",
      data: totalEmployees,
    });
  } catch (err: any) {
    next(err);
  }
};

