function handleSubmit(e){
    e.preventDefault();
    console.log('Lizard');
}

export function MessageForm(){
    return (
        <form id="chat-footer" onSubmit={handleSubmit} className="flex flex-row bg-[#171717] justify-between p-4 lg:gap-4 lg:rounded-b-xl">
            <button>
                <img src="/brand/svgs/blob-button.svg" width={64} alt="Attachment button" />
            </button>

            <input type="text" className="w-full bg-[#303030] placeholder:font-light p-3 rounded-2xl focus:outline-none" placeholder="Write a message..." />

            <button>
                <img src="/brand/svgs/blob-button.svg" width={64} alt="Attachment button" />
            </button>
        </form>  
    );
}