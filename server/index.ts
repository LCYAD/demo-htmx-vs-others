import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import attendanceRouter from './routers/attendance'

const app = new Hono()

// Add CORS middleware
app.use(
  '/*',
  cors({
    origin: 'http://localhost:5173', // React dev server default port
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type']
  })
)

const port = 3000

app.route('/api/attendances', attendanceRouter)

serve(app, () => {
  console.log(`Server is running on port ${port}`)
})

export type AppType = typeof app
