import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMe } from "../features/profile/hooks/useMe"
import { useLogout } from "../features/profile/hooks/useLogout";

export function Header() {
    const { data: me } = useMe();
    const [menuStatus, setMenuStatus] = useState(false);

    const location = useLocation();
    const logoutMutation = useLogout();

    //SHOW HEADER ONLY IN AUTHORIZED VIEWS
    const publicRoutes = ["/Login", "/Register", "/Logout"];
    if (publicRoutes.includes(location.pathname)) return null;

    const isLoggingOut = logoutMutation.isPending || logoutMutation.isSuccess;
    const userAvatar = (!isLoggingOut && me?.data?.profile_image_route) ? me.data.profile_image_route : "/brand/icons/avatar.webp";

    const link_class = "flex font-light hover:text-white/75 items-center gap-3";
    const image_class = "rounded-full object-cover";
    const nav_class = `${!menuStatus ? "hidden" : "flex flex-col"} bg-[#050505]/50 backdrop-blur-sm p-3 lg:flex lg:flex-col lg:p-0 lg:bg-black/0`;

    return (
        <header className="flex flex-col w-screen text-white bg-[#181818] justify-between items-center py-1 h-16 lg:p-3 lg:flex-col lg:h-screen lg:w-[4%]">
            <div className="flex justify-between h-full w-full items-center px-3 lg:h-auto lg:px-0">
                <Link to="/">
                    <img src="/brand/mini-logo.webp" width={64} alt="Waves mini logo" className="hover:drop-shadow-xl drop-shadow-amber-400 ease-in-out duration-200" />
                </Link>

                <div role="button" tabIndex="0" onClick={() => setMenuStatus(!menuStatus)}>
                    <img src="/brand/svgs/hamburger.svg" width={48} alt="Hamburger icon" className="flex lg:hidden" />
                </div>
            </div>

            <div className={`z-10 space-y-4 w-full ` + nav_class}>
                {/* Add a Friend */}
                <Link to="/Chats/Create" className={link_class}>
                    <img src="/brand/icons/create-group-icon.webp" alt="Create a group" className="w-12 lg:w-16" />
                    <p className="lg:hidden">Create a group</p>
                </Link>

                <Link to="/Users" className={link_class}>
                    <img src="/brand/icons/add-friend-icon.webp" alt="Add Friend" className="w-12 lg:w-16" />
                    <p className="lg:hidden">Add a friend</p>
                </Link>

                {/* My Profile - Now using real Avatar */}
                <Link to="/Me" className={link_class}>
                    <img src={userAvatar} alt="My Profile" width={48} className={image_class} />
                    <p className="lg:hidden">My profile</p>
                </Link>

                {/* Logout */}
                <Link to="/Logout" className={link_class}>
                    <img src="/brand/icons/logout-icon.webp" alt="Logout" className="w-12 lg:w-16" />
                    <p className="lg:hidden">Log out</p>
                </Link>
            </div>
        </header>
    );
}