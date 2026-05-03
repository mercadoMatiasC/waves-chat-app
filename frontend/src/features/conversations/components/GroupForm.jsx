import { useEffect, useState } from "react";
import { useUpdateGroup } from "../hooks/useUpdateGroup";
import { useStoreGroup } from "../hooks/useStoreGroup";
import { useFriends } from "../../profile/hooks/useFriends";
import { ContactList } from "./ContactList";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { MutationMessages } from "../../../components/MutationMessages";
import { useDeleteGroup } from "../hooks/useDeleteGroup";

export function GroupForm({ group }){
    const { data: friends, isLoading, error } = useFriends();
    const updateGroupMutation = useUpdateGroup();
    const storeGroupMutation = useStoreGroup();
    const deleteGroupMutation = useDeleteGroup();

    const is_edit = !!group;
    const mutation = is_edit ? updateGroupMutation : storeGroupMutation; 

    const [formData, setFormData] = useState({
        group_title: group?.group_title ||  "",
        participants: group?.participants?.map(p => p.id) || [],
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData(prev => {
            let updates = { [name]: value };

            return { 
                ...prev, 
                ...updates 
            };
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        const dataToSend = {
            ...formData,
            is_group: 1
        };

        console.log(dataToSend)

        if (is_edit)
            mutation.mutate({ 
                id: group.id, 
                data: dataToSend 
            });
        else
            mutation.mutate({ data: dataToSend });
    }

    function handleDelete() {
        deleteGroupMutation.mutate({ id: group.id });
    }

    function handleSelectFriend(friendId) {
        setFormData(prev => {
            const isSelected = prev.participants.includes(friendId);
            return {
                ...prev,
                participants: isSelected
                    ? prev.participants.filter(id => id !== friendId)
                    : [
                        ...prev.participants,
                        friendId
                    ]
            };
        });
    }

    useEffect(() => {
        if (group)
            setFormData({
                group_title: group?.group_title ||  "",
                participants: group?.participants?.map(p => p.id) || [],
            });
    }, [group]); 

    if (isLoading) return <LoadingScreen />
    if (error) return <p>{error.message}</p>;

    return (
        <div className="flex flex-col p-4 w-full">
            <h1 className="text-lg font-light py-2">
                {is_edit ? 'Update your group details' : 'Create a group'}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6" >
                <label htmlFor="group_title">Title</label>
                <input id="group-title" type="text" name="group_title" placeholder="My group..." onChange={handleChange} value={formData.group_title} className="w-full bg-[#303030] placeholder:font-light p-3 rounded-2xl focus:outline-none" />

                <div className={`flex ${is_edit ? 'justify-between' : 'justify-end'}`}>
                    {is_edit && (
                        <button type="button" className="main-button border-2 border-red-600" onClick={handleDelete}>
                            Delete
                        </button>
                    )}

                    <button type="submit" className="main-button border-2 border-emerald-600">
                        {is_edit ? 'Update' : 'Create'}
                    </button>
                </div>

                <ContactList contacts={friends.data} onSelect={handleSelectFriend} selectedIds={formData?.participants} />
            </form>
            <MutationMessages mutation={mutation} />
        </div>
    );
}