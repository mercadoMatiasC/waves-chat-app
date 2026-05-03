import { Link } from "react-router-dom";
import { useMe } from "../../profile/hooks/useMe";
import { useState } from "react";
import { ParticipantsModal } from "./ParticipantsModal";

export function ChatHeader({ chat }) {
    const { data: me } = useMe();
    const [participantsMenu, setParticipantsMenu] = useState(false);
    const group = chat.data;
    const i_own_it = chat.data.owner_id == me?.data.id;
    const participants = group.participants ?? [];
    
    const other_end_user = participants.find(item => item.id !== me?.data.id);
    
    const isGroup = group.is_group;
    const chatTitle = isGroup ? group.group_title : other_end_user?.username;
    const chatImage = isGroup 
        ? "/brand/icons/group-icon.webp" 
        : (other_end_user?.profile_image_route || "/brand/icons/avatar.webp");

    return (
        <div id="chat-header" className="flex justify-between bg-[#171717] gap-4 items-center p-2 lg:p-3 lg:rounded-t-xl lg:gap-2">
            {/* -- PARTICIPANT LIST -- */}
            <ParticipantsModal participants={participants} owner_id={chat.data.owner_id} enabled={participantsMenu} setParticipantsMenu={setParticipantsMenu}/>

            <div className="flex items-center gap-2">
                <Link to="/" className='p-0 hover:-translate-x-0.5 transition duration-200 lg:p-1'>
                    <img src="/brand/svgs/rchevron.svg" width={32} alt="Exit chat" className="rotate-180" />
                </Link>

                {isGroup ? (
                    i_own_it ? (
                        <Link to={`/Chats/${chat?.data.id}/Edit`} className="flex items-center gap-3">
                            <ChatInfo image={chatImage} title={chatTitle} />
                        </Link>
                    ):(
                        <div className="flex items-center gap-3">
                            <ChatInfo image={chatImage} title={chatTitle} />
                        </div>
                    )
                ) : (
                    <Link to={`/Users/${other_end_user?.id}`} className="flex items-center gap-3 hover:opacity-80">
                        <ChatInfo image={chatImage} title={chatTitle} status={other_end_user?.active_status ? "Online" : "Offline"} />
                    </Link>
                )}
            </div>

            {!isGroup && other_end_user && (
                <Link to={`/Users/${other_end_user.id}/Wave`} className='p-2 hover:translate-x-0.5 transition duration-200'>
                    <span id="waves-sign" className="font-light">See wave</span>
                </Link>
            )}

            {isGroup && (
                <p onClick={() => setParticipantsMenu(!participantsMenu)} className="p-2 font-light hover:cursor-pointer">Participants</p>
            )}
        </div>
    );
}

function ChatInfo({ image, title, status }) {
    return (
        <>
            <img src={image} width={64} height={64} className="rounded-full aspect-square object-cover" alt={title} />
            <div className="flex flex-col">
                <h1 className="text-lg lg:text-xl font-light">{title}</h1>
                {status && <p className="text-xs font-light text-emerald-400">{status}</p>}
            </div>
        </>
    );
}