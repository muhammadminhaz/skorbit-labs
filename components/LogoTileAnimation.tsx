"use client";

import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

interface Tile {
  id: number;
  row: number;
  col: number;
  delay: number;
}

interface LogoTileAnimationProps {
  className?: string;
  onComplete?: () => void;
}

export default function LogoTileAnimation({ className = "", onComplete }: LogoTileAnimationProps) {
  const controls = useAnimation();
  const [isRevealed, setIsRevealed] = useState(false);

  // Create a 4x4 grid of tiles
  const rows = 4;
  const cols = 4;
  const tiles: Tile[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Calculate delay - tiles animate in sequence from top-left to bottom-right
      // But with a twist: bottom rows start their sequence after top rows partially complete
      const rowDelay = row * 0.15;
      const colDelay = col * 0.1;
      const delay = rowDelay + colDelay;

      tiles.push({
        id: row * cols + col,
        row,
        col,
        delay,
      });
    }
  }

  const tileVariants: Variants = {
    hidden: {
      scale: 0,
      opacity: 0,
      rotate: -180,
    },
    visible: (custom: number) => ({
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: custom,
      },
    }),
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  // Shuffle animation - tiles swap positions
  const runShuffleAnimation = useCallback(async () => {
    // Phase 1: Tiles appear
    await controls.start("visible");
    setIsRevealed(true);

    // Wait a moment
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Phase 2: Bottom tiles move up, top tiles move down (the swap)
    const shuffledTiles = [...tiles].sort((a, b) => a.delay - b.delay);

    for (let i = 0; i < shuffledTiles.length / 2; i++) {
      const topTile = shuffledTiles[i];
      const bottomTile = shuffledTiles[shuffledTiles.length - 1 - i];

      // Animate swap
      await Promise.all([
        controls.start((tile) => {
          if (tile.id === topTile.id) {
            return {
              y: (bottomTile.row - topTile.row) * 100,
              x: (bottomTile.col - topTile.col) * 100,
              transition: { type: "spring", stiffness: 150, damping: 15 },
            };
          }
          if (tile.id === bottomTile.id) {
            return {
              y: (topTile.row - bottomTile.row) * 100,
              x: (topTile.col - bottomTile.col) * 100,
              transition: { type: "spring", stiffness: 150, damping: 15 },
            };
          }
          return {};
        }),
      ]);

      // Small pause between swaps
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // Phase 3: Settle into final positions
    await controls.start({
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    });

    onComplete?.();
  }, [controls, onComplete]);

  useEffect(() => {
    runShuffleAnimation();
  }, [runShuffleAnimation]);

  return (
    <div className={`relative ${className}`}>
      {/* Container with perspective */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="relative grid grid-cols-4 gap-0.5 p-1"
        style={{
          width: "fit-content",
          perspective: "1000px",
        }}
      >
        {tiles.map((tile) => (
          <motion.div
            key={tile.id}
            custom={tile.delay}
            variants={tileVariants}
            className="relative w-12 h-12 md:w-16 md:h-16"
          >
            {/* Tile background with gradient */}
            <motion.div
              className="absolute inset-0 rounded-lg overflow-hidden"
              style={{
                background: `linear-gradient(135deg,
                  ${tile.row < 2 ? "rgba(14, 165, 233, 0.8)" : "rgba(168, 85, 247, 0.8)"} 0%,
                  ${tile.row < 2 ? "rgba(56, 189, 248, 0.6)" : "rgba(192, 132, 252, 0.6)"} 100%
                )`,
                boxShadow: isRevealed
                  ? "0 4px 15px rgba(14, 165, 233, 0.3)"
                  : "0 0 0 rgba(14, 165, 233, 0)",
              }}
              whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              {/* Inner glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />

              {/* Tile number (fades out) */}
              <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: isRevealed ? 0 : 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center text-white/40 text-xs font-mono"
              >
                {tile.id + 1}
              </motion.span>

              {/* Border highlight */}
              <div className="absolute inset-0 rounded-lg border border-white/10" />
            </motion.div>

            {/* Connection lines between adjacent tiles */}
            {tile.col < cols - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: tile.delay + 0.3, duration: 0.3 }}
                className="absolute top-1/2 right-0 w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent origin-left"
                style={{ transform: "translateY(-50%)" }}
              />
            )}
            {tile.row < rows - 1 && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: tile.delay + 0.3, duration: 0.3 }}
                className="absolute bottom-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-white/20 to-transparent origin-top"
                style={{ transform: "translateX(-50%)" }}
              />
            )}
          </motion.div>
        ))}

        {/* Center logo overlay that fades in after tiles settle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isRevealed ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 2.5, duration: 0.8, type: "spring" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="relative">
            {/* Glow */}
            <div className="absolute inset-0 bg-white/30 blur-xl scale-150" />

            {/* Logo image */}
            <img
              src="/images/logo_icon.png"
              alt="Skorbit Labs"
              className="relative w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-[0_0_20px_rgba(14,165,233,0.6)]"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative rings around the animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isRevealed ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 2, duration: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-20%]"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-sky-400 rounded-full blur-sm" />
        </motion.div>
      </motion.div>
    </div>
  );
}

// Simplified version for inline use (like in the hero)
export function LogoTileInline({ className = "" }: { className?: string }) {
  const rows = 3;
  const cols = 3;
  const tiles = [];

  for (let i = 0; i < rows * cols; i++) {
    tiles.push({
      id: i,
      delay: Math.floor(i / cols) * 0.1 + (i % cols) * 0.05,
    });
  }

  return (
    <motion.div
      className={`relative ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.03, delayChildren: 0.1 },
        },
      }}
    >
      <div className="grid grid-cols-3 gap-[2px]">
        {tiles.map((tile) => (
          <motion.div
            key={tile.id}
            variants={{
              hidden: { scale: 0, opacity: 0 },
              visible: {
                scale: 1,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: tile.delay,
                },
              },
            }}
            className="w-5 h-5 md:w-6 md:h-6 rounded-sm bg-gradient-to-br from-sky-400/80 to-sky-600/60"
          />
        ))}
      </div>

      {/* Logo overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <img
          src="/images/logo_icon.png"
          alt="Skorbit Labs"
          className="w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-lg"
        />
      </motion.div>
    </motion.div>
  );
}
