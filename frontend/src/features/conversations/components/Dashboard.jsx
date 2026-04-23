export function Dashboard(){
    const icon_size = 100;
    const icon_class = "drop-shadow-xl drop-shadow-black hover:-translate-y-1 hover:cursor-pointer ease-in-out duration-200";

    return (
        <main className="flex flex-col w-full h-full bg-[#141414]/95 items-center justify-center rounded-xl drop-shadow-lg drop-shadow-black">
            <h1 className="text-2xl font-light mb-5">
                Welcome to <span className="text-emerald-300">Waves</span>!
            </h1>
            <div className="grid grid-cols-2 gap-10">
                <img src="/brand/icons/waves-icon.webp" width={icon_size} alt="Waves icon" className={icon_class} />
                <img src="/brand/icons/add-friend-icon.webp" width={icon_size} alt="Add a friend icon" className={icon_class} />
                <img src="/brand/icons/avatar.webp" width={icon_size} alt="My avatar placeholder" className={icon_class} />
            </div>
        </main>
    );
}