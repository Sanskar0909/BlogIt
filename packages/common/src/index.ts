import { z } from "zod"

export const UserSignup = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6)
})

export const UserSignin = z.object({
    email: z.string().email(),
    password: z.string()
})

export const BlogPost = z.object({
    title: z.string(),
    content: z.string()
})

export const BlogUpdate = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string()
})

export const BlogId = z.string().uuid()

export type SignupType = z.infer<typeof UserSignup>
export type SigninType = z.infer<typeof UserSignin>
export type BlogPostType = z.infer<typeof BlogPost>
export type BlogUpdateType = z.infer<typeof BlogUpdate>
export type BlogIdType = z.infer<typeof BlogId> 