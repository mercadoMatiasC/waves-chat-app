export function LoadingScreen({ message }){
    return (
        <div className="flex flex-col justify-center items-center h-[calc(100vh-64px)] w-full bg-[#141414] lg:h-full">
            {message && (
                <p>{message}</p>
            )}
            <img src="/brand/mini-logo.webp" loading="lazy" width={128} alt="Loading icon" className="animate-pulse" />
        </div>
    );
}