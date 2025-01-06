import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { CreateBlog } from "./pages/CreateBlog"
import { AllBlogs } from "./pages/AllBlogs"
import { Blog } from "./pages/Blog"
import "./index.css"
import { MyBlogs } from "./pages/MyBlogs"
import { EditBlog } from "./pages/EditBlog"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/createBlog" element={<CreateBlog />} />
        <Route path="/allBlogs" element={<AllBlogs />} />
        <Route path="/myBlogs" element={<MyBlogs />} />
        <Route path="/editBlog/:id" element={<EditBlog />} />
      </Routes>
    </BrowserRouter>        
  )
}

export default App
