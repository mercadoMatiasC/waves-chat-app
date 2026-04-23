import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export function Layout(){
    
    return (
        <>
            <Header />
            <main className="flex grow justify-center lg:justify-start">
                <Outlet />
            </main>
        </>
    );
}