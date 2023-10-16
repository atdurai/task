// service was running in serverless
// Git : https://github.com/atdurai/task/tree/serverless

const TASK_API_URL =
  'https://9akcotuntj.execute-api.ap-south-1.amazonaws.com/tst'
const TASK_API_KEY = 'aE8tASyOkZ7ZRzTWKuLYr2jQKkJ20ATaXtVsSize'
import { Task, TaskRequest, TaskResult } from '../type/task'
import { Request } from 'express'
import axios from 'axios'
export const save = async (task: Task) => {
  const headers = {
    'x-api-key': TASK_API_KEY,
  }
  return await axios.post(`${TASK_API_URL}/task`, task, {
    headers,
  })
}

export const fetch = async (req: Request): Promise<TaskResult> => {
  const headers = { 'x-api-key': TASK_API_KEY ?? '' }
  return await axios
    .get(`${TASK_API_URL}/task`, {
      headers,
      params: req.query,
    })
    .then((response: { data: TaskResult }) => response.data)
}

export const fetchById = async (id: string) => {
  const headers = { 'x-api-key': TASK_API_KEY }
  return await axios
    .get(`${TASK_API_URL}/task/${id}`, { headers })
    .then((response: { data: Task }) => response.data)
}

export const putById = async (id: string, task: Task) => {
  const headers = { 'x-api-key': TASK_API_KEY }
  return await axios.put(`${TASK_API_URL}/task/${id}`, task, {
    headers,
  })
}

export const removeById = async (id: string) => {
  const headers = { 'x-api-key': TASK_API_KEY }
  return await axios.delete(`${TASK_API_URL}/task/${id}`, {
    headers,
  })
}
