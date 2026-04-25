import { useUsers } from "../hooks/useUsers";
import { IndexUser } from "./IndexUser";
import { UserSearchBar } from "./UserSearchBar";
import { LoadingScreen } from "../../../components/LoadingScreen";

export function UserList(){
    const { data: users, isLoading, error } = useUsers();

    if (isLoading) return <LoadingScreen />
    if (error) return <p>Error: {error.message}</p>;

    return (
        <section className="flex flex-col w-[92%] flex-1 min-h-0">
            <UserSearchBar />
            <h1 className="text-start py-3 text-xl font-light shrink-0">
                <span id="waves-sign">Waves</span> users
            </h1>

            <div className="w-full space-y-3"> 
                {users.data.length > 0 ? (
                    users.data.map((item, index) => (
                        <IndexUser key={index} user={item} />
                    ))
                ):(
                    <p>Empty</p>
                )}
            </div>
        </section>
    );
}