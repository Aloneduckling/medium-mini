import { Player } from "@lottiefiles/react-lottie-player";
import loadingError from "../assets/error.json"
import React from "react";

type DisplayErrorProps = {
    error: string;
}

const DisplayError: React.FC<DisplayErrorProps> = ({ error }) => {
    return (
        <div className="w-full h-[100vh] flex flex-col justify-center">
            <Player
                className="w-[300px] h-[300px]"
                src={loadingError}
                autoplay
                loop
                speed={1}
            />
            <h1 className="text-3xl text-center">Something went Wrong</h1>
            <h2 className="text-xl text-center mt-3">{error}</h2>
        </div>
    );
}

export default DisplayError