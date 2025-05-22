import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import {
  getAllAttendances,
  getAttendanceById,
  addAttendance,
  updateAttendance,
  removeAttendance
} from '../data'

const attendanceRouter = new Hono()

const attendanceSchema = z.object({
  name: z.string().max(100, 'Name must be 100 characters or less'),
  age: z
    .number()
    .int('Age must be a whole number')
    .min(0, 'Age must be at least 0')
    .max(120, 'Age must be 120 or less')
})

// Get all attendances
attendanceRouter.get('/', c => {
  return c.json(getAllAttendances())
})

// Get attendance by ID
attendanceRouter.get('/:id', c => {
  const id = parseInt(c.req.param('id'))
  if (isNaN(id)) {
    return c.json({ error: 'Invalid ID format' }, 400)
  }
  const attendance = getAttendanceById(id)
  if (!attendance) return c.notFound()
  return c.json(attendance)
})

// Add new attendance
attendanceRouter.post('/', zValidator('json', attendanceSchema), c => {
  const { name, age } = c.req.valid('json')

  // Check if name already exists
  const existingAttendances = getAllAttendances()
  const nameExists = existingAttendances.some(
    attendance => attendance.name.toLowerCase() === name.toLowerCase()
  )

  if (nameExists) {
    return c.json({ error: 'An attendance with this name already exists' }, 400)
  }

  const newAttendance = addAttendance(name, age)
  return c.json(newAttendance, 201)
})

// Update attendance
attendanceRouter.put(
  '/:id',
  zValidator('json', attendanceSchema.partial()),
  async c => {
    const id = parseInt(c.req.param('id'))
    if (isNaN(id)) {
      return c.json({ error: 'Invalid ID format' }, 400)
    }
    const updates = c.req.valid('json')
    const updatedAttendance = updateAttendance(id, updates)
    if (!updatedAttendance) return c.notFound()
    return c.json(updatedAttendance)
  }
)

// Remove attendance
attendanceRouter.delete('/:id', c => {
  const id = parseInt(c.req.param('id'))
  if (isNaN(id)) {
    return c.json({ error: 'Invalid ID format' }, 400)
  }
  const removed = removeAttendance(id)
  if (!removed) return c.notFound()
  return c.json({ success: true })
})

export default attendanceRouter
