import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import axios from "axios"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "./input"
import { UserSignup, SignupType } from "@repo/common/types"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function useSignup(){
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    const handleSignup = async (body: SignupType) => {
        setLoading(true)
        try{
            const { data } = await axios.post(`${import.meta.env.VITE_DATABASE_URL}/user/signup`, body)
            localStorage.setItem("Token", data.token)
            alert("Account created Successfully")
            navigate('/allBlogs')
            
        }catch(e){
            alert("An error occurred" + e)
        }finally{
            setLoading(false)
        }
    }
    return { loading, handleSignup }

}

export function SignupForm() {
    // 1. Define your form.
    const { loading, handleSignup } = useSignup()

    const form = useForm<SignupType>({
        resolver: zodResolver(UserSignup),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })
   
    // 2. Define a submit handler.
    async function onSubmit(data: SignupType) {
        await handleSignup(data)
    }

    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size="default" type="submit" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : "Submit"}
            </Button>
          </form>
        </Form>
      )
}
//wrap it inside a hook and a function

