import { Model, model, models, Schema } from "mongoose";
import { GeoFancing } from "../types/geoFancing.type";

const geoFancingSchema = new Schema<GeoFancing>(
  {
    location: {
      type: { type: String, enum: ["Point"], required: true },
      coordinates: { type: [Number], required: true }, // Latitude and longitude
    },
    latitude: String,
    longitude: String,
    radius: {
      type: String, // Number might be better to specify radius in meters, etc.
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Create a 2dsphere index for location to enable geospatial queries
geoFancingSchema.index({ location: "2dsphere" });

const GeoFancing: Model<GeoFancing> =
  models?.GeoFancing || model("GeoFancing", geoFancingSchema);
export default GeoFancing;
