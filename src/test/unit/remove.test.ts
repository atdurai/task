import { deleteById, get } from '../mock/task'
describe('expecting valid inputs to match mock result & response ', () => {
  it(`Get task by limit 1 & Delete Task `, async () => {
    const req = {
      query: {
        limit: 1,
      },
    }
    const tasks = await get(req)
    const taskId = tasks.items[0].id || ''
    const response = await deleteById(taskId)
    expect(response.status).toBe(200)
  })
})
