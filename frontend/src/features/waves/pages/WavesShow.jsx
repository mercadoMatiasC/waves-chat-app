import { Link, useNavigate, useParams } from "react-router-dom";
import { Wave } from "../../profile/components/Wave";
import { useShowWave } from "../hooks/useShowWave";
import { LoadingScreen } from "../../../components/LoadingScreen";
 
export function WavesShow(){
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: waveData, isLoading, error } = useShowWave(id);

    if (isLoading) return <LoadingScreen />
    if (error) return <p>Error: {error.message}</p>;

    const wave = waveData.data;

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] lg:h-full w-full lg:items-center">
            <div role="button" onClick={() => navigate(-1)} className="flex gap-3 w-full p-3 bg-[#141414]/90 items-center hover:cursor-pointer lg:w-2/5">
                <img src="/brand/svgs/rchevron.svg" width={32} alt="Exit chat" className="rotate-180" />
                <p>Go Back</p>
            </div>
            <div className="h-full w-full lg:w-2/5">
                <Wave wave={wave} />
            </div>
        </div>
    );
}