type quoteProps = {
    quote: string,
    author: string,
    role: string
}

export const Quote = ({quote, author, role}: quoteProps) => {
    return <div className="flex items-center justify-center bg-blue-200 h-screen">
        <div className="max-w-lg">
            <div className="text-3xl font-bold">
                "{quote}"
            </div>
            <div className="mt-2">
                {author}
            </div>
            <div>
                {role}
            </div>
        </div>
    </div>
}