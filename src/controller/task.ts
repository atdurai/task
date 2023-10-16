import { Request, Response } from 'express'
import { Task, TaskRequest, TaskResult } from '../type/task'
import { v4 as uuid } from 'uuid'
import { save, fetch, fetchById, putById, removeById } from '../service/task'
export const create = async (req: Request, res: Response) => {
  const { title, description, dueDate, assignedTo, category } = req.body
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
  await save(data)
  res.status(201).json({ message: 'task created successfully', data })
}

export const get = async (req: Request, res: Response) => {
  const tasks: TaskResult = await fetch(req)
  res.status(200).json(tasks)
}

export const getById = async (req: Request, res: Response) => {
  const taskId = req.params.id
  const task = await fetchById(taskId)
  if (!task) res.status(404).json({ error: 'Task not found' })
  res.status(200).json(task)
}

export const updateById = async (req: Request, res: Response) => {
  const taskId = req.params.id
  const task = await fetchById(taskId)
  if (!task) res.status(404).json({ error: 'Task not found' })
  const data: TaskRequest = req.body
  await putById(taskId, data)
  res.status(200).json({ message: 'Task successfully updated', data })
}

export const deleteById = async (req: Request, res: Response) => {
  const taskId = req.params.id
  await removeById(taskId)
  res.status(200).json({ message: 'Task successfully deleted' })
}
