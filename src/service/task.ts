import { Task, TaskRequest } from '../type/task'
import { Request } from 'express'
const tasks: Task[] = []
export const save = async (task: Task) => {
  tasks.push(task)
}

export const fetch = async (req: Request) => {
  return []
}

export const fetchById = async (id: string) => {
  return {}
}

export const putById = async (id: string, task: TaskRequest) => {}

export const removeById = async (id: string) => {}
