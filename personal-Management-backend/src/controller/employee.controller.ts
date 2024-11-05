import { NextFunction, Request, Response } from "express";
import Employee from "../model/employee.model";

export const getAllEmployee = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const employees= await Employee.find({});

    res.status(200).json({
      message: "employees get successfully",
      data: employees,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getSingleEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const employee = await Employee.findById(req.params.id);

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

export const addEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;

    if (Object.keys(data).length === 0) {
      throw new Error("Request body is empty");
    }

    const employee = await Employee.create(data);

    res.status(201).json({
      message: "employee created successfully",
      data: employee,
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      throw new Error("No record found");
    }

    const data= await Employee.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      message: "Employee updated successfully",
      data: data,
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (err: any) {
    next(err);
  }
};
