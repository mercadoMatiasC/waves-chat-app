import { ChatList } from "../components/ChatList";
import { ChatHeader } from "../components/ChatHeader";
import { MessageForm } from "../../messages/components/MessageForm";
import { useShowChat } from "../hooks/useShowChat"
import { useParams } from "react-router-dom";
import { useChatMessages } from "../hooks/useChatMessages";
import { useMe } from "../../profile/hooks/useMe";
import { MainMessageContainer } from "../components/MainMessagesContainer";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { useState } from "react";

export function ConversationShow() {
    const { id } = useParams();
    const [messageText, setMessageText] = useState("");
    const [attachmentsMenu, setAttachmentsMenu] = useState(false);
    const { data: me, meIsLoading, meError } = useMe();
    const { data: showChatData, isLoading, error } = useShowChat(id);
    
    const { data: chatMessages, isLoading: messagesIsLoading, isError: messagesError,
        fetchNextPage, hasNextPage, isFetchingNextPage } = useChatMessages(id);

    if (isLoading || messagesIsLoading || meIsLoading) return <LoadingScreen />
    if (error || messagesError || meError) return <p>Error loading chat.</p>;

    //FLATS DIFFERENT PAGES OF ARRAYS INTO A SINGLE ARRAY
    const messages = chatMessages?.pages.flatMap(page => page.data) ?? [];
    const messagesPagination = { fetchNextPage, hasNextPage, isFetchingNextPage };

    return (
        <main className="flex flex-row w-full h-[calc(100vh-64px)] p-0 lg:h-full lg:p-2 lg:rounded-xl">
            {/* -- CHATS LIST -- */}
            <section className="hidden items-center bg-[#141414] w-screen rounded-0 lg:flex lg:flex-col drop-shadow-lg drop-shadow-black lg:w-[30%] lg:rounded-xl">
                <ChatList />
            </section>

            {/* -- CURRENT CHAT -- */}
            <section key={id} className="flex flex-col w-full h-full overflow-hidden justify-between backdrop-blur-sm backdrop-brightness-80 lg:w-[70%] lg:rounded-xl lg:pl-2">
                {/* -- CHAT HEAD INFORMATION -- */}
                <ChatHeader chat={showChatData} />

                {/* -- ACTUAL MESSAGES -- */}
                <MainMessageContainer messages={messages} messagesPagination={messagesPagination} me={me} attachmentsMenu={attachmentsMenu} onEmojiSelect={(emoji) => setMessageText(prev => prev + emoji)} />

                {/* -- MESSAGE SEND FORM -- */}
                <MessageForm chat_id={id} my_id={me?.data.id} messageText={messageText} setMessageText={setMessageText} setAttachmentsMenu={setAttachmentsMenu} attachmentsMenu={attachmentsMenu} />          
            </section>
        </main>
    );
}