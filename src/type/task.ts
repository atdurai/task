export interface Task {
  id: string
  title: string
  description: string
  createdAt: Date
  updatedAt?: Date
  dueDate: Date
  assignedTo: string
  category: string
  status: 'new' | 'in-progress' | 'pending' | 'blocked' | 'completed'
}
