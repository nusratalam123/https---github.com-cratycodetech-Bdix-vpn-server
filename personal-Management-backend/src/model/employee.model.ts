import { Model, model, models, Schema } from "mongoose";
import { Employee } from "../types/employee.type";

const employeeSchema = new Schema<Employee>(
  {
    employeeId: {
      type: String,
      required: true,
    },
    employeeName: {
      type: String,
      required: true,
    },
    employeeSalary: {
      type: String,
      required: true,
    },
    employeeNumber: {
      type: String,
      required: true,
    },
    // employeeStatus: {
    //   type: String,
    //   required: true,
    // },

    departmentName: {
      type: String,
      required: true,
    },

    joiningDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);


const Employee: Model<Employee> = models?.Employee || model("Employee", employeeSchema);
export default Employee;
