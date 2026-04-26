export function Wave({ wave }){
    return (
        <div className="w-full h-full rounded-xl flex items-center justify-center text-white gap-1" style={{ background: `linear-gradient(45deg, rgb(0,0,0, 0.5), ${wave.colour_code} )` }} >
            <p className="text-[2vh]">{wave.text_body}</p>
            <p className="text-3xl">
                {wave.emoji}
            </p>
        </div>
    );
}