import { PulseLoader } from "react-spinners";

export default function Loading() {
    return (
        <div className="h-screen w-screen bg-black flex justify-center items-center">
            <PulseLoader color="#89CFF0"/>
        </div>
    )
}