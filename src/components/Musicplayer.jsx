import React, { useRef, useEffect, useState } from "react";
import music from '../assets/audio/music.wav'
const MusicPlayer = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    useEffect(() => {
        const handleAutoplay = () => {
            const audio = audioRef.current;

            if (!isPlaying) {
                audio.play().then(() => {
                    setIsPlaying(true); // Mark music as playing
                }).catch((error) => {
                    console.error("Autoplay error:", error);
                });
            }
        };

        // Attach the listener to start playback on interaction
        document.addEventListener("click", handleAutoplay);
        document.addEventListener("keydown", handleAutoplay);

        // Cleanup listeners on unmount
        return () => {
            document.removeEventListener("click", handleAutoplay);
            document.removeEventListener("keydown", handleAutoplay);
        };
    }, [isPlaying]);

    return (
        <audio ref={audioRef} src={music} preload="auto" hidden />
    );
};

export default MusicPlayer;
