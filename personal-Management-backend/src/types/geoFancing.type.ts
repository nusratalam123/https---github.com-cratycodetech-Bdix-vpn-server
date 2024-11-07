export type GeoFancing = {
  location: {
    type: "Point"; // GeoJSON type "Point"
    coordinates: [number, number]; // Array with longitude and latitude
  };
  latitude: String;
  longitude: String;
  radius: string;
};
