import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import attendanceRouter from './routers/attendance'

const app = new Hono()

const port = 3000

app.get('/healthz', c => c.text('OK'))
app.route('/api/attendances', attendanceRouter)

serve(app, () => {
  console.log(`Server is running on port ${port}`)
})
