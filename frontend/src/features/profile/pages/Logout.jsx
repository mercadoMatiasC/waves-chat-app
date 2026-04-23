import { useEffect, useRef } from "react";
import { useLogout } from "../hooks/useLogout";

export function Logout(){
    const { mutate } = useLogout();
    const hasFired = useRef(false);

    useEffect(() => {
        if (!hasFired.current) {
            mutate();
            hasFired.current = true;
        }
    }, [mutate]);

    return (
        <div className="flex h-screen items-center justify-center">
            <p className="text-white">Logging out of Waves...</p>
        </div>
    );
}