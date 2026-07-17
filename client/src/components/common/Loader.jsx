import React from 'react';

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin" />
        <p className="text-white/60 mt-4">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;