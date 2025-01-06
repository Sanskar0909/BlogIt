import { getPrismaClient } from "@repo/db/prisma";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { BlogPost, BlogId, BlogUpdate } from "@repo/common/types";

type Bindings = {
    DATABASE_URL: string
    JWT_SECRET: string
}
  
type Variables = {
    userId: string,
}

export const blogRouter = new Hono<{Bindings: Bindings, Variables: Variables}>

blogRouter.use('/*', async (c, next) => {
  const authToken = c.req.header("Authorization")
  if(!authToken){
    return c.json({Message: "No token found"})
  }
  try{
    const result = await verify(authToken, c.env.JWT_SECRET)
    if(!result){
      return c.json({Error: "Token is not authorized / incorrect"})
    }
    const id = result.id as string 
  
    c.set("userId", id)
    await next()
  } catch(e){
    return c.json({Message: "Incorrect Token"})
  }
})

blogRouter.post('/', async (c) => {
    const prisma = getPrismaClient(c.env.DATABASE_URL)
    const body = await c.req.json()
    const { success } = BlogPost.safeParse(body)
    if(!success){
        return c.json({Message: "Invalid Inputs"})
    }
    
    const response = await prisma.blogs.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: c.get("userId")
        }
    })

    if(!response){
        return c.json({Message: "Error occurred while publishing blog"})
    }
    return c.json({Message: "Blog published successfully"})
})
  
blogRouter.put('/', async (c) => {
    const prisma = getPrismaClient(c.env.DATABASE_URL)
    const body = await c.req.json()
    const { success } = BlogUpdate.safeParse(body)
    if(!success){
        return c.json({Message: "Invalid Inputs"})
    }

    try{
        const response = await prisma.blogs.update({
            where: {
                authorId: c.get("userId"),
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
    
        if(!response){
            return c.json({Message: "An error occurred while updating the blog"})
        }
        return c.json({Message: "Blog updated successfully"})
    } catch(e){
        return c.json({Message: "An error occurred"})
    }

})

blogRouter.get('/myblogs', async (c) => {
    const prisma = getPrismaClient(c.env.DATABASE_URL)
    try {
        const response = await prisma.blogs.findMany({
            where: {
                authorId: c.get("userId")
            }
        })
        
        if(!response){
            return c.json({Message: "No blogs found"})
        }

        if(response){
            return c.json({ blogs: response })
        }
        
    } catch (e) {
        return c.json({Message: "An Error Occurred"})
    }
})

blogRouter.get('/bulk', async (c) => {
    const prisma = getPrismaClient(c.env.DATABASE_URL)
    const blogs = await prisma.blogs.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            publishDate: true,
            author: {
                select: {
                    name: true
                }
            }
            
        }   
    })

    return c.json({ blogs })
})

//dont put bulk below /:id, else bulk will be treated as param and never get executed

blogRouter.get('/:id', async (c) => {
    const prisma = getPrismaClient(c.env.DATABASE_URL)
    const id = c.req.param("id")
    const { success } = BlogId.safeParse(id)
    if(!success){
        return c.json({Message: "Invalid Id"})
    }

    const blog = await prisma.blogs.findFirst({
        where: {
            id: id
        }, 
        select: {
            title: true,
            content: true,
            publishDate: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })

    if(!blog){
        return c.json({Message: "Blog not found"})
    }
    return c.json({ blog })
})

