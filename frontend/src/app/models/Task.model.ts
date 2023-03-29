export interface Task {
  task_id?: string;
  title: string;
  description: string;
  created_at: string;
  due_date:string;
  reminder: boolean;
  status:string;
  priority:string
}