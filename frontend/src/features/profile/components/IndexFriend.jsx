import { FriendButton } from "./FriendButton";
import { MutationMessages } from "../../../components/MutationMessages";
import { useDeleteRequest } from "../../friends/hooks/useDeleteRequest";
import { Link } from "react-router-dom";

export function IndexFriend({ friend }){
    const deleteRequestMutation = useDeleteRequest();

    function deleteFriendRequest() {
        deleteRequestMutation.mutate(friend.id);
    }

    return (
        <main>
            <MutationMessages mutation={deleteRequestMutation} />
            <div className='flex flex-row w-full justify-between bg-[#242424] p-3 rounded-2xl items-center hover:bg-[#202020] transition-all duration-100'>
                <Link to={`/Users/${friend.id}`} className="flex items-center gap-3">
                    <img src={friend?.profile_image_route || "/brand/icons/avatar.webp"} width={54} className="rounded-full aspect-square object-cover" alt="avatar" />
                    <h2>{friend.username}</h2>
                </Link>

                <div className="flex gap-3 items-center">
                    <Link to={`/Users/${friend.id}`}>
                        <p className="font-light">See profile</p>
                    </Link>
                    <FriendButton label="Unfriend" hoverColor="red" isLoading={deleteRequestMutation.isPending} onClick={deleteFriendRequest} />
                </div>
            </div>
        </main>
    );
}