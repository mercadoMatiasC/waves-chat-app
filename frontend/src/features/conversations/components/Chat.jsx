import { Link } from "react-router-dom";

export function Chat({ chat }){
    const other_user = chat.other_end_user;
    const latest_message = chat.latest_message;
    const latest_message_time = latest_message ? (new Date(latest_message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })) : null;

    return (
        <Link to={`/Chats/${chat.id}`} className='flex flex-row w-full justify-between bg-[#242424] p-3 rounded-2xl items-center hover:translate-x-1 hover:bg-[#202020] ease-in-out duration-100'>
            <div className="flex flex-row gap-3 items-center">
                <img src={other_user?.profile_image_route || "/brand/icons/avatar.webp"} width={54} className="rounded-full aspect-square object-cover" alt={`${other_user?.username}'s avatar`} />

                <div className="flex flex-col">
                    <h2>{other_user.username} {other_user.active_status && (<span className="text-xl text-green-400 font-bold">o</span>)}</h2>
                    <p className="text-sm font-light">
                        {latest_message?.text}
                    </p>
                </div>
            </div>

            <p className="font-light text-white/60">
                {latest_message_time ? latest_message_time : 'Say Hi!'}
            </p>
        </Link>
    );
}