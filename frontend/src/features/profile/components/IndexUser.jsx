import { FriendButton } from "./FriendButton";
import { MutationMessages } from "../../../components/MutationMessages";

//HOOKS
import { useDeleteRequest } from "../../friends/hooks/useDeleteRequest";
import { useSendRequest } from "../../friends/hooks/useSendRequest";
import { useAcceptRequest } from "../../friends/hooks/useAcceptRequest";

export function IndexUser({ user, is_request = false, received = false }){
    const storeRequestMutation = useSendRequest();
    const deleteRequestMutation = useDeleteRequest();
    const acceptRequestMutation = useAcceptRequest();
    
    const activeMutation = [storeRequestMutation, deleteRequestMutation].find(
        m => m.isPending || m.isError || m.isSuccess
    );

    function acceptFriendRequest() {
        acceptRequestMutation.mutate(user.id);
    }

    function sendFriendrequest() {
        storeRequestMutation.mutate(user.id);
    }

    function deleteFriendRequest() {
        deleteRequestMutation.mutate(user.id);
    }

    return (
        <main>
            <MutationMessages mutation={activeMutation} />

            <div className='flex flex-row w-full justify-between bg-[#242424] p-3 rounded-2xl items-center hover:translate-x-1 hover:bg-[#202020] transition-all duration-100'>
                <div className="flex items-center gap-3">
                    <img src={user?.profile_image_route || "/brand/icons/avatar.webp"} width={54} className="rounded-full aspect-square object-cover" alt="avatar" />
                    <h2>{user.username}</h2>
                </div>

                <div className="flex gap-3">
                    {is_request ? (
                        received ? (
                            <>
                                <FriendButton label="Accept" hoverColor="green" onClick={acceptFriendRequest} />
                                <FriendButton label="Reject" hoverColor="red" isLoading={deleteRequestMutation.isPending} onClick={deleteFriendRequest} />
                            </>
                        ) : (
                            <FriendButton label="Cancel" hoverColor="red" isLoading={deleteRequestMutation.isPending} onClick={deleteFriendRequest} />
                        )
                    ) : (
                        <FriendButton label="Add friend" hoverColor="sky" isLoading={storeRequestMutation.isPending} onClick={sendFriendrequest} />
                    )}
                </div>
            </div>
        </main>
    );
}