import { Task, TaskRequest } from '../../type/task'

export const createTaskInput: TaskRequest = {
  title: 'unit test title',
  description: 'unit test description',
  dueDate: new Date('2023-10-20'),
  assignedTo: 'arun',
  category: 'iv',
}

export const taskId = '6489d784-b68d-48a9-a22d-2322b667a56f'

export const updateTaskInput: Task = {
  status: 'completed',
}

export const queryParam_1 = {
  limit: 2,
}

export const queryParam_2 = {
  assignedTo: 'john',
}

export const queryParam_3 = {
  category: 'iv',
}

export const queryParam_4 = {
  limit: 2,
  assignedTo: 'john',
}

export const queryParam_5 = {
  limit: 2,
  category: 'iv',
}
