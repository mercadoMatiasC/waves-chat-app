import { Link } from "react-router-dom";

export function Chat({ chat }){
    return (
        <Link to="/chats/1" className='flex flex-row w-full justify-start gap-3 bg-[#242424] p-2 rounded-2xl items-center hover:translate-x-1 hover:bg-[#202020] ease-in-out duration-100'>
            <img src="/brand/icons/avatar.webp" width={54} alt="Profile avatar" />

            <div className="flex flex-col">
                <h2>{chat.username}</h2>
                <p className="text-sm font-light">
                    {chat.last_message}
                </p>
            </div>
        </Link>
    );
}