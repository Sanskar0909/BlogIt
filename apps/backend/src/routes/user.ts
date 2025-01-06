import { getPrismaClient } from "@repo/db/prisma"
import { Hono } from "hono"
import { sign } from "hono/jwt"
import { UserSignup, UserSignin } from "@repo/common/types"

type Bindings = {
  DATABASE_URL: string
  JWT_SECRET: string
}

type Variables = {
  userId: string
}

export const userRouter = new Hono<{Bindings: Bindings, Variables: Variables}>

userRouter.post('/signup', async (c) => {
    const prisma = getPrismaClient(c.env.DATABASE_URL)
    const body: any = await c.req.json()
    const { success } = UserSignup.safeParse(body)
    if(!success){
        return c.json({Message: "Invalid Inputs"})
    }

    try {
      const user = await prisma.user.create({
        data:{
          name: body.name,
          email: body.email,
          password: body.password
        }
      })
      const secret = c.env.JWT_SECRET
      const token = await sign({id: user.id}, secret)
      
      return c.json({token})
      
    }catch(e){
      return c.json({"Error": e})
    }
})
  
userRouter.post('/signin', async (c) => {
    const prisma = getPrismaClient(c.env.DATABASE_URL)

    const body = await c.req.json()
    const { success } = UserSignin.safeParse(body)
    if(!success){
        return c.json({Message: "Invalid Inputs"})
    }

    const userExists = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        }
    })

    if(!userExists){
        return c.json({Message: "Credentials Invalid"})
    }
    const jwt = await sign({ id: userExists.id }, c.env.JWT_SECRET);
    c.set("userId", userExists.id)
    return c.json({ jwt });
})