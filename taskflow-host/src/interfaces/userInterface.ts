import { Mode } from "./globalTypes";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  address: string;
  password: string;
  role: string;
  isEnabled: boolean;
  otp: string | null;
  otpExpiration: string | null;
  __v: number;
}

export interface UserState {
  users: User[];
  totalRecords: number;
  loading: boolean;
  error: string | null;
}

export interface UserTableProps {
  setMode: (mode: Mode) => void;
  setData: (data: User) => void;
}

export interface EditUserProps {
  visible: boolean;
  onClose: () => void;
  initialData: User;
  onSave: (updatedUser: User) => void;
}

export interface UserFormProps {
  mode: Mode;
  data?: User;
  setMode: (mode: Mode) => void;
  onSubmit: (data: any) => void;
}

export interface AddressPickerProps {
  open: boolean;
  address: string;
  handleClose: () => void;
  setAddress: (address: string) => void;
}
