import { User } from "../interfaces/userInterface";

export const mockUser: User = {
  _id: "1234567890",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  mobileNumber: "+1234567890",
  address: "123 Main Street",
  password: "hashedpassword",
  role: "admin",
  isEnabled: true,
  otp: null,
  otpExpiration: null,
  __v: 0,
};
