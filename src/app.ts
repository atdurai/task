import express, { Application } from 'express'
import bodyParser from 'body-parser'
import { create, get, getById, updateById, deleteById } from './controller/task'

const app: Application = express()
app.use(bodyParser.json())

app.post('/task', create)
app.get('/task/:id', getById)
app.put('/task/:id', updateById)
app.delete('/task/:id', deleteById)
app.get('/tasks', get)

export default app
