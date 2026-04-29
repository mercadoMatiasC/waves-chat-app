import { ProfileDisplay } from "../components/ProfileDisplay";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { Wave } from "../components/Wave"

import { Link, useParams } from "react-router-dom";
import { useShowUser } from "../hooks/useShowUser";

export function UsersShow(){
    const { id } = useParams();
    const { data: showUserData, isLoading, error } = useShowUser(id);

    if (isLoading) return <LoadingScreen />
    if (error) return <p>Error: {error.message}</p>;

    const user_data = showUserData.data;

    return (
        <main className="flex flex-col w-full p-0 min-h-[calc(100vh-64px)] lg:h-full lg:p-2 lg:rounded-xl lg:flex-row">
            <section className="flex flex-col items-center bg-[#141414] w-full p-3 lg:drop-shadow-lg lg:drop-shadow-black lg:w-[30%] lg:h-full lg:rounded-xl">
                {/* -- DISPLAY USER INFORMATION -- */}
                <ProfileDisplay user={user_data} />
                <div className="flex w-full justify-between items-center">
                    {user_data.is_friend ? (
                        <>
                            <p className="font-light text-lg p-3">You and <span className="font-bold">{user_data.username}</span> are friends</p>
                            <Link to={`/Chats/${user_data.chat_id}`} >
                                <button className="main-button border-2 border-sky-700">
                                    Go to chat
                                </button>
                            </Link>
                        </>
                    ):(
                        <p className="font-light text-lg p-3">You and <span className="font-bold">{user_data.username}</span> are not friends</p>
                    )}
                </div>
            </section>

            {/* -- DISPLAY USER WAVE -- */}
            {user_data.is_friend && (
                <section id="my-wave-container" className="pt-2 h-full space-y-2 drop-shadow-lg drop-shadow-black lg:py-0 lg:pl-2 lg:w-[70%]">
                    <div className="flex flex-col w-full h-full bg-[#141414] py-5 px-5 gap-3 lg:rounded-2xl lg:h-full">
                        <h1 className="text-lg font-light">Wave</h1>
                        <Wave wave={user_data.wave} />
                    </div>
                </section>
            )}
        </main>
    );
}