import { ProfileDisplay } from "../components/ProfileDisplay";
import { ProfileForm } from "../components/ProfileForm";
import { useMe } from "../hooks/useMe";
import { LoadingScreen } from "../../../components/LoadingScreen";

export function Me(){
    const { data: me, isLoading, error } = useMe();

    if (isLoading) return <LoadingScreen />
    if (error) return <p>Error: {error.message}</p>;

    const { wave, ...user_data } = me.data;

    return (
        <main className="flex flex-col w-full p-0 h-full lg:p-2 lg:rounded-xl lg:flex-row space-y-2">
            <section className="flex flex-col items-center bg-[#141414] w-screen min-h-[calc(100vh-64px)] p-3 drop-shadow-lg drop-shadow-black lg:w-[30%] lg:h-full lg:rounded-xl">
                {/* -- DISPLAY USER INFORMATION -- */}
                <ProfileDisplay user={user_data} />
                
                {/* -- UPDATE FORM -- */}
                <ProfileForm user={user_data} />
            </section>

            {/* -- DISPLAY USER WAVE -- */}
            <section id="my-wave-container" className="lg:w-[70%] py-2 h-full space-y-2 drop-shadow-lg drop-shadow-black lg:py-0 lg:pl-2">
                <div className="flex flex-col w-full bg-[#141414] py-5 px-5 gap-3 lg:rounded-2xl">
                    <h1 className="text-lg font-light">Wave</h1>
                    <div className="w-full h-32 rounded-xl flex items-center justify-center text-white gap-1" style={{ background: `linear-gradient(45deg, rgb(0,0,0, 0.5), ${wave.colour_code} )` }} >
                        <p className="text-[2vh]">{wave.text_body}</p>
                        <p className="text-3xl">
                            {wave.emoji}
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}