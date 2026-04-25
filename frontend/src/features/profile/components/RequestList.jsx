import { IndexUser } from "./IndexUser";

export function RequestList({ requests, received = false }){
    return (
        <section className="flex flex-col flex-1 min-h-0">
            <h1 className="text-start py-3 text-xl font-light shrink-0">
                {received ? (
                    <span>Received</span>
                ) : (
                    <span>Sent</span>
                )}
            </h1>

            <div className="w-full space-y-3"> 
                {requests.length > 0 ? (
                    requests?.map((item, index) => (
                    <IndexUser key={index} user={item} is_request received={received} />
                ))
                    ):(
                    <p className="font-light">
                        There are currently no requests.
                    </p>
                )}
            </div>
        </section>
    );
}