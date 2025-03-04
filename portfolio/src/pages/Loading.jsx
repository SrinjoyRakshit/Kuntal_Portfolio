import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Loading = ({ onLoaded }) => {
  const texts = ['Crafting Code...'];

  useEffect(() => {
    const timer = setTimeout(() => {
      onLoaded();
    }, texts.length * 3000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center text-white text-2xl">
      <motion.div
        className="overflow-hidden h-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
      >
        {texts.map((text, index) => (
          <motion.div
            key={index}
            className="text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 1, delay: index * 1.2 }}
          >
            {text}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Loading;