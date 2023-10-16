import { get, updateById, getById } from '../mock/task'
import { updateTaskInput } from '../mock/input'
describe('expecting valid inputs to match mock result & response ', () => {
  it(`Get task by limit 1 & Update By Id & verify update by get by id `, async () => {
    const req = {
      query: {
        limit: 1,
      },
    }
    const tasks = await get(req)
    const taskId = tasks.items[0].id || ''
    const response = await updateById(taskId, updateTaskInput)
    expect(response.status).toBe(200)
    const task = await getById(taskId)
    expect(task.status).toBe(updateTaskInput.status)
  })
})
