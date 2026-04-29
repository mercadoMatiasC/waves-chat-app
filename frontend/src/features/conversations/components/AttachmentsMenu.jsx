import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

export function AttachmentsMenu({ attachmentsMenu, onEmojiSelect }){
    const [showPicker, setShowPicker] = useState(false);

    if (!attachmentsMenu) return null;

    const li_class = "flex items-center gap-2 group ease-in-out duration-200 hover:cursor-pointer hover:px-2";
    const img_class = "ease-in-out duration-200";

    return (
        <div className="fixed flex flex-col w-full bg-black/20 p-4 gap-2">
            {showPicker && (
                <div className="">
                    <EmojiPicker theme='dark' autoFocusSearch={false} width={screen} height={400} onEmojiClick={(emojiData) => {onEmojiSelect(emojiData.emoji)}} />
                </div>
            )}
            <h1 className="text-lg font-light">Attachments</h1>
            <ul className="space-y-5 font-light">
                <li className={`${li_class} ${showPicker && 'px-2'}`} onClick={() => setShowPicker(!showPicker)}>
                    <img src="/brand/svgs/emoji.svg" alt="emoji" width={32} className={`${img_class} rotate-6 group-hover:rotate-30`} />
                    Emojis
                </li>
                <li className={li_class}>
                    <img src="/brand/svgs/picture.svg" alt="emoji" width={32} className={`${img_class} -rotate-6 group-hover:rotate-12`} />
                    Image
                </li>
                <li className={li_class}>
                    <img src="/brand/svgs/paper-clip.svg" alt="emoji" width={32} className={`${img_class} -rotate-6 group-hover:rotate-12`} />
                    File
                </li>
            </ul>
        </div>
    );
}