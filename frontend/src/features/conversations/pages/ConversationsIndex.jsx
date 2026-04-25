import { ChatList } from "../components/ChatList";
import { Dashboard } from "../../../components/Dashboard";

export function ConversationsIndex(){
    return (
        <main className="flex flex-row w-full h-[calc(100vh-64px)] rounded-xl lg:h-full p-0 lg:p-2">
            {/* -- CHATS -- */}
            <section className="flex flex-col items-center bg-[#141414] w-screen min-h-[calc(100vh-64px)] drop-shadow-lg drop-shadow-black lg:w-[30%] lg:h-full lg:rounded-xl">
                <ChatList />
            </section>

            {/* -- CHATS -- */}
            <section className="hidden flex-col items-center w-screen min-h-[calc(100vh-64px)] pl-2 lg:flex lg:w-[70%] lg:h-full">
                <Dashboard />
            </section>
        </main>
    );
}