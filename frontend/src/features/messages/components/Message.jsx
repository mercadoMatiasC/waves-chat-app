export function Message({ message, is_mine }) {
    const message_date = new Date(message.created_at);
    const message_time = message_date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    return (
        <div className={`flex w-full mb-2 ${is_mine ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex flex-row justify-between gap-5 p-3 max-w-[70%] rounded-xl shadow-lg items-end ${
                is_mine 
                ? 'bg-sky-700 text-white rounded-br-none' 
                : 'bg-[#141414] text-white rounded-bl-none'
            }`}>
                <p className="font-light wrap-break-word">
                    {message.text_body}
                </p>

                <p className="font-light text-white/75 text-[12px] whitespace-nowrap">
                    {message_time}
                </p>
            </div>
        </div>
    );
}