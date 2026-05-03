export function DesktopSpace(){
    return (
        <section className="hidden lg:flex items-end justify-end w-[70%]">
            <span className="flex items-center p-5 drop-shadow-lg drop-shadow-black">
                <img src="/brand/mini-logo.webp" loading="lazy" width={96} alt="waves-logo" />
                <div>
                    <h1 id="waves-sign" className="text-2xl text-end">Waves</h1>
                    <h2 className="text-md font-extralight">by matiasMercado</h2>
                </div>
            </span>
        </section>
    );
}