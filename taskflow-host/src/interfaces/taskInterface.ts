import { Mode } from "./globalTypes";

export interface Task {
  _id: string;
  taskName: string;
  description?: string;
  startDate: string;
  endDate: string;
  assignedUser: string;
  isEnabled: boolean;
  completionDate?: string;
}

export interface TaskState {
  tasks: Task[];
  totalRecords: number;
  loading: boolean;
  error: string | null;
}
export interface TaskTableProps {
  setMode: (mode: Mode) => void;
  setData: (data: Task) => void;
}

export interface TaskFormProps {
  mode: Mode;
  data?: Task;
  setMode: (mode: Mode) => void;
  onSubmit: (data: any) => void;
}
