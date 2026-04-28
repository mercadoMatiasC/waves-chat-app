import { UserList } from "../components/UserList";
import { RequestList } from "../components/RequestList";
import { useReceivedRequests } from "../../friends/hooks/useReceivedRequests";
import { useSentRequests } from "../../friends/hooks/useSentRequests";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { Divider } from "../../../components/Divider"

export function UsersIndex(){
    const { data: receivedRequests, isLoading: receivedIsLoading, error: receivedError } = useReceivedRequests();
    const { data: sentRequests, isLoading: sentIsLoading, error: sentError } = useSentRequests();
    
    if (receivedIsLoading || sentIsLoading) return <LoadingScreen />
    if (receivedError || sentError) return <p>Error: {receivedError.message || sentError.message}</p>;

    return (
        <main className="flex flex-col-reverse w-full bg-[#141414] lg:bg-white/0 p-0 h-full lg:p-2 lg:rounded-xl lg:flex-row">
            {/* -- USERS LIST -- */}
            <section className="flex flex-col items-center w-screen min-h-[calc(100vh-64px)] drop-shadow-lg drop-shadow-black lg:bg-[#141414] lg:w-[30%] lg:h-full lg:rounded-xl">
                <UserList />
            </section>

            <div className="lg:hidden items-center px-5">
                <Divider />
            </div>

            <section className="lg:w-[70%] h-full space-y-2 lg:drop-shadow-lg lg:drop-shadow-black lg:py-0 lg:pl-2">
                <div className="flex flex-col w-full py-5 px-5 gap-3 lg:bg-[#141414] lg:rounded-2xl">
                    <h1 className="text-start py-3 text-xl font-light shrink-0">
                        Friend requests
                    </h1>

                    {/* -- RECEIVED REQUESTS LIST -- */}
                    <RequestList requests={receivedRequests?.data || []} received />

                    {/* -- SENT REQUESTS LIST -- */}
                    <RequestList requests={sentRequests?.data || []} />
                </div>
            </section>
        </main>
    );
}