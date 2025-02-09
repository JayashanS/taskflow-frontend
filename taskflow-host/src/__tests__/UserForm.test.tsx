import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import UserForm from "../components/UserForm";
import { Mode } from "../interfaces/globalTypes";
import { createUser, editUser } from "../store/slices/userSlice";
import { setMessage } from "../store/slices/messageSlice";
import { mockUser } from "../__mocks__/mockUser";

jest.mock("../store/slices/userSlice", () => require("../__mocks__/userSlice"));
jest.mock("../store/slices/messageSlice", () =>
  require("../__mocks__/messageSlice")
);
jest.mock("../hooks/useCheckEmail", () =>
  require("../__mocks__/useCheckEmail")
);

const mockStore = configureStore([]);
const store = mockStore({
  user: { users: [] },
  message: { message: "" },
});

const defaultProps = {
  mode: "create" as Mode,
  data: undefined,
  setMode: jest.fn(),
  onSubmit: jest.fn(),
};

describe("UserForm Component", () => {
  beforeEach(() => {
    store.clearActions();
  });

  test("renders the UserForm component", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <UserForm {...defaultProps} />
        </Provider>
      );
    });

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mobile Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Role/i)).toBeInTheDocument();
  });

  test("renders and submits form in edit mode", async () => {
    console.log("Mock User Data:", mockUser);

    await act(async () => {
      render(
        <Provider store={store}>
          <UserForm {...defaultProps} mode="edit" data={mockUser} />
        </Provider>
      );
    });

    expect(screen.getByDisplayValue(mockUser.firstName)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.lastName)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.mobileNumber)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.address)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "Jane Updated" },
    });
    fireEvent.click(screen.getByText(/Update User/i));

    await waitFor(
      () => {
        expect(editUser).toHaveBeenCalledWith(
          expect.objectContaining({
            ...mockUser,
            firstName: "Jane Updated",
          })
        );
      },
      { timeout: 5000 }
    );
  });

  test("displays validation errors when required fields are empty", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <UserForm {...defaultProps} />
        </Provider>
      );
    });

    fireEvent.click(screen.getByText(/Create User/i));

    await waitFor(
      () => {
        expect(
          screen.getByText(/Please input the first name!/i)
        ).toBeInTheDocument();
        expect(
          screen.getByText(/Please input the last name!/i)
        ).toBeInTheDocument();
        expect(
          screen.getByText(/Please input a valid email!/i)
        ).toBeInTheDocument();
        expect(
          screen.getByText(/Please input the mobile number!/i)
        ).toBeInTheDocument();
        expect(
          screen.getByText(/Please input the address!/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/Please select a role!/i)).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    expect(setMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        content: "Please fill in the required fields correctly.",
        type: "error",
      })
    );
  });
});
