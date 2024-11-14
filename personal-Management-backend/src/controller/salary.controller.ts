import { NextFunction, Request, Response } from "express";
import Salary from "../model/salary.model";
import {
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  format,
} from "date-fns";


export const getAllSalary = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const salarys = await Salary.find({});

    res.status(200).json({
      message: "Salary get successfully",
      data: salarys,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getSingleSalary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const salary = await Salary.findById(req.params.id);

    if (!salary) {
      throw new Error("No record found");
    }

    res.status(200).json({
      message: "Salary get successully",
      data: salary,
    });
  } catch (err: any) {
    next(err);
  }
};

// Function to get count salary status distribution 
export const getCountDistributionSalary = async (req: Request, res: Response,next: NextFunction) => {
  try {
    const distribution = await Salary.find({
      salaryStatus: "Distribution"
    });

    res.status(200).json({
      count: distribution.length,
      name: "Distribution",
    });
  } catch (error) {
    next(error);
  }
};

// Function to get count salary status pending 
export const getCountPendingSalary = async (req: Request, res: Response,next: NextFunction) => {
  try {
    const pending = await Salary.find({
      salaryStatus: "Pending",
    });

    res.status(200).json({
      count: pending.length,
      name: "pending",
    });
  } catch (error) {
    next(error);
  }
};

// Function to get count salary status deduction
export const getCountDeductionSalary = async (req: Request, res: Response,next: NextFunction) => {
  try {
    const deduction = await Salary.find({
      salaryStatus: "Deduction",
    });

    res.status(200).json({
      count: deduction.length,
      name: "deduction",
    });
  } catch (error) {
    next(error);
  }
};


export const addSalary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;

    if (Object.keys(data).length === 0) {
      throw new Error("Request body is empty");
    }

    const salary = await Salary.create(data);

    res.status(201).json({
      message: "Salary created successfully",
      data: salary,
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateSalary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const salary = await Salary.findById(req.params.id);

    if (!salary) {
      throw new Error("No record found");
    }

    const data = await Salary.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      message: "Salary updated successfully",
      data: data,
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteSalary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await Salary.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Salary deleted successfully",
    });
  } catch (err: any) {
    next(err);
  }
};
