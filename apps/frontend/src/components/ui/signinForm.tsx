import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"

import { Loader2 } from "lucide-react"
import axios from "axios"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "./input"
import { UserSignin, SigninType } from "@repo/common/types"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function useSignin(){
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    
    const handleSignin = async (body: SigninType) => {
        setLoading(true)
        try{
            const { data } = await axios.post(`${import.meta.env.VITE_DATABASE_URL}/user/signin`, body)
            if(data.jwt){
                localStorage.setItem("Token", data.jwt)
                navigate('/createBlog')
            }
            else{
                alert(data.Message)
            }
            
            
        }catch(e){
            alert("An error occurred" + e)
        }finally{
            setLoading(false)
        }
    }
    return { loading, handleSignin }

}

export function SigninForm() {
    // 1. Define your form.
    const { loading, handleSignin } = useSignin()

    const form = useForm<SigninType>({
        resolver: zodResolver(UserSignin),
        defaultValues: {
            email: "",
            password: ""
        }
    })
   
    // 2. Define a submit handler.
    async function onSubmit(data: SigninType) {
        await handleSignin(data)
    }

    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

