import { useParams } from "react-router-dom";
import { GroupForm } from "../components/GroupForm";
import { useEditChat } from "../hooks/useEditChat";
import { LoadingScreen } from "../../../components/LoadingScreen";

export function ConversationEdit(){
    const { id } = useParams();
    const { data: chatData, isLoading, error } = useEditChat(id);

    if (isLoading) return <LoadingScreen />
    if (error) return <p>{error.message}</p>;

    return (
        <main className="flex flex-row w-full h-[calc(100vh-64px)] rounded-xl lg:h-full p-0 lg:p-2">
            {/* -- CHATS -- */}
            <section id="chat-list" className="flex flex-col items-center bg-[#141414] w-screen min-h-[calc(100vh-64px)] drop-shadow-lg drop-shadow-black lg:w-[30%] lg:h-full lg:rounded-xl">
                <GroupForm group={chatData.data} />
            </section>
        </main>
    );
}