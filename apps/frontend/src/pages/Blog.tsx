import { AppBar } from "@/components/ui/appBar"
import { BlogContent } from "@/components/ui/blogContent"

export const Blog = () => {
    return(
        <div>
            <div className="font-stripper">
                <AppBar />
            </div>
            <div className="my-10 mx-16">
                <BlogContent />
            </div>
        </div>
    )
}