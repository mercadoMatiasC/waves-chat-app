import { GroupForm } from "../components/GroupForm";

export function ConversationCreate(){

    return (
        <main className="flex flex-row w-full h-[calc(100vh-64px)] rounded-xl lg:h-full p-0 lg:p-2">
            {/* -- CHATS -- */}
            <section id="chat-list" className="flex flex-col items-center bg-[#141414] w-screen min-h-[calc(100vh-64px)] drop-shadow-lg drop-shadow-black lg:w-[30%] lg:h-full lg:rounded-xl">
                <GroupForm />
            </section>
        </main>
    );
}