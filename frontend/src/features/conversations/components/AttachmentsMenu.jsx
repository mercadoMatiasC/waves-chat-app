export function AttachmentsMenu({ attachmentsMenu }){
    if (!attachmentsMenu) return null;

    const li_class = "flex items-center gap-2";

    return (
        <div className="flex w-full bg-black/20 p-3">
            <ul className="space-y-2 font-light">
                <li className={li_class}>
                    <img src="/brand/svgs/emoji.svg" alt="emoji" width={32} />
                    Emojis
                </li>
                <li className={li_class}>
                    <img src="/brand/svgs/picture.svg" alt="emoji" width={32} />
                    Image
                </li>
                <li className={li_class}>
                    <img src="/brand/svgs/paper-clip.svg" alt="emoji" width={32} />
                    File
                </li>
            </ul>
        </div>
    );
}