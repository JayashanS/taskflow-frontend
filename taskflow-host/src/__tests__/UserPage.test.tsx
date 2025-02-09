import React from "react";
import { render, screen } from "@testing-library/react";
import UsersPage from "../pages/UsersPage";

jest.mock("../components/UserTable", () => {
  return () => <div>Mocked User Table</div>;
});

describe("UsersPage", () => {
  it("renders UserTable when mode is 'view'", () => {
    render(<UsersPage />);

    const tableElement = screen.getByText(/Mocked User Table/i);
    expect(tableElement).toBeInTheDocument();
  });
});
