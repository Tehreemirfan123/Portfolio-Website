import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { heroStates, personalInfo } from '../mock';

const HeroSection = () => {
  const [currentState, setCurrentState] = useState(0);

  // Cycle through hero states every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentState((prev) => (prev + 1) % heroStates.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        
        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-[120px]"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 80, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full filter blur-[120px]"
          />
          <motion.div
            animate={{
              x: [0, 60, 0],
              y: [0, -60, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 right-1/3 w-72 h-72 bg-violet-600/15 rounded-full filter blur-[100px]"
          />
        </div>
        
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content - Left Side */}
            <div className="max-w-3xl">
              {/* Small intro text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6"
              >
                <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">
                  {personalInfo.role}
                </span>
              </motion.div>

              {/* Main headline with state transitions */}
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentState}
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                >
                  {heroStates[currentState].headline}
                </motion.h1>
              </AnimatePresence>

              {/* Supporting text with transitions */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${currentState}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-gray-300 text-lg md:text-xl mb-12 leading-relaxed"
                >
                  {heroStates[currentState].supportingText}
                </motion.p>
              </AnimatePresence>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <motion.a
                  href="#skills"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg transition-all duration-300"
                >
                  Skills
                </motion.a>
                <motion.a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  View Projects
                </motion.a>
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  Contact Me
                </motion.a>
              </motion.div>

              {/* State indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex gap-2 mt-12"
              >
                {heroStates.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentState(index)}
                    className="group relative"
                  >
                    <div
                      className={`h-1 rounded-full transition-all duration-500 ${
                        index === currentState
                          ? 'w-12 bg-cyan-400'
                          : 'w-8 bg-gray-600 group-hover:bg-gray-500'
                      }`}
                    />
                  </button>
                ))}
              </motion.div>
            </div>

            {/* Professional Picture - Right Side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="hidden lg:flex justify-center items-center"
            >
              <div className="relative">
                {/* Animated gradient ring */}
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 p-1 blur-sm"
                  style={{ width: '420px', height: '420px' }}
                />
                
                {/* Static gradient border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 p-[3px]" style={{ width: '420px', height: '420px' }}>
                  <div className="w-full h-full rounded-full bg-black" />
                </div>

                {/* Profile image container */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-full overflow-hidden border-4 border-black bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
                  style={{ width: '400px', height: '400px' }}
                >
                  {/* Profile Image with theme adjustments */}
                  {personalInfo.profileImage && (
                    <img
                      src={personalInfo.profileImage}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover relative z-10"
                      style={{
                        filter: 'contrast(1.05) saturate(1.1) brightness(0.95)',
                      }}
                    />
                  )}
                  
                  {/* Theme color overlay for cohesion */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-600/15 z-20 pointer-events-none mix-blend-overlay" />
                  
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 z-20 pointer-events-none" style={{
                    boxShadow: 'inset 0 0 80px 20px rgba(0, 0, 0, 0.4)'
                  }} />
                  
                  {/* Initials placeholder (shown if no image) */}
                  {!personalInfo.profileImage && (
                    <div className="absolute inset-0 flex items-center justify-center z-0">
                      <div className="text-center">
                        <div className="text-9xl font-bold bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                          TI
                        </div>
                        <p className="text-gray-400 text-sm mt-2 px-8">Add your photo here</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Subtle gradient overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-25" />
                  
                  {/* Name badge at bottom */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                  >
                    <p className="text-white font-semibold text-base whitespace-nowrap">{personalInfo.name}</p>
                  </motion.div>
                </motion.div>

                {/* Floating elements around the image */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl rotate-12 opacity-70 blur-sm"
                />
                
                <motion.div
                  animate={{
                    y: [0, 20, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-violet-500 to-blue-600 rounded-3xl -rotate-12 opacity-60 blur-sm"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 1 }, y: { repeat: Infinity, duration: 2 } }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 hover:text-white transition-colors"
      >
        <ChevronDown size={32} />
      </motion.button>
    </section>
  );
};

export default HeroSection;
