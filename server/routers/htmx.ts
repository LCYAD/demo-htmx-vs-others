import { Hono } from 'hono'
import { getAllAttendances, addAttendance, removeAttendance } from '../data'
import { createLayoutTemplate } from '../views/layout'
import { createAttendanceRowTemplate } from '../views/attendance-row'

const htmxRouter = new Hono()

// Main page
htmxRouter.get('/', c => {
  const page = createLayoutTemplate()
  return c.html(page)
})

// Get filtered list
htmxRouter.get('/attendances', c => {
  const nameFilter = c.req.query('search')?.toLowerCase()
  const attendances = getAllAttendances()

  const filteredAttendances = nameFilter
    ? attendances.filter(a => a.name.toLowerCase().includes(nameFilter))
    : attendances

  return c.html(filteredAttendances.map(createAttendanceRowTemplate).join(''))
})

// Add new attendance
htmxRouter.post('/attendances', async c => {
  const body = await c.req.parseBody()
  const name = body.name as string
  const age = parseInt(body.age as string)

  if (!name || isNaN(age)) {
    return c.text('Invalid input', 400)
  }

  const newAttendance = addAttendance(name, age)
  return c.html(createAttendanceRowTemplate(newAttendance))
})

// Delete attendance
htmxRouter.delete('/attendances/:id', c => {
  const id = parseInt(c.req.param('id'))
  if (isNaN(id)) {
    return c.text('Invalid ID', 400)
  }

  const removed = removeAttendance(id)
  if (!removed) {
    return c.text('Attendance not found', 404)
  }

  return c.text('')
})

export default htmxRouter
