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
          players: {
            // Настройки источников
            alloha: {
              // Название
              enable: true, // Включить
              position: 1, // Позиция в меню
            },
            kodik: {
              enable: true,
              position: 2,
            },
            Ashdi: {
              enable: false,
              position: 3,
            },
            Cdnmovies: {
              // Название
              enable: false, // Включить
              position: 4, // Позиция в меню
            },
            Collaps: {
              enable: false,
              position: 5,
            },
            Hdvb: {
              // Название
              enable: false, // Включить
              position: 6, // Позиция в меню
            },
            Turbo: {
              // Название
              enable: false, // Включить
              position: 7, // Позиция в меню
            },
            Vibix: {
              enable: false,
              position: 8,
            },
            Videocdn: {
              // Название
              enable: false, // Включить
              position: 9, // Позиция в меню
            },
            Voidboost: {
              enable: false,
              position: 10,
            },
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
