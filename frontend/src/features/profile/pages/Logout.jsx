import { useEffect, useRef } from "react";
import { useLogout } from "../hooks/useLogout";
import { LoadingScreen } from "../../../components/LoadingScreen";

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
        <div className="flex h-screen w-screen items-center justify-center">
            <LoadingScreen message="See you soon!" />
        </div>
    );
}