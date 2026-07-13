import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg">
      <div className="flex flex-col items-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 rounded-full border-4 border-blue-500/30 border-t-blue-500"
        />
        <p className="text-white/60 mt-4">Loading Dashboard...</p>
      </div>
    </div>
  );
};

export default Loader;