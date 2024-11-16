import { NextFunction, Request, Response } from "express";
import fetch from "node-fetch";
import GeoFancing from "../model/geoFancing.model";
import { Types } from "mongoose";
import { ObjectId } from "mongodb";

export const geocodeLocation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { employeeId, employeeName, location, radius } = req.body;

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

    const data = (await response.json()) as any[];

    if (data.length > 0) {
      const { lat, lon } = data[0];

      const geoFancingData = await GeoFancing.create({
        employeeId: employeeId,
        employeeName: employeeName,
        location: {
          type: "Point",
          coordinates: [lon, lat], // Save longitude first, then latitude
        },
        latitude: lat,
        longitude: lon,
        address: location,
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
  } catch (error: any) {
    next(error);
  }
};


export const getLocationsByEmployeeId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { employeeId } = req.params; // Assuming employeeId is passed in the URL params
    console.log(employeeId);
    // Check if employeeId is a valid ObjectId
    if (!ObjectId.isValid(employeeId)) {
      return res.status(400).json({ message: "Invalid Employee ID" });
    }

    // Query GeoFancing to find all locations associated with the employeeId
    const locations = await GeoFancing.find({ employeeId });

    if (!locations || locations.length === 0) {
      return res
        .status(404)
        .json({ message: "No locations found for this employee" });
    }

    // Respond with the found locations
    res.status(200).json({
      message: "Locations retrieved successfully",
      address: locations[0].address,
      lat: locations[0].latitude,
      lon: locations[0].longitude,
    });
  } catch (err) {
    next(err); // Pass error to error-handling middleware
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

// Controller to get single employee locations
export const getsingleEmployeeLocation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { employeeId, employeeName, location } = req.query;
    //console.log(employeeId, employeeName, location);

    if (!location) {
      return res.status(400).json({ message: "Location is required" });
    }

    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      location as string,
    )}`;

    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": "Pms/1.0 (craftycode@gmail.com)", // Provide your app's name and email
      },
    });

    const data = (await response.json()) as any[];

    if (data.length > 0) {
      const { lat, lon } = data[0];
      console.log(`Latitude: ${lat}, Longitude: ${lon}`);

      // Respond with the coordinates
      return res.status(200).json({
        messsage: "Location Found",
        employeeId: employeeId,
        employeeName: employeeName,
        address: location,
        latitude: lat,
        longitude: lon,
      });
    } else {
      return res.status(404).json({ message: "Location not found" });
    }
  } catch (error: any) {
    next(error);
  }
};
