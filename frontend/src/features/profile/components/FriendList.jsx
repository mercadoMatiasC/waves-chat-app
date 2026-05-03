import { IndexFriend } from "./IndexFriend";

export function FriendList({ friends }) {
    return (
        <div className="w-full space-y-3"> 
            {friends.length > 0 ? (
                friends.map((item, index) => (
                    <IndexFriend key={item.id || index} friend={item} />
                ))
            ) : (
                <p className="font-light">Go and make some friends!</p>
            )}
        </div>
    );
}