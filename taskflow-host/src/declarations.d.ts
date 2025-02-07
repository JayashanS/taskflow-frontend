declare module "*.svg" {
  const content: string;
  export default content;
}
declare module "task_management/TaskModule" {
  import { FC } from "react";

  const TaskModule: FC;
  export default TaskModule;
}
