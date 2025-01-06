import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

export type BlogCardProps = {
    id: string,
    title: string,
    content: string,
    publishDate: string,
    author: {name: string}
}

export const BlogCard = ({title, content, id, publishDate, author}: BlogCardProps) => {
    const navigate = useNavigate()
    const blogDate = new Date(publishDate)
    return (
        <div className="w-[700px] mt-5 mb-5 mx-auto border-b-2 cursor-pointer" onClick={() => {navigate(`/blog/${id}`)}}>
            <div className="flex items-center w-fit gap-2">
                <Avatar>
                    <AvatarFallback>{author.name[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>{author.name} &#183; {blogDate.toLocaleDateString()}</div>
            </div>  
            <div className="mt-5">
                <div className="text-xl font-bold w-fit inline-block">
                    {title}
                    
                </div>
                <div className="mt-3 max-w-2xl mb-5">
                    {(content.length > 200 ) ? htmlParser(content.slice(0, 200)) + "..." : htmlParser(content)}
                </div>
            </div>
        </div>
    );
};

const htmlParser = (htmlString: string): string => {
    const parser = new DOMParser()
    const text = parser.parseFromString(htmlString, "text/html")
    return text.body.textContent || ""
}