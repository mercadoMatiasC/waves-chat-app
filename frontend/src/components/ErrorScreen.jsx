export function ErrorScreen({ message, full_screen = false }){
    return (
        <div className={`flex flex-col justify-center items-center w-full bg-[#141414] gap-5 ${full_screen ? 'h-screen' : 'h-[calc(100vh-64px)]'} lg:h-full`}>
            <h1>There was an error!:</h1>
            <div className="bg-red-500/20 text-red-500 p-3 rounded-lg mb-4 text-sm border border-red-500/50">
                {message}
            </div>
        </div>
    );
}