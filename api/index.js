import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

/**
 * logic for our api will go here
 */
export default {
  path: '/api',
  handler: app
}

app.post(`/patient`, async (req, res) => {
  const result = await prisma.patients.create({
    data: req.body
  })
  res.json(result)
})

app.get('/patients', async (req, res) => {
  const patients = await prisma.patients.findMany({})
  res.json(patients)
})

app.post(`/patient`, async (req, res) => {
  const result = await prisma.patients.create({
    data: req.body
  })
  res.json(result)
})

app.delete(`/patients`, async (req, res) => {
  const patients = await prisma.patients.deleteMany({})
  res.json(patients)
})

app.post(`/user`, async (req, res) => {
  const user = await prisma.user.findFirst({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  })

  res.json(user)
})
