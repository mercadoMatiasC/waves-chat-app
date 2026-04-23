import { ChatList } from "../components/ChatList";
import { ChatHeader } from "../components/ChatHeader";
import { MessageForm } from "../../messages/components/MessageForm";
import { useShowChat } from "../hooks/useShowChat"
import { useParams } from "react-router-dom";
import { useChatMessages } from "../hooks/useChatMessages";
import { Message } from "../../messages/components/Message";
import { useMe } from "../../profile/hooks/useMe";

export function ConversationShow() {
    const { id } = useParams();
    const { data: me, meIsLoading, meError } = useMe();
    const { data: showChatData, isLoading, error } = useShowChat(id);
    
    const { data: chatMessages, isLoading: messagesIsLoading, isError: messagesError,
        fetchNextPage, hasNextPage, isFetchingNextPage } = useChatMessages(id);

    if (isLoading || messagesIsLoading || meIsLoading) return <p>Loading...</p>;
    if (error || messagesError || meError) return <p>Error loading chat.</p>;

    //FLATS DIFFERENT PAGES OF ARRAYS INTO A SINGLE ARRAY
    const messages = chatMessages?.pages.flatMap(page => page.data) ?? [];

    return (
        <main className="flex flex-row w-full h-[calc(100vh-64px)] p-0 lg:h-full lg:p-2 lg:rounded-xl">
            {/* -- CHATS LIST -- */}
            <section className="hidden items-center bg-[#141414] w-screen rounded-0 lg:flex lg:flex-col drop-shadow-lg drop-shadow-black lg:w-[30%] lg:rounded-xl">
                <ChatList />
            </section>

            {/* -- CURRENT CHAT -- */}
            <section className="flex flex-col w-full h-full overflow-hidden justify-between backdrop-blur-sm backdrop-brightness-80 lg:w-[70%] lg:rounded-xl lg:pl-2">
                <ChatHeader chat={showChatData} />
                
                <div id="chat-message-container" className="relative flex-1 min-h-0 w-full overflow-hidden">
                    <div className="absolute inset-0 flex flex-col-reverse gap-3 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-transparent items-center">
                        {messages.length > 0 ? (
                            <>
                                {messages.map((item, index) => (
                                    <Message key={item.id || index} message={item} is_mine={item.sender_id === me?.data.id} />
                                ))}

                                {hasNextPage && (
                                    <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage} className="w-fit text-sky-200 font-light p-3 bg-black/50 text-sm rounded-lg hover:cursor-pointer hover:text-white disabled:text-gray-200">
                                        {isFetchingNextPage ? 'Loading older messages...' : 'Load more'}
                                    </button>
                                )}
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center">
                                <p className="text-gray-500">No messages yet. Say hi!</p>
                            </div>
                        )}
                    </div>
                </div>

                <MessageForm chat_id={id} my_id={me?.data.id} />          
            </section>
        </main>
    );
}