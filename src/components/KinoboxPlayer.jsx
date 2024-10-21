import React, { useEffect, useRef } from "react";

function KinoboxPlayer({ title }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://kinobox.tv/kinobox.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (containerRef.current) {
        window.kbox(containerRef.current, {
          search: { title: title },
          menu: {
            enabled: false,
          },
        });
      }
    };

    return () => {
      try {
        document.body.removeChild(script);
      } catch (e) {}
    };
  }, [title]);

  return <div ref={containerRef} className="kinobox_player"></div>;
}

export default KinoboxPlayer;
