import { motion } from "framer-motion";

const transition = (OgComponent) => {
  return (props) => (
    <div style={{ position: "relative", overflow: "hidden"}}>
      {/* Анимация входа */}
      <motion.div
        className="slide-in blurred-balls"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="slide-in-text"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          AniGen
        </motion.div>
      </motion.div>

      {/* Основной контент */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <OgComponent {...props} />
      </div>

      {/* Анимация выхода */}
      <motion.div
        className="slide-out blurred-balls"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="slide-out-text"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          AniGen
        </motion.div>
      </motion.div>
    </div>
  );
};

export default transition;
