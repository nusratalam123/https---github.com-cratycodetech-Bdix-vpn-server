export type Attendance = {
  employeeId: unknown;
  status: "Present" | "Absent" | "OnLeave" | "LateArrival";
  officeHour?: string;
  arrivalTime?: string;
  totalPresent: number;
  totalLateArrival: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};
