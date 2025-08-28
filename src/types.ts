export interface ITask {
  id: string;
  title: string;
  description: string;
  dueDate: string; // You can also use Date if you want
  isCompleted: boolean;
  priority: "Low" | "Medium" | "High"; // Strict type
}
