// admin-dashboard
declare module "admin_dashboard/AdminButton" {
  const Button: React.FC;
  export default Button;
}

// task-management
declare module "task_management/TaskButton" {
  const Button: React.FC;
  export default Button;
}

// user-dashboard
declare module "user_dashboard/UserButton" {
  const Button: React.FC;
  export default Button;
}

declare module "*.png" {
  const value: string;
  export default value;
}
