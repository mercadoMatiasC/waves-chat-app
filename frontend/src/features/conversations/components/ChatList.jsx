import { useIndexChats } from "../hooks/useIndexChats";
import { Chat } from "./Chat";
import { Divider } from "../../../components/Divider";
import { LoadingScreen } from "../../../components/LoadingScreen"; 
import { useState } from "react";
import { SearchBar } from "../../../components/SearchBar";
import { ErrorScreen } from "../../../components/ErrorScreen";

export function ChatList(){
    const [searchTerm, setSearchTerm] = useState("");
    const { data: chatData, isLoading, error } = useIndexChats(searchTerm);

    if (isLoading) return <LoadingScreen />;
    if (error) return <ErrorScreen message={error.message}/>

    const chats = chatData.data;

    return (
        <section className="flex flex-col w-[92%] flex-1 min-h-0">
            <SearchBar onSearch={setSearchTerm} currentSearch={searchTerm} />
            
            <h1 className="text-start pt-3 text-xl font-light shrink-0">
                Conversations
            </h1>

            <Divider />

            <div className="w-full space-y-3 overflow-y-auto pr-1"> 
                {chats.length > 0 ? (
                    chats.map((item, index) => (
                        <Chat key={item.id || index} chat={item} />
                    ))
                ) : (
                    <p className="text-md font-light text-white/60">
                        {searchTerm ? "No conversations found." : "Add a friend to start chatting!"}
                    </p>
                )}
            </div>
        </section>
    );
}