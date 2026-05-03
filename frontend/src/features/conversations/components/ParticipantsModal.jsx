import { Link } from "react-router-dom";

export function ParticipantsModal({ participants, enabled, owner_id, setParticipantsMenu }){
    if (!enabled) return null;
    const owner = participants.find(user => user.id === owner_id)

    return (
        <div id="edit-message-modal" class="flex flex-col fixed inset-0 bg-gray-900/80 overflow-y-auto h-full w-full z-40 justify-center items-center gap-3">
            <div className="flex justify-between w-[92%] lg:w-4/5">
                <h1 className="flex justify-start text-lg font-light">
                    Group participants
                </h1>

                <div role="button" className="hover:cursor-pointer" onClick={() => setParticipantsMenu(false)}>
                    Return
                </div>
            </div>
            <div className="flex flex-col w-[92%] p-4 bg-sky-600/50 shadow-xl shadow-black/50 gap-4 items-center lg:w-4/5">
                <Link to={`/Users/${owner.id}`} className="flex w-full justify-between items-center gap-3">
                    <div className="flex w-full items-center gap-3">
                        <img src={owner.profile_image_route ? owner.profile_image_route : "/brand/icons/avatar.webp" } loading="lazy" width={64} className="rounded-full aspect-square object-cover" alt="Participant avatar" /> 
                        <p>{owner.username}</p>
                    </div>
                    <p>Owner</p>
                </Link>

                {participants.map((item, index) => (
                    item.id != owner_id && (
                        <Link key={index} to={`/Users/${item.id}`} className="flex w-full justify-between items-center gap-3">
                            <div className="flex w-full items-center gap-3">
                                <img src={item.profile_image_route ? item.profile_image_route : "/brand/icons/avatar.webp" } loading="lazy" width={64} className="rounded-full aspect-square object-cover" alt="Participant avatar" /> 
                                <p>{item.username}</p>
                            </div>
                        </Link>
                    )
                ))}
            </div>
        </div>
    );
}