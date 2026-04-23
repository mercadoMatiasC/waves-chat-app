export function Header(){
    return (
        <header className="flex flex-row w-screen text-white bg-[#181818] justify-between items-center px-3 py-1 h-16 lg:p-3 lg:flex-col lg:h-screen lg:w-[4%]">
            <img src="/brand/mini-logo.webp" width={64} alt="Waves mini logo" />

            {/* -- MOBILE -- */}
            <img src="/brand/svgs/hamburger.svg" width={48} alt="Hamburger icon" className="flex lg:hidden" />

            {/* -- DESKTOP -- */}
            <div className="hidden flex-col gap-4 lg:flex">
                <img src="/brand/icons/waves-icon.webp" width={64} alt="Waves icon" />
                <img src="/brand/icons/add-friend-icon.webp" width={64} alt="Add a friend icon" />
                <img src="/brand/icons/avatar.webp" width={64} alt="My avatar placeholder" />
            </div>
        </header>
    );
}