export interface Task {
  _id: string;
  taskName: string;
  description?: string;
  startDate: string;
  endDate: string;
  assignedUser: string;
  assignedUserName: string;
  isEnabled: boolean;
  completionDate?: string;
}
