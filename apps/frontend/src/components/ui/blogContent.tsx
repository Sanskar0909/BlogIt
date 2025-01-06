import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"



type blogProps = {
    title: string,
    content: string,
    publishDate: string,
    author: {name: string}
}

export const BlogContent = () => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlog] = useState<blogProps>()
    const {id} = useParams()
    const blogId = id as string
    
    useEffect(() => {
        const fetchBlog = async () => {
            try{
                const response = await axios.get(`${import.meta.env.VITE_DATABASE_URL}/blog/${blogId}`, {
                    headers: {
                        Authorization: localStorage.getItem("Token")
                    }
                })
                setBlog(response.data.blog)
            } catch(e){
                alert("Error" + e)
            } finally{{
                setLoading(false)
            }}
        }
        fetchBlog()
        
    }, [blogId])

    if (loading){
        return <div>
            Loading...
        </div>
    }

    if(!blogs)
        return <div>Blog Not Found</div>

    return <div className="grid gap-5 grid-cols-4">
        <div className="col-span-3">
            <div className="font-bold text-6xl">
                {blogs.title}
            </div>
            <div className="my-5 text-slate-500">
                Posted on August 24, 2023
            </div>
            <div className="whitespace-pre-wrap"  dangerouslySetInnerHTML={{ __html: blogs.content }} />
        </div>
        <div className="col-span-1">
            <AuthorInfo author= {blogs.author.name}/>
        </div>
    </div>
}

//Fix this and structure it, messy right now

const AuthorInfo = ({author}: {author: string}) => {
    return <div>
        <div>
            Author
        </div>
        <div className="mt-2 flex items-center">
            <div>
                <Circle />
            </div>
            <div className="ml-3">
                <div className="font-bold text-xl">
                    {author}
                </div>
                <div>This is an author phrase space</div>
            </div>
        </div>
    </div>
}

function Circle(){
    return <div className="bg-slate-200 border w-5 h-5 rounded-full">
        
    </div>
}
