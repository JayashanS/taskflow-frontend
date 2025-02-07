import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Unauthorized from "../pages/Unauthorized";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Unauthorized Component", () => {
  it("renders the 403 unauthorized page", () => {
    render(
      <BrowserRouter>
        <Unauthorized />
      </BrowserRouter>
    );

    expect(screen.getByText("403")).toBeInTheDocument();
    expect(
      screen.getByText("Sorry, you are not authorized to access this page.")
    ).toBeInTheDocument();
  });

  it("navigates to home when button is clicked", async () => {
    render(
      <BrowserRouter>
        <Unauthorized />
      </BrowserRouter>
    );

    const backButton = screen.getByRole("button", { name: /Back to Home/i });
    await userEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
