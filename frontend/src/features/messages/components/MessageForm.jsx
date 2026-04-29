import { useStoreMessage } from "../hooks/useStoreMessage";

//SVGS
import { Plus } from "../../../components/SVGS/Plus";
import { Chevron } from "../../../components/svgs/Chevron";

export function MessageForm({ chat_id, my_id, setAttachmentsMenu, attachmentsMenu, messageText, setMessageText }) {
    const storeMessageMutation = useStoreMessage(chat_id);

    function handleChange(e) {
        setMessageText(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!messageText.trim()) return;

        storeMessageMutation.mutate({ 
            data: {
                text_body: messageText,
                sender_id: my_id
            } 
        });

        setMessageText("");
    }

    return (
        <form id="chat-footer" onSubmit={handleSubmit} className="flex flex-row bg-[#171717] justify-between p-4 gap-4 lg:rounded-b-xl">
            <button type="button" onClick={() => setAttachmentsMenu(!attachmentsMenu)} className="flex hover:cursor-pointer px-4 py-3" style={{ backgroundImage: `url('/brand/svgs/blob-button.svg')`, backgroundSize: 'cover'}}>
                <Plus />
            </button>

            <input type="text" name="text_body" value={messageText} onChange={handleChange} placeholder="Write a message..." required className="w-full bg-[#303030] placeholder:font-light p-3 rounded-2xl focus:outline-none" />

            <button type="submit" className="flex hover:cursor-pointer px-4 py-3" disabled={storeMessageMutation.isPending} style={{ backgroundImage: `url('/brand/svgs/blob-button.svg')`, backgroundSize: 'cover'}}>
                <Chevron />
            </button>
        </form>  
    );
}