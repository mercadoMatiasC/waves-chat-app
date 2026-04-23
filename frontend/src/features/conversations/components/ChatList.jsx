import { useIndexChats } from "../hooks/useIndexChats";
import { Chat } from "./Chat";
import { ChatSearchBar } from "./ChatSearchBar";

export function ChatList(){
    const { data: chatData, isLoading, error } = useIndexChats();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const chats = chatData.data;
    //const meta = chatData.meta;

    return (
        <section className="flex flex-col w-[92%] flex-1 min-h-0">
            <ChatSearchBar />
            <h1 className="text-start py-3 text-xl font-light shrink-0">
                Conversations
            </h1>

            <div className="w-full space-y-3 overflow-y-auto pr-1"> 
                {chats.map((item, index) => (
                    <Chat key={index} chat={item} />
                ))}
            </div>
        </section>
    );
}