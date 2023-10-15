import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import { Handler } from 'aws-lambda'
import { successResponse, errorResponse } from '../utils/http'
import {
  saveTask,
  getTaskById,
  updateTaskById,
  getTasks,
  deleteTaskById,
} from '../adapters/db'
import { HttpGenericResponse } from '../type/helper'
import { Task } from '../type/task'

const create: Handler = async ({
  body,
}: {
  body: Task
}): Promise<HttpGenericResponse> => {
  try {
    await saveTask(body)
    return successResponse({})
  } catch (err) {
    return errorResponse({ message: 'An error occurred' })
  }
}

export const save = middy(create).use(jsonBodyParser())

const getTask: Handler = async ({
  queryStringParameters,
}: {
  queryStringParameters: any
}): Promise<HttpGenericResponse> => {
  try {
    console.log('Query', JSON.stringify(queryStringParameters))
    const { limit, assignedTo, category, nextToken } = queryStringParameters
    const params = {
      limit: limit ?? 10,
    }
    console.log('Parameters', params)
    const task = await getTasks(queryStringParameters)
    console.log(task)
    return successResponse(task)
  } catch (err) {
    console.log('Error', err)
    return errorResponse({ message: 'An error occurred' })
  }
}

export const get = middy(getTask).use(jsonBodyParser())

const fetchTask: Handler = async ({
  pathParameters,
}: {
  pathParameters: { id: string }
}): Promise<HttpGenericResponse> => {
  try {
    const task = await getTaskById(pathParameters.id)
    return successResponse(task)
  } catch (err) {
    return errorResponse({ message: 'An error occurred' })
  }
}

export const fetch = middy(fetchTask).use(jsonBodyParser())

const updateTask: Handler = async ({
  pathParameters,
  body,
}: {
  pathParameters: { id: string }
  body: Task
}): Promise<HttpGenericResponse> => {
  try {
    await updateTaskById(pathParameters.id, body)
    return successResponse({})
  } catch (err) {
    return errorResponse({ message: 'An error occurred' })
  }
}

export const put = middy(updateTask).use(jsonBodyParser())

const deleteTask: Handler = async ({
  pathParameters,
}: {
  pathParameters: { id: string }
}): Promise<HttpGenericResponse> => {
  try {
    await deleteTaskById(pathParameters.id)
    return successResponse({})
  } catch (err) {
    console.log('err', JSON.stringify(err))
    return errorResponse({ message: 'An error occurred' })
  }
}

export const remove = middy(deleteTask).use(jsonBodyParser())
