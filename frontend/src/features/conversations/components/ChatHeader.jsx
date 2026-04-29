import { Link } from "react-router-dom";
import { useMe } from "../../profile/hooks/useMe";

export function ChatHeader({ chat }){
    const { data: me } = useMe();
    const participants = chat.data.participants??[];
    const other_end_user = participants.find(item => item.id !== me?.data.id);
    const chat_name = (chat.is_group ? chat.group_title : other_end_user.username)

    return (
        <div id="chat-header" className="flex justify-between bg-[#171717] gap-4 items-center p-2 lg:p-3 lg:rounded-t-xl lg:gap-2">
            <div className="flex justify-between items-center">
                <Link to="/" className='p-0 hover:-translate-x-0.5 transition duration-200 lg:p-1'>
                    <img src="/brand/svgs/rchevron.svg" width={32} alt="Exit chat" className="rotate-180" />
                </Link>

                <Link to={`/Users/${other_end_user.id}`} className="flex items-center gap-3">
                    <img src="/brand/icons/avatar.webp" width={58} alt="Profile avatar" />

                    <div className="flex flex-col">
                        <h1 className="text-lg lg:text-xl font-light">{chat_name}</h1>
                        <p className="font-light">{other_end_user.active_status ? "Online" : "Offline"}</p>
                    </div>
                </Link>
            </div>

            <Link to={`/Users/${other_end_user.id}/Wave`} className='p-2 hover:translate-x-0.5 transition duration-200'>
                <span id="waves-sign" className="font-light">See wave</span>
            </Link>
        </div>
    );
}