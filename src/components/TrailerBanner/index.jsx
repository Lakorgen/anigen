import React from "react";
import { clsx } from "clsx";
import Button from "../Button";

const TrailerBanner = ({ title, description }) => {
  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border border-solid border-zinc-300 dark:border-zinc-800">
      {!isVideoLoaded && (
        <img
          src="/img/attack.webp"
          alt="Placeholder"
          className="absolute inset-0 w-full h-full object-cover z-[1] opacity-100 transition-opacity"
        />
      )}
      <video
        src="/media/titan.webm"
        autoPlay
        muted
        loop
        onLoadedData={handleVideoLoaded}
        className={clsx(
          "top-2/4 l-2/4 max-w-full min-h-full object-cover z-0 transition-opacity",
          isVideoLoaded ? "opacity-100" : "opacity-0"
        )}
      />
      <div className="absolute top-0 left-0 w-full h-full z-[1] flex justify-stretch items-end p-2.5 bg-custom-gradient">
        <div className="w-full flex items-center justify-center">
          <Button label="ATTACK ON TITAN" link={`/anime/40028`} className="bg-transparent dark:bg-transparent font-semibold text-white" />
        </div>
      </div>
    </div>
  );
};

export default TrailerBanner;
