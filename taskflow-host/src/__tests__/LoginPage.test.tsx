import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import LoginPage from "../pages/LoginPage";
import { loginUser } from "../services/authService";
import { login } from "../store/slices/authSlice";
import "@testing-library/jest-dom";

jest.mock("../services/authService", () => ({
  loginUser: jest.fn(),
}));

const mockStore = configureStore([]);

describe("LoginPage", () => {
  let store: any;
  beforeEach(() => {
    store = mockStore({ auth: { token: null } });
    store.dispatch = jest.fn();
  });

  test("renders login page elements", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your password")
    ).toBeInTheDocument();
    expect(screen.getByText("Log in")).toBeInTheDocument();
  });

  test("allows user to input email and password", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect((emailInput as HTMLInputElement).value).toBe("test@example.com");
    expect((passwordInput as HTMLInputElement).value).toBe("password123");
  });

  test("calls login function on button click", async () => {
    (loginUser as jest.Mock).mockResolvedValue("mockToken");

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const loginButton = screen.getByText("Log in");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith("test@example.com", "password123");
      expect(store.dispatch).toHaveBeenCalledWith(login("mockToken"));
    });
  });
});
