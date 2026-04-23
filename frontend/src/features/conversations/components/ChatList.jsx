import { Chat } from "./Chat";
import { ChatSearchBar } from "./ChatSearchBar";

export function ChatList(){
    const chats = [
        {
            'username': 'martin2019',
            'last_message': 'How is it going?'
        },
        {
            'username': 'this.is.nahuel',
            'last_message': 'Will you be coming over this weeknd?'
        },
        {
            'username': 'clara.ok',
            'last_message': 'Yes, I was told about.'
        },
        {
            'username': 'theNick',
            'last_message': 'sale lolcito'
        },
        {
            'username': 'klarkKent',
            'last_message': 'Should I bring some snacks?'
        },
        {
            'username': 'out_of_Seven',
            'last_message': 'There´s no way that happened.'
        },
    ];

    return (
        <section className="flex flex-col w-[92%] flex-1 min-h-0">
            <ChatSearchBar />
            <h1 className="text-start py-3 text-xl font-light shrink-0">
                Conversations
            </h1>

            <div className="w-full space-y-3 overflow-y-auto pr-1"> 
                {chats.map((item, index) => (
                    <Chat key={index} chat={item} />
                ))}
            </div>
        </section>
    );
}