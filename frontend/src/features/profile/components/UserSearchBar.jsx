import { MagnifyingGlass } from "../../../components/SVGS/MagnifyingGlass";

function handleSubmit(e){
    e.preventDefault();
    console.log('Lizard!');
}

export function UserSearchBar(){
    return (
        <form onSubmit={handleSubmit} className="flex flex-row py-5 gap-3 items-center">
            <input type="search" className="w-full bg-[#303030] placeholder:font-light p-3 rounded-2xl focus:outline-none" placeholder="Search user..." /> 
            
            <div role="button" type="submit" className="flex hover:cursor-pointer px-4 py-3" style={{ backgroundImage: `url('/brand/svgs/blob-button.svg')`, backgroundSize: 'cover'}}>
                <MagnifyingGlass />
            </div>
        </form>
    );
}