import { AWSError, DynamoDB } from 'aws-sdk'
import { prepareUpdateExpression, remove, update } from '../utils/dynamoDb'
import { Task } from '../type/task'
import { PromiseResult } from 'aws-sdk/lib/request'

const { TABLE = '', REGION = '' } = process.env
const dynamoDb = new DynamoDB.DocumentClient({
  region: REGION,
  apiVersion: '2012-10-08',
})

export async function getTaskById(id: string) {
  const params = { TableName: TABLE, Key: { id } }
  const { Item } = await dynamoDb.get(params).promise()
  return Item
}

export async function saveTask(task: Task) {
  const params = {
    TableName: TABLE,
    Item: task,
    ReturnValues: 'NONE',
  }
  await dynamoDb.put(params).promise()
}

export const getTasks = async ({
  limit,
  nextToken,
  assignedTo,
  category,
  id,
}: {
  limit: number
  nextToken?: any
  assignedTo?: string
  category?: string
  id?: string
}) => {
  let IndexName = null
  if (assignedTo || category) {
    IndexName = assignedTo ? 'assignedTo' : 'category'
  }
  let result: PromiseResult<DynamoDB.DocumentClient.QueryOutput, AWSError>
  if (IndexName) {
    const params = {
      TableName: TABLE,
      IndexName,
      KeyConditionExpression: assignedTo
        ? '#assignedTo = :assignedToValue'
        : '#category = :categoryToValue',
      ExpressionAttributeNames: assignedTo
        ? { '#assignedTo': 'assignedTo' }
        : { '#category': 'category' },
      ExpressionAttributeValues: assignedTo
        ? { ':assignedToValue': assignedTo }
        : { ':categoryValue': category },
      ...(nextToken
        ? {
            ExclusiveStartKey: {
              id: nextToken,
              ...(assignedTo ? { assignedTo } : { category }),
            },
          }
        : {}),
      Limit: Number(limit),
    }
    result = await dynamoDb.query(params).promise()
  } else {
    const params = {
      TableName: TABLE,
      ...(nextToken ? { ExclusiveStartKey: JSON.parse(nextToken) } : {}),
      Limit: Number(limit),
    }
    result = await dynamoDb.scan(params).promise()
  }
  const token = result.LastEvaluatedKey
  return { items: result.Items, nextToken: token?.id }
}

export const updateTaskById = async (id: string, data: Task) =>
  await update(prepareUpdateExpression(TABLE, data, id))

export const deleteTaskById = async (id: string) => await remove(TABLE, { id })
