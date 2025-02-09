import { User } from "../../interfaces/userInterface";
export const mockUsers: User[] = [
  {
    _id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    mobileNumber: "+1-234-567-8901",
    address: "123 Main St, City, Country",
    password: "password123",
    role: "admin",
    isEnabled: true,
    otp: null,
    otpExpiration: null,
    __v: 0,
  },
];
