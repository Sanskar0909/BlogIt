import { SigninForm } from "@/components/ui/signinForm";
import { Quote } from "@repo/ui/quote";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    const navigate = useNavigate()
    return (
        <div className="grid grid-cols-2 min-h-screen">
            <div className="col-span-2 lg:col-span-1">
                <div className="flex flex-col items-center h-screen justify-center">
                    <div className="font-bold text-3xl">
                        Login your Account
                    </div>
                    <div>
                        Don't have an account? <span className="underline cursor-pointer" onClick={() => {navigate('/signup')}}>Sign up</span>
                    </div>
                    <div className="max-w-md w-full">
                        <SigninForm />
                    </div>
                </div>
            </div>
            <div className="invisible lg:visible col-span-1">
                <Quote quote={quoteText} author={author} role={role} />
            </div>
        </div>
    );
};

const quoteText: string = "The customer service I received was exceptional. The support team went above and beyond to meet my expectations.";
const author: string = "Sanskar";
const role: string = "CEO, Acme INC.";
