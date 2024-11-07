import { NextFunction, Request, Response } from "express";
import Employee from "../model/employee.model";
import GeoFancing from "../model/geoFancing.model";
import NodeGeocoder from "node-geocoder";
import fetch from "node-fetch";

export const geocodeLocation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { location ,radius} = req.body;

    if (!location) {
      return res.status(400).json({ message: "Location is required" });
    }

    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      location,
    )}`;

    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": "Pms/1.0 (craftycode@gmail.com)", // Provide your app's name and email
      },
    });

    const data = await response.json() as any[];
    

    if (data.length > 0) {
      const { lat, lon } = data[0];

       const geoFancingData = await GeoFancing.create({
         location: {
           type: "Point",
           coordinates: [lon, lat], // Save longitude first, then latitude
         },
         latitude: lat,
         longitude: lon,
         radius: radius,
       });

      
      console.log(`Latitude: ${lat}, Longitude: ${lon}`);

      // Respond with the coordinates
      return res.status(200).json({
        messsage: "Location Found",
        data: geoFancingData,
        // latitude: lat, longitude: lon
      });
    } else {
      return res.status(404).json({ message: "Location not found" });
    }
  } catch (error:any) {
    next(error);
  }
};


export const getAllGeocodeLocation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const finds = await GeoFancing.find();

    if (!finds) {
      throw new Error("No record found");
    }

    res.status(200).json({
      message: "Location get successully",
      data: finds,
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

    const data = await Employee.findByIdAndUpdate(req.params.id, req.body);

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
