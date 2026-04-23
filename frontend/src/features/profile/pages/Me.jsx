import { useMe } from "../hooks/useMe";

export function Me(){
    const { data: me, isLoading, error } = useMe();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <pre>{JSON.stringify(me, null, 2)}</pre> 
            <p>Welcome, {me?.username}!</p>
        </div>
    );
}