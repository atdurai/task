import { Task, TaskRequest } from '../type/task'
import { Request } from 'express'
import axios from 'axios'

export const save = async (task: Task) => {
  const headers = { 'x-api-key': process.env.TASK_API_KEY }
  return await axios.post(`${process.env.TASK_API_URL}/task`, task, { headers })
}

export const fetch = async (req: Request): Promise<Task[]> => {
  const headers = { 'x-api-key': process.env.TASK_API_KEY ?? '' }
  return await axios.get(`${process.env.TASK_API_URL}/task`, {
    headers,
    params: req.params,
  })
}

export const fetchById = async (id: string) => {
  const headers = { 'x-api-key': process.env.TASK_API_KEY }
  return await axios
    .get(`${process.env.TASK_API_URL}/task/${id}`, { headers })
    .then((response) => response.data)
}

export const putById = async (id: string, task: TaskRequest) => {
  const headers = { 'x-api-key': process.env.TASK_API_KEY }
  return await axios.put(`${process.env.TASK_API_URL}/task/${id}`, task, {
    headers,
  })
}

export const removeById = async (id: string) => {
  const headers = { 'x-api-key': process.env.TASK_API_KEY }
  return await axios.delete(`${process.env.TASK_API_URL}/task/${id}`, {
    headers,
  })
}
