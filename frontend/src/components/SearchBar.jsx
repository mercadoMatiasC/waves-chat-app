import { MagnifyingGlass } from "./SVGS/MagnifyingGlass";
import { useRef } from "react";

export function SearchBar({ onSearch, currentSearch }){
    const inputRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
        onSearch(inputRef.current.value);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-row py-5 gap-3 items-center">
            <input type="search" ref={inputRef} defaultValue={currentSearch} className="w-full bg-[#303030] placeholder:font-light p-3 rounded-2xl focus:outline-none" placeholder="Search..." /> 
            
            <button type="submit" className="flex hover:cursor-pointer px-4 py-3" style={{ backgroundImage: `url('/brand/svgs/blob-button.svg')`, backgroundSize: 'cover'}}>
                <MagnifyingGlass />
            </button>
        </form>
    );
}