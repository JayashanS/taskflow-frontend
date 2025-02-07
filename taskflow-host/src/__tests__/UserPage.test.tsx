import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UsersPage from "../pages/UsersPage";
import { User } from "../interfaces/userInterface";

// Mocking the UserTable component
jest.mock("../components/UserTable", () => ({
  __esModule: true,
  default: ({ setMode, setData }: { setMode: any; setData: any }) => (
    <div>
      <p>UserTable Component</p>
      <button onClick={() => setMode("edit")}>Edit User</button>
      <button onClick={() => setMode("create")}>Create User</button>
    </div>
  ),
}));

// Mocking the UserForm component and passing onSubmit mock correctly
jest.mock("../components/UserForm", () => ({
  __esModule: true,
  default: ({
    mode,
    onSubmit,
  }: {
    mode: string;
    onSubmit: (data: User) => void;
  }) => (
    <div>
      <p>UserForm Component - Mode: {mode}</p>
      <button
        onClick={() =>
          onSubmit({
            _id: "1",
            firstName: "Test User",
            lastName: "User",
            email: "test.user@example.com",
            mobileNumber: "1234567890",
            address: "123 Test St",
            password: "password",
            role: "admin",
            isEnabled: true,
            otp: null,
            otpExpiration: null,
            __v: 1,
          })
        }
      >
        Submit
      </button>
    </div>
  ),
}));

describe("UsersPage Component", () => {
  test("renders UserTable by default", () => {
    render(<UsersPage />);
    expect(screen.getByText("UserTable Component")).toBeInTheDocument();
  });

  test("switches to edit mode and renders UserForm", () => {
    render(<UsersPage />);
    fireEvent.click(screen.getByText("Edit User"));
    expect(
      screen.getByText("UserForm Component - Mode: edit")
    ).toBeInTheDocument();
  });

  test("switches to create mode and renders UserForm", () => {
    render(<UsersPage />);
    fireEvent.click(screen.getByText("Create User"));
    expect(
      screen.getByText("UserForm Component - Mode: create")
    ).toBeInTheDocument();
  });

  test("calls handleSubmit when form is submitted", () => {
    const handleSubmitMock = jest.fn(); // Mock function to capture form submission

    render(<UsersPage />);

    fireEvent.click(screen.getByText("Create User"));

    // Ensure UserForm triggers handleSubmitMock correctly
    fireEvent.click(screen.getByText("Submit"));

    // Verify if the handleSubmitMock was called with the expected data
    expect(handleSubmitMock).toHaveBeenCalledWith({
      _id: "1",
      firstName: "Test User",
      lastName: "User",
      email: "test.user@example.com",
      mobileNumber: "1234567890",
      address: "123 Test St",
      password: "password",
      role: "admin",
      isEnabled: true,
      otp: null,
      otpExpiration: null,
      __v: 1,
    });

    // Optionally check if the UserForm was displayed in 'create' mode
    expect(
      screen.getByText("UserForm Component - Mode: create")
    ).toBeInTheDocument();
  });
});
