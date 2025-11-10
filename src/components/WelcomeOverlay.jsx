import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function WelcomeOverlay({ name, siteName = "FoodStreet", duration = 3800, onClose }) {
  useEffect(() => {
    const t = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);

  // create a small confetti set to render (purely decorative)
  const confetti = new Array(12).fill(0).map((_, i) => {
    const colors = ["#FFD166", "#EF476F", "#06D6A0", "#118AB2", "#FFC857"];
    return {
      id: i,
      color: colors[i % colors.length],
      left: `${6 + (i * 7) % 92}%`,
      delay: `${(i % 5) * 0.12}s`,
      rotate: `${(i % 4) * 45}deg`,
    };
  });

  return (
    <div className="welcome-overlay" role="dialog" aria-modal="true">
      <div className="welcome-bg-blobs" aria-hidden>
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
      </div>

      {confetti.map((c) => (
        <span
          key={c.id}
          className="confetti"
          style={{
            left: c.left,
            background: c.color,
            transform: `rotate(${c.rotate})`,
            animationDelay: c.delay,
          }}
        />
      ))}

      <motion.div
        className="welcome-card"
        initial={{ scale: 0.85, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1
          className="welcome-title"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.5 }}
        >
          Congratulations
        </motion.h1>

        <motion.p
          className="welcome-name"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.28, duration: 0.45 }}
        >
          {name}
        </motion.p>

        <motion.p
          className="welcome-sub"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.42, duration: 0.45 }}
        >
          Welcome to our website called {siteName}
        </motion.p>

        <button className="welcome-close" aria-label="Close welcome" onClick={() => onClose?.()}>
          Continue
        </button>
      </motion.div>
    </div>
  );
}
