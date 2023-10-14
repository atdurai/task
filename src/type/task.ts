export interface Task extends TaskRequest {
  id: string
  status: 'new' | 'in-progress' | 'pending' | 'blocked' | 'completed'
  createdAt: Date
  updatedAt?: Date
  isDeleted: boolean
}

export interface TaskRequest {
  title: string
  description: string
  dueDate: Date
  assignedTo: string
  category: string
}
