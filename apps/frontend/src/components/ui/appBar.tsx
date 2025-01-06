import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "./button"
import { useNavigate } from "react-router-dom"
import { DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger, 
} from "@/components/ui/dropdown-menu"

export const AppBar = () => {
    const navigate = useNavigate()

    return <div>
        <div className="flex justify-between my-2 mb-3 mx-16">
            <div className="font-striper text-4xl cursor-pointer" onClick={() => {navigate('/allBlogs')}}>
                B l o g . i t
            </div>
            <div className="flex justify-evenly gap-10">
                
                <Button 
                    variant={"green"}
                    onClick={() => {navigate('/createBlog')}}
                >    
                    {"Write"}
                </Button>
                <Dropdown />
            </div>
        </div>
        <div className="border-b">

        </div>
    </div> 
}

function Dropdown(){
    const navigate = useNavigate()

    return <DropdownMenu>
    <DropdownMenuTrigger>
        <Avatar>
            <AvatarImage></AvatarImage>
            <AvatarFallback>S</AvatarFallback>
        </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/myBlogs')}>My Blogs</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="cursor-pointer" onClick={() => {
        localStorage.removeItem("Token")
        navigate("/signin")
      }}>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
}