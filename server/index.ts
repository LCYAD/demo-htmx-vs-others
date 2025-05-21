import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/healthz', c => c.text('OK'))

serve(app)
