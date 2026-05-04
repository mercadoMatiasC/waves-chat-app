import { useIndexUsers } from "../hooks/useIndexUsers";
import { IndexUser } from "./IndexUser";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { SearchBar } from "../../../components/SearchBar";
import { useState } from "react";

export function UserList(){
    const [searchTerm, setSearchTerm] = useState("");
    const { data: usersData, isLoading, error } = useIndexUsers(searchTerm);

    if (isLoading) return <LoadingScreen />
    if (error) return <p>Error: {error.message}</p>;

    const users = usersData.data;

    return (
        <section className="flex flex-col w-[92%] flex-1 min-h-0">
            <SearchBar onSearch={setSearchTerm} currentSearch={searchTerm} />
            <h1 className="text-start py-3 text-xl font-light shrink-0">
                <span id="waves-sign">Waves</span> users
            </h1>

            <div className="w-full space-y-3"> 
                {users.length > 0 ? (
                    users.map((item, index) => (
                        <IndexUser key={index} user={item} />
                    ))
                ):(
                    <p className="font-light">No users found</p>
                )}
            </div>
        </section>
    );
}