import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { personalInfo } from '../mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm flex items-center gap-2"
          >
            <span>© {currentYear} {personalInfo.name}.</span>
            <span className="flex items-center gap-1">
              Built with <Heart size={14} className="text-red-500 fill-red-500" /> and AI
            </span>
          </motion.div>

          {/* Name/Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              {personalInfo.name}
            </h3>
            <p className="text-gray-500 text-xs mt-1">{personalInfo.role}</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex gap-6"
          >
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
            >
              Back to Top
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
