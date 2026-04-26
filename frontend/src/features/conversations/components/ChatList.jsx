import { useIndexChats } from "../hooks/useIndexChats";
import { Chat } from "./Chat";
import { ChatSearchBar } from "./ChatSearchBar";
import { Divider } from "../../../components/Divider";

export function ChatList(){
    const { data: chatData, isLoading, error } = useIndexChats();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const chats = chatData.data;

    return (
        <section className="flex flex-col w-[92%] flex-1 min-h-0">
            <ChatSearchBar />
            <h1 className="text-start pt-3 text-xl font-light shrink-0">
                Conversations
            </h1>

            <Divider />

            <div className="w-full space-y-3 overflow-y-auto pr-1"> 
                {chats.length > 0 ? 
                    (chats.map((item, index) => (
                        <Chat key={index} chat={item} />
                    ))
                    ):(
                        <p className="text-md font-light text-white/60">
                            Add a friend to start chatting!
                        </p>
                    )
                }
            </div>
        </section>
    );
}