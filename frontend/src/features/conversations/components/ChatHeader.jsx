import { Link } from "react-router-dom";

export function ChatHeader({ chat }){
    return (
        <div id="chat-header" className="flex flex-row bg-[#171717] gap-4 items-center p-2 lg:p-3 lg:rounded-t-xl lg:gap-2">
            <Link to="/" className='p-0 hover:-translate-x-0.5 transition duration-200 lg:p-1'>
                <img src="/brand/svgs/rchevron.svg" width={32} alt="Exit chat" className="rotate-180" />
            </Link>

            <img src="/brand/icons/avatar.webp" width={64} alt="Profile avatar" />

            <div className="flex flex-col">
                <h1 className="text-xl">{chat.username}</h1>
                <p className="font-light">{chat.online_status}</p>
            </div>
        </div>
    );
}