export function LoadingScreen(){
    return (
        <div className="flex justify-center items-center w-full bg-[#141414] min-h-[calc(100vh-64px)] lg:h-full">
            <img src="/brand/mini-logo.webp" width={128} alt="Loading icon" className="animate-pulse" />
        </div>
    );
}