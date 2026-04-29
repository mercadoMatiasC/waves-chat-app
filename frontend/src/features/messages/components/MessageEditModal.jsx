import { useState } from "react";
import { useUpdateMessage } from "../hooks/useUpdateMessage";
import { MutationMessages } from "../../../components/MutationMessages";

export function MessageEditModal({ message, setEditMessage }){
    const updateMessageMutation = useUpdateMessage();

    const [formData, setFormData] = useState({
        text_body: message.text_body,
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ [name]:value });
    }

    function handleSubmit(e) {
        e.preventDefault();

        updateMessageMutation.mutate(
            { id: message.id, data: formData }, 
            {
                onSuccess: () => {
                    setEditMessage(false);
                },
                onError: (error) => {
                    console.error("Update failed: ", error);
                }
            }
        );
    }

    return (
        <div id="edit-message-modal" class="flex flex-col fixed inset-0 bg-gray-900/80 overflow-y-auto h-full w-full z-40 justify-center items-center gap-3">
            <MutationMessages mutation={updateMessageMutation} />
            <h1 className="flex w-[92%] justify-start lg:w-4/5">
                <span className="text-lg font-light">Edit message</span>
            </h1>
            <div className="flex w-[92%] p-4 bg-sky-600/50 shadow-xl shadow-black/50 gap-10 items-center lg:w-4/5">
                <form onSubmit={handleSubmit} className="flex flex-col w-full justify-between gap-2">
                    <input type="text" name="text_body" value={formData.text_body} onChange={handleChange} className="bg-sky-900/90 rounded-md p-2" />
                    <div className="flex justify-end gap-2">
                        <button type="submit" className="main-button border-2 border-green-600">
                            Save
                        </button>
                        <button className="main-button border-2 border-red-500" onClick={() => setEditMessage(false)}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}