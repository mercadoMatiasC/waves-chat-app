import EmojiPicker from 'emoji-picker-react';
import { useState, useRef, useEffect } from "react";

export function EmojiInput({ value, onChange, label = "Emoji" }) {
    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef(null);

    useEffect(() => { //CLOSE PICKER ON UNFOCUS
        function handleClickOutside(event) {
            if (pickerRef.current && !pickerRef.current.contains(event.target))
                setShowPicker(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const onEmojiClick = (emojiData) => {
        onChange({
            target: {
                name: 'emoji',
                value: emojiData.emoji
            }
        });
        setShowPicker(false);
    };

    return (
        <div className="flex flex-col space-y-2 relative" ref={pickerRef}>
            <label className="text-sm font-medium">{label}</label>
            
            <div onClick={() => setShowPicker(!showPicker)} className="w-full bg-[#303030] p-3 rounded-2xl cursor-pointer flex justify-between items-center border border-transparent hover:border-sky-700/50 transition-colors">
                <span className="text-xl">{value || "Select an emoji..."}</span>
                <img src="/brand/svgs/rchevron.svg" width={16} alt="Exit chat" className="rotate-90" />
            </div>

            {showPicker && (
                <div className="absolute  mb-3 z-50 left-0 w-full md:w-87.|5">
                    <EmojiPicker onEmojiClick={onEmojiClick} theme="dark" width="100%" height="400px" previewConfig={{ showPreview: false }} skinTonesDisabled />
                </div>
            )}
        </div>
    );
}