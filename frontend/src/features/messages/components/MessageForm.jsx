import { useState } from "react";
import { useStoreMessage } from "../hooks/useStoreMessage";

export function MessageForm({ chat_id, my_id }) {
    const storeMessageMutation = useStoreMessage(chat_id);

    const [formData, setFormData] = useState({
        text_body: "",
        sender_id: my_id
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setFormData(prev => ({ 
                ...prev, 
                text_body: "" 
        }));

        if (!formData.text_body.trim()) 
            return;

        storeMessageMutation.mutate({ data: formData });
    }

    return (
        <form id="chat-footer" onSubmit={handleSubmit} className="flex flex-row bg-[#171717] justify-between p-4 lg:gap-4 lg:rounded-b-xl">
            <button>
                <img src="/brand/svgs/blob-button.svg" width={64} alt="Attachment button" />
            </button>

            <input type="text" name="text_body" value={formData.text_body} onChange={handleChange} placeholder="Write a message..." required className="w-full bg-[#303030] placeholder:font-light p-3 rounded-2xl focus:outline-none" />

            <button type="submit" disabled={storeMessageMutation.isPending}>
                <img src="/brand/svgs/blob-button.svg" width={64} alt="Submit button" />
            </button>
        </form>  
    );
}