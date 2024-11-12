export type GeoFancing = {
  employeeId: unknown;
  employeeName: string;
  location: {
    type: "Point"; // GeoJSON type "Point"
    coordinates: [number, number]; // Array with longitude and latitude
  };
  address: string;
  latitude: string;
  longitude: string;
  radius: string;
};
