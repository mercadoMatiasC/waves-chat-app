import { useState } from "react";
import { Link } from "react-router-dom";

export function Header(){
    const [menuStatus, setMenuStatus] = useState(false);

    const link_class = "flex font-light hover:text-white/75 items-center gap-3";
    const image_class = "w-12 lg:w-16";
    const nav_class = `${!menuStatus ? "hidden" : "flex flex-col"} bg-[#050505]/50 backdrop-blur-sm p-3 lg:flex lg:flex-col lg:p-0 lg:bg-black/0`;

    const nav_items = [
        { to: "/", icon: "waves-icon.webp", label: "Waves" },
        { to: "/Users", icon: "add-friend-icon.webp", label: "Add a friend" },
        { to: "/Me", icon: "avatar.webp", label: "My profile" },
        { to: "/Logout", icon: "logout-icon.webp", label: "Log out" },
    ];

    return (
        <header className="flex flex-col w-screen text-white bg-[#181818] justify-between items-center py-1 h-16 lg:p-3 lg:flex-col lg:h-screen lg:w-[4%]">
            <div className="flex justify-between w-full items-center px-3">
                <Link to="/">
                    <img src="/brand/mini-logo.webp" width={64} alt="Waves mini logo" className="hover:drop-shadow-xl drop-shadow-amber-400 ease-in-out duration-200" />
                </Link>

                {/* -- MOBILE -- */}
                <div role="button" tabIndex="0" onClick={() => setMenuStatus(!menuStatus)}>
                    <img src="/brand/svgs/hamburger.svg" width={48} alt="Hamburger icon" className="flex lg:hidden" />
                </div>
            </div>

            <div className={`z-10 space-y-4 w-full ` + nav_class}>
                {nav_items.map((item) => (
                    <Link key={item.to} to={item.to} className={link_class}>
                        <img src={`/brand/icons/${item.icon}`} alt={item.label} className={image_class} />
                        <p className="lg:hidden">{item.label}</p>
                    </Link>
                ))}
            </div>
        </header>
    );
}