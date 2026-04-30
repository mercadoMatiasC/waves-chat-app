export function IndexContact({ contact, onSelect, isSelected }) {
    return (
        <div onClick={() => onSelect(contact.id)} className={`flex flex-row w-full justify-between p-3 rounded-2xl items-center cursor-pointer transition-all duration-100 ${
            isSelected 
            ? 'bg-[#1a3a2a] border border-emerald-500'
            : 'bg-[#242424] hover:bg-[#202020]'
        }`}>
            <div className="flex items-center gap-3">
                <img src={contact?.profile_image_route || "/brand/icons/avatar.webp"} width={54} className="rounded-full aspect-square object-cover" alt="avatar" />
                <h2 className={isSelected ? "text-emerald-400 font-bold" : ""}>
                    {contact?.username}
                </h2>
            </div>

            <div className="flex gap-3 items-center">
                <p className="text-sm">{isSelected ? "Remove" : "Add"}</p>
            </div>
        </div>
    );
}