import { AppBar } from "@/components/ui/appBar";
import { BlogCard } from "@/components/ui/blogCard";
import { BlogSkeleton } from "@/components/ui/blogSkeleton";
import { useFetchBlogs } from "@/hooks/useFetchBlogs";

export const AllBlogs = () => {
    const { loading, blogs } = useFetchBlogs()
    if(loading){
        return <div className="flex flex-col h-screen items-center justify-center">
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />

        </div>
    }
    return <div>
        <div>
            <AppBar />
        </div>
        {blogs.map( (blog) => {
            return <BlogCard key={blog.id} id={blog.id} title={blog.title} publishDate={blog.publishDate} content={blog.content} author={blog.author} />
        } )}
    </div>
};




