import React from "react";
import { render, screen } from "@testing-library/react";
import UsersPage from "../pages/UsersPage"; // Adjust the path accordingly

// Mock UserTable component
jest.mock("../components/UserTable", () => {
  return () => <div>Mocked User Table</div>;
});

describe("UsersPage", () => {
  it("renders UserTable when mode is 'view'", () => {
    render(<UsersPage />);

    // Check if the "Mocked User Table" appears when in 'view' mode
    const tableElement = screen.getByText(/Mocked User Table/i);
    expect(tableElement).toBeInTheDocument();
  });

  // You can add more tests for other modes if necessary
});
