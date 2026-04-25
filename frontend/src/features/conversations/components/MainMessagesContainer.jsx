import { Message } from "../../messages/components/Message";

export function MainMessageContainer({ messages, messagesPagination, me}){
    return (
        <div id="chat-message-container" className="relative flex-1 min-h-0 w-full overflow-hidden">
            <div className="absolute inset-0 flex flex-col-reverse gap-3 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-transparent items-center">
                {messages.length > 0 ? (
                    <>
                        {messages.map((item, index) => (
                            <Message key={item.id || index} message={item} is_mine={item.sender_id === me?.data.id} />
                        ))}

                        {messagesPagination.hasNextPage && (
                            <button onClick={() => messagesPagination.fetchNextPage()} disabled={messagesPagination.isFetchingNextPage} className="w-fit text-sky-200 font-light p-3 bg-black/50 text-sm rounded-lg hover:cursor-pointer hover:text-white disabled:text-gray-200">
                                {messagesPagination.isFetchingNextPage ? 'Loading older messages...' : 'Load more'}
                            </button>
                        )}
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-white/90 font-light text-lg">No messages yet. Say hi!</p>
                    </div>
                )}
            </div>
        </div>
    );
}