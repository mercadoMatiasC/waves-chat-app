export function InputFile({ name, onChange }) {
    const base_class = "w-full bg-white/10 rounded p-2 text-sm file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/30 file:text-white hover:cursor-pointer";

    return (
        <input className={base_class} type="file" name={name} accept="image/*" onChange={onChange} />
    );
}