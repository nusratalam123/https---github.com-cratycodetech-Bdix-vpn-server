export type Salary = {
  employeeId: unknown; 
  salaryStatus: "Distribution" | "Pending"; 
  baseSalary: number; 
  salaryDeduction?: number; 
  bonus?: number; 
  totalSalary?: number;
  createdAt?: Date; 
  updatedAt?: Date; 
};
