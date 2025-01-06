import { AppBar } from "@/components/ui/appBar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ReactQuill from "react-quill";

// Parent Component
export const EditBlog = () => {
    const [title, setTitle] = useState("This is the blog title");
    const [content, setContent] = useState("This is the blog Content");

    const handleSubmit = () => {
        console.log("Blog Submitted:", { title, content });
    };

    return (
        <div>
            <AppBar />
            <div className="mx-16">
                <h1 className="text-3xl mb-4">Editing</h1>
                <QuillTextEditor
                    title={title}
                    content={content}
                    setTitle={setTitle}
                    setContent={setContent}
                />
                <div className="flex justify-center">
                    <Button size="lg" className="mt-5" onClick={handleSubmit}>Submit</Button>
                </div>
            </div>
        </div>
    );
};

// Blog Title Component
const BlogTitle = ({ title, setTitle }: { title: string; setTitle: (value: string) => void }) => {
    return (
        <div>
            <input
                className="w-full py-10 text-5xl focus:outline-none overflow-hidden"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>
    );
};

// Quill Text Editor Component
const QuillTextEditor = ({
    title,
    content,
    setTitle,
    setContent,
}: {
    title: string;
    content: string;
    setTitle: (value: string) => void;
    setContent: (value: string) => void;
}) => {
    return (
        <div>
            <BlogTitle title={title} setTitle={setTitle} />
            <ReactQuill
                theme="snow"
                placeholder="Write Something"
                value={content}
                onChange={setContent}
            />
        </div>
    );
};
