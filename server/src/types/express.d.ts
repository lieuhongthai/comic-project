declare module 'express' {
  interface Request {
    user: {
      id: number;
      level: number;
      employeeNumber: string;
      fullName: string;
      roles: { name: string }[];
      email: string;
      companyId: number;
      companyName: string;
      departmentId: number;
      departmentCode: string;
      departmentName: string;
    };
  }
}
export {};
