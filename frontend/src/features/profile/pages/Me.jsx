import { Link } from "react-router-dom";
import { ProfileDisplay } from "../components/ProfileDisplay";
import { ProfileForm } from "../components/ProfileForm";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { WaveForm } from "../../waves/components/WaveForm";
import { FriendList } from "../components/FriendList";

import { useMe } from "../hooks/useMe";
import { useFriends } from "../hooks/useFriends";

export function Me(){
    const { data: me, isLoading, error } = useMe();
    const { data: friends, isLoading: friendsLoading, error: friendsError } = useFriends();

    if (isLoading || friendsLoading) return <LoadingScreen />
    if (error || friendsError) return <p>Error: {error.message}</p>;

    const { wave, ...user_data } = me.data;

    return (
        <main className="flex flex-col w-full p-0 h-full lg:h-screen lg:p-2 lg:rounded-xl lg:flex-row overflow-hidden">
            <section className="flex flex-col pt-8 items-center bg-[#141414] w-screen p-3 lg:drop-shadow-lg lg:drop-shadow-black lg:w-[30%] lg:h-full lg:rounded-xl overflow-y-auto custom-scrollbar">                {/* -- DISPLAY USER INFORMATION -- */}
                {/* -- PROFILE DISPLAY -- */}
                <ProfileDisplay user={user_data} />
                
                {/* -- UPDATE FORM -- */}
                <ProfileForm user={user_data} />
            </section>

            {/* -- DISPLAY USER WAVE -- */}
            <section id="my-wave-container" className="lg:w-[70%] pt-2 h-full flex flex-col space-y-2 lg:pt-0 lg:pl-2 lg:pb-0 overflow-hidden">
                
                {/* Top Box: Wave Form (takes up roughly half or fixed amount) */}
                <div className="flex flex-col justify-center w-full bg-[#141414] py-5 px-5 gap-3 lg:rounded-2xl lg:h-[50%] shrink-0">
                    <WaveForm wave={wave} />
                </div>

                {/* Bottom Box: Friends (takes up the rest) */}
                <div className="flex flex-col w-full bg-[#141414] py-5 px-5 gap-3 lg:rounded-2xl flex-1 mt-2 lg:mt-0 overflow-hidden">
                    <div className="flex items-center justify-between shrink-0">
                        <h1 className="text-start py-3 text-xl font-light">Friends</h1>
                        <Link to="/Users"><p className="font-light">Add friends</p></Link>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar"> 
                        <FriendList friends={friends.data} />
                    </div>
                </div>
            </section>
        </main>
    );
}