import { Task, TaskRequest } from '../type/task'

const tasks: Task[] = []
export const save = (task: Task) => {
  tasks.push(task)
}

export const fetch = () => {}

export const fetchById = (id: string) => {}

export const putById = (task: TaskRequest, id: string) => {}

export const removeById = (id: string) => {}
