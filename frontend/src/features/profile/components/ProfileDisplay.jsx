export function ProfileDisplay({ user }){
    return (
        <section id="my-profile" className="flex flex-col w-[92%] min-h-0">
            <h1 className="text-2xl font-light my-4">Profile information</h1>
            <div className="flex w-full gap-3 items-center">
                <img src={user?.profile_image_route || "/brand/icons/avatar.webp"} width={96} height={96} className="rounded-full aspect-square object-cover" alt={`${user?.username}'s avatar`} />
                
                <div className="flex flex-col">
                    <h1 className="text-start py-3 text-xl font-light shrink-0">
                        <span id="waves-sign">{user.username}</span>
                    </h1>
                    <h2 className="font-light">
                        {user.description}
                    </h2>
                </div>
            </div>
        </section>
    );
}