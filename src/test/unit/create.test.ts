import { createTaskInput } from '../mock/input'
import { create } from '../mock/task'
describe('expecting valid inputs to match mock result & response ', () => {
  it(`Create Task `, async () => {
    const response = await create(createTaskInput)
    expect(response.status).toBe(200)
  })
})
