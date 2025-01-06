import { AppBar } from "@/components/ui/appBar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";

const useMyBlogs = () => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<MyBlogsProps[]>([])

    const fetchBlogs = async () => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_DATABASE_URL}/blog/myblogs`, {
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

export const MyBlogs = () => {
    const { loading, blogs } = useMyBlogs()
    if(loading)
        return <div>
            Loading
        </div>
    
    return <div>
        <AppBar />
        {blogs.map( blog => (
            <BlogCard key={blog.id} title={blog.title} content={blog.content} id={blog.id} publishDate={blog.publishDate} />
        ))}
    </div>
}

type MyBlogsProps = {
    title: string,
    content: string,
    id: string,
    publishDate: string
}

const BlogCard = ({title, content, publishDate}: MyBlogsProps) => {
    const blogDate = new Date(publishDate)
    return (
        <div className="w-[700px] mt-5 mb-5 mx-auto border-b-2 p-2">
            <div className="flex items-center w-fit gap-2">
                <div>{blogDate.toLocaleDateString()}</div>
            </div>  
            <div className="mt-5">
                <div className="text-xl font-bold w-fit inline-block">
                    {title}
                    
                </div>
                <div className="mt-3 max-w-2xl mb-5">
                    {(content.length > 200 ) ? htmlParser(content.slice(0, 200)) + "..." : htmlParser(content)}
                </div>
            </div>
            <div className="flex justify-center gap-10">
                <Button size={"sm"}>Edit</Button>
                <Button variant={"destructive"} size={"sm"}>Delete</Button>
            </div>
        </div>
    );
};

const htmlParser = (htmlString: string): string => {
    const parser = new DOMParser()
    const text = parser.parseFromString(htmlString, "text/html")
    return text.body.textContent || ""
}