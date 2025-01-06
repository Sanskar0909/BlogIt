import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { blogRouter } from './routes/blogs'
import { userRouter } from './routes/user'


type Bindings = {
  DATABASE_URL: string
  JWT_SECRET: string
}

type Variables = {
  userId: string
}

const app = new Hono<{Bindings: Bindings, Variables: Variables}>
app.use('/*', cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE"],
  allowHeaders: ["Authorization", "Content-Type"],
  credentials: true
}))
app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)


export default app
