export function FriendButton({ onClick, label, hoverColor, isLoading }) {
    // Mapping colors to Tailwind classes
    const color_classes = {
        sky: "border-sky-600",
        red: "border-red-500",
        green: "border-green-400"
    };

    return (
        <button onClick={onClick} disabled={isLoading} className={`border-2 px-4 py-2 rounded-xl transition-all duration-200 disabled:opacity-50 ${color_classes[hoverColor]}`}>
            {isLoading ? "..." : label}
        </button>
    );
}