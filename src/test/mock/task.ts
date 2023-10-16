import { save, fetch, removeById, fetchById, putById } from '../../service/task'
import { TaskRequest, Task, QueryParams, TaskResult } from '../../type/task'
import { v4 as uuid } from 'uuid'
export const create = async (req: TaskRequest) => {
  const { title, description, dueDate, assignedTo, category } = req
  const data: Task = {
    id: uuid(),
    title,
    description,
    createdAt: new Date(),
    dueDate: new Date(dueDate),
    assignedTo,
    category,
    status: 'new',
  }
  return await save(data)
}

export const get = async (req: any) => {
  const tasks: TaskResult = await fetch(req)
  return tasks
}

export const getById = async (taskId: string) => {
  return await fetchById(taskId)
}

export const updateById = async (taskId: string, req: Task) => {
  return await putById(taskId, req)
}

export const deleteById = async (taskId: string) => {
  return await removeById(taskId)
}
