import { Request, Response } from 'express'
import { Task } from '../type/task'
import { v4 as uuid } from 'uuid'
export const create = (req: Request, res: Response) => {
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
  res.status(201).json({ message: 'task created successfully', data })
}

export const get = (req: Request, res: Response) => {}

export const getById = (req: Request, res: Response) => {}

export const updateById = (req: Request, res: Response) => {}

export const deleteById = (req: Request, res: Response) => {}
