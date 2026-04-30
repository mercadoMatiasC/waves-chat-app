import { useState } from "react";
import { MessageEditModal } from "./MessageEditModal";

export function Message({ message, is_mine, sender, isGroup }) {
    const [editMessage, setEditMessage] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    
    const message_date = new Date(message.created_at);
    const message_time = message_date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const image_class = "rounded-full object-cover h-[48px]";
    const is_edited = message.created_at != message.updated_at;
    const userAvatar = sender?.profile_image_route ? sender.profile_image_route : "/brand/icons/avatar.webp";
    
    return (
        <div className={`flex flex-col w-full mb-2`}>
                <div className={`flex w-full gap-3 ${is_mine ? 'justify-end items-end' : 'justify-start items-start'}"`}>
                    {(isGroup && !is_mine) && (
                        <img src={userAvatar} alt="My Profile" width={48} className={image_class} />
                    )}
                    <div onClick={() => is_mine && setShowMobileMenu(!showMobileMenu)} className={`flex flex-row justify-between gap-2 p-3 max-w-[70%] rounded-xl shadow-lg items-end cursor-pointer ${
                        is_mine 
                        ? 'bg-sky-700 text-white rounded-br-none group' 
                        : 'bg-[#141414] text-white rounded-bl-none'
                    }`}>
                        <p className="font-light wrap-break-word overflow-hidden">
                            {message.text_body}
                        </p>

                        <p className="flex gap-1 font-light text-white/75 whitespace-nowrap items-center">
                            <span className={`text-[12px] ${is_mine && 'group-hover:hidden'}`}>{message_time}</span>
                            <span className={`${(is_mine && (showMobileMenu || editMessage)) ? 'flex' : 'hidden'} group-hover:flex text-[14px] hover:underline`} onClick={(e) => {e.stopPropagation(); setEditMessage(true); }}>
                                Edit
                            </span>
                            <span className={`${is_edited ? 'flex' : 'hidden' } ${is_mine && 'group-hover:hidden' } text-[12px]`}>edited</span>
                        </p>
                    </div>
                </div>

                {/* DISPLAY UX HOW-TO MESSAGE */}
                {is_mine && showMobileMenu && !editMessage && (
                    <div className="text-[10px] text-sky-400 mt-1 mr-2 lg:hidden animate-pulse">
                        Tap again to hide
                    </div>
                )}

                {editMessage && (
                    <MessageEditModal message={message} setEditMessage={setEditMessage} />
                )}

        </div>
    );
}