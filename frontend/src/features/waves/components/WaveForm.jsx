import { useEffect, useState } from "react";
import { useUpdateWave } from "../hooks/useUpdateWave";
import { MutationMessages } from "../../../components/MutationMessages";
import { Wave } from "../../profile/components/Wave";
import { EmojiInput } from "../../../components/EmojiInput";

export function WaveForm({ wave = null }){
    const updateWaveMutation = useUpdateWave();
    const input_class = "w-full bg-[#303030] p-3 rounded-2xl focus:outline-none";

    const [formData, setFormData] = useState({
        text_body: wave.text_body,
        colour_code: wave.colour_code,
        emoji: wave.emoji,
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData(prev => {
            let updates = { [name]: value };

            return { 
                ...prev, 
                ...updates 
            };
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        //REMOVE EMPTY FIELDS
        const filteredData = Object.fromEntries(
            Object.entries(formData).filter(([_, value]) => value !== "")
        );

        updateWaveMutation.mutate({ data: filteredData });
    }

    useEffect(() => {
        if (wave)
            setFormData({
                text_body: wave.text_body,
                colour_code: wave.colour_code,
                emoji: wave.emoji,
            });
    }, [wave]);

    return (
        <div className={`flex flex-col w-full py-3 px-3 lg:px-10 justify-center lg:flex-row`}>
            <form onSubmit={handleSubmit} className="space-y-5 lg:pr-5 lg:w-3/5">
                <h1 className="text-xl font-light">Update your <span id="waves-sign">Wave</span></h1>
                
                <div id="my-wave" className="space-y-6">
                    <label htmlFor="wave-text-body">Body</label>
                    <input id="wave-text-body" type="text" name="text_body" onChange={handleChange} value={formData.text_body} className={input_class}/>
                        
                    <label htmlFor="wave-colour-code">Colour</label>
                    <div className={`flex gap-4 items-center ${input_class}`}>
                        <input id="wave-colour-code" type="color" name="colour_code" onChange={handleChange} value={formData.colour_code} className="" />
                        <p>{formData.colour_code}</p>
                    </div>
                    
                    {/* -- EMOJI PICKER -- */}
                    <EmojiInput value={formData.emoji} onChange={handleChange} />
                </div>

                <div className={`flex ${(updateWaveMutation.isError || updateWaveMutation.isSuccess) ? 'justify-between' : 'justify-end'} items-start`}>
                    {/* -- MUTATION MESSAGES -- */}
                    <MutationMessages mutation={updateWaveMutation} />
                    <button disabled={updateWaveMutation.isPending} type="submit" className="main-button border-2 border-sky-700">
                        Update
                    </button>
                </div>
            </form>

            {/* -- DISPLAY WAVE -- */}
            <span className="mt-3 h-32 lg:h-100 lg:w-2/5 lg:mt-0">
                <Wave wave={formData} />
            </span>
        </div>
    );
}