function handleSubmit(e){
    e.preventDefault();
    console.log('Lizard!');
}

export function UserSearchBar(){
    return (
        <form onSubmit={handleSubmit} className="flex flex-row py-5 gap-3 items-center">
            <input type="search" className="w-full bg-[#303030] placeholder:font-light p-3 rounded-2xl focus:outline-none" placeholder="Search user..." /> 
            
            <button type="submit">
                <img src="/brand/svgs/blob-button.svg" width={64} alt="Search Button" />
            </button>
        </form>
    );
}