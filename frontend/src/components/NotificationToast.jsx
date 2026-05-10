import { useEffect } from "react";
import { Link } from "react-router-dom";

export function NotificationToast({ notification, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => onClose(), 10000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="flex justify-between bg-blue-500/20 text-blue-300 p-3 w-80 lg:w-96 items-center rounded-lg h-20 text-sm border border-blue-500/50 backdrop-blur-md">
            <Link to={notification.redirectTo} className="flex items-center gap-4">
                <img src={notification.imageRoute} alt="icon" width={48} height={48} className="rounded-full shadow-lg" />
                <span>{notification.message}</span>
            </Link>
            <button className="text-blue-300 text-xl ml-2 hover:text-white" onClick={onClose}>x</button>
        </div>
    );
}