import { ChatList } from "../components/ChatList";
import { ChatHeader } from "../components/ChatHeader";
import { MessageForm } from "../components/MessageForm";

export function ConversationShow(){
    const chat = {
        'username': 'Matías',
        'online_status': 'Online'
    };

    return (
        <main className="flex flex-row w-full h-[calc(100vh-64px)] p-0 lg:h-full lg:p-2 lg:rounded-xl">
            {/* -- CHATS -- */}
            <section className="hidden items-center bg-[#141414] w-screen rounded-0 lg:flex lg:flex-col lg:w-[30%] lg:rounded-xl">
                <ChatList />
            </section>

            {/* -- CURRENT CHAT -- */}
            <section className="flex flex-col w-full justify-between backdrop-blur-sm backdrop-brightness-80 lg:w-[70%] lg:rounded-xl lg:pl-2">
                <ChatHeader chat={chat} />

                <div id="chat-message-container" className="flex flex-col-reverse">
                    <p>XD1</p>
                    <p>XD2</p>
                    <p>XD3</p>
                    <p>XD4</p>
                </div>

                <MessageForm />          
            </section>
        </main>
    );
}