import { IndexFriend } from "./IndexFriend";

export function FriendList({ friends }){
    return (
        <section className="flex flex-col flex-1 min-h-0">
            <div className="w-full space-y-3"> 
                {friends.length > 0 ? (
                    friends?.map((item, index) => (
                    <IndexFriend key={index} friend={item} />
                ))
                    ):(
                    <p className="font-light">
                        Go and make some friends!
                    </p>
                )}
            </div>
        </section>
    );
}