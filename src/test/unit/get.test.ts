import { get, getById } from '../mock/task'
import {
  queryParam_1,
  queryParam_2,
  queryParam_3,
  queryParam_4,
  queryParam_5,
} from '../mock/input'
describe('expecting valid inputs to match mock result & response ', () => {
  it(`Get task by limit 1 & Get By Id `, async () => {
    const req = {
      query: {
        limit: 1,
      },
    }
    const tasks = await get(req)
    const taskId = tasks.items[0].id || ''
    const response = await getById(taskId)
    expect(response.id).toEqual(taskId)
    expect(response.status).toBeDefined()
  })
  it(`Get task by limit 1 & Get By Id `, async () => {
    const req = {
      query: {
        limit: 1,
      },
    }
    const tasks = await get(req)
    const taskId = tasks.items[0].id || ''
    const response = await getById(taskId)
    expect(response.id).toEqual(taskId)
    expect(response.status).toBeDefined()
  })

  it(`Get task by limit 2 `, async () => {
    const req = {
      query: queryParam_1,
    }
    const tasks = await get(req)
    expect(tasks.items.length).toEqual(2)
  })

  it(`Get task by limit 2 & use nextoken to support pagination `, async () => {
    const req = {
      query: queryParam_1,
    }
    const tasks = await get(req)
    expect(tasks.items.length).toEqual(2)
    const nextTasks = await get({
      query: { limit: 2, nextToken: tasks.nextToken },
    })
    expect(nextTasks.items.length).toBeGreaterThanOrEqual(1)
  })

  it(`Get task by assignee john `, async () => {
    const req = {
      query: queryParam_2,
    }
    const tasks = await get(req)
    const assigneeTasks = tasks.items.filter(
      (task) => task.assignedTo === queryParam_2.assignedTo
    )
    expect(assigneeTasks.length).toEqual(tasks.items.length)
  })

  it(`Get task by category iv `, async () => {
    const req = {
      query: queryParam_3,
    }
    const tasks = await get(req)
    const categoryTasks = tasks.items.filter(
      (task) => task.category === queryParam_3.category
    )
    expect(categoryTasks.length).toEqual(tasks.items.length)
  })

  it(`Get task limit 2 & assignee `, async () => {
    const req = {
      query: queryParam_4,
    }
    const tasks = await get(req)
    const assigneeTasks = tasks.items.filter(
      (task) => task.assignedTo === queryParam_4.assignedTo
    )
    expect(assigneeTasks.length).toEqual(tasks.items.length)
    expect(tasks.items.length).toEqual(queryParam_4.limit)
  })

  it(`Get task limit 2 & categoty `, async () => {
    const req = {
      query: queryParam_5,
    }
    const tasks = await get(req)
    const categoryTasks = tasks.items.filter(
      (task) => task.category === queryParam_5.category
    )
    expect(categoryTasks.length).toEqual(queryParam_5.limit)
    expect(tasks.items.length).toEqual(queryParam_5.limit)
  })
})
