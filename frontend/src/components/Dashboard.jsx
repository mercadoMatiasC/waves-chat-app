import { Link } from "react-router-dom";
import { useMe } from "../features/profile/hooks/useMe";

export function Dashboard(){
    const { data: me } = useMe();
    const userAvatar = me?.data.profile_image_route ? me.data.profile_image_route : "/brand/icons/avatar.webp";
    const icon_size = 100;
    const icon_class = "drop-shadow-xl drop-shadow-black hover:-translate-y-1 hover:drop-shadow-sky-600/40 hover:cursor-pointer duration-200";

    return (
        <main className="flex flex-col w-full h-full bg-black/90 items-center justify-center rounded-xl backdrop-blur-sm">
            <h1 className="text-2xl font-light mb-5">
                Welcome to <span id="waves-sign">Waves</span>!
            </h1>
            <div className="grid grid-cols-2 gap-10">
                <Link to="/Users" className="font-light hover:text-white/75">
                    <img src="/brand/icons/add-friend-icon.webp" loading="lazy" width={icon_size} alt="Add a friend icon" className={icon_class} />
                </Link>
                
                <Link to="/Me">
                    <img src={userAvatar} loading="lazy" width={icon_size} alt="My avatar placeholder" className={`${icon_class} rounded-full object-cover`} />
                </Link>

                <Link to="/Logout">
                    <img src="/brand/icons/logout-icon.webp" loading="lazy" width={icon_size} alt="Log out icon" className={icon_class} />
                </Link>

                <Link to="/Chats/Create">
                    <img src="/brand/icons/create-group-icon.webp" loading="lazy" width={icon_size} alt="Create a group" className={icon_class} />
                </Link>
            </div>
        </main>
    );
}