import { useState } from "react";
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css";
import { Button } from "./button";
import axios from "axios";

const sendBlog = async ({title, content}: {title: string, content: string}) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_DATABASE_URL}/blog`, {
            title, 
            content
        }, {
            headers: {
                Authorization: localStorage.getItem("Token")
            }
        })
        alert(res.data.message)
    } catch (e) {
        alert("Error" + e)
    }
}

export const QuillTextEditor = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState("")

    return (
        <div className="mx-16">
            <BlogTitle setTitle={setTitle}/>
            <ReactQuill 
                theme='snow'
                placeholder='Write Something'
                value={content} 
                onChange={setContent} 
            />
            <Button onClick={() => {
                sendBlog({title, content})
            }}>Submit</Button>
        </div>
    )
}

type props = {
    setTitle: React.Dispatch<React.SetStateAction<string>>
}

const BlogTitle = ({setTitle}: props) => {
    return <div>
        <input 
            className="w-full py-10 text-5xl focus:outline-none overflow-hidden" 
            type="text" 
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
        />
    </div>
}