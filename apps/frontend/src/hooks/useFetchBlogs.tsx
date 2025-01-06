import { BlogCardProps } from "@/components/ui/blogCard"
import axios from "axios"
import { useEffect, useState } from "react"

export function useFetchBlogs(){
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<BlogCardProps[]>([])
    const fetchBlogs = async () => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_DATABASE_URL}/blog/bulk`, {
                headers: {
                    Authorization: localStorage.getItem("Token")
                }
            })

            setBlogs(response.data.blogs)
        } catch(e){
            alert("Error" + e)
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    return { loading, blogs }
}