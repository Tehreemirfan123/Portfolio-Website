import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Brain, Rocket } from 'lucide-react';
import { aboutText, personalInfo } from '../mock';

const AboutSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const highlights = [
    {
      icon: Code2,
      title: "Production-Grade Systems",
      description: "End-to-end ML pipelines from data collection to deployment, APIs, and infrastructure"
    },
    {
      icon: Brain,
      title: "Research & Development",
      description: "Model training, optimization, fine-tuning on custom datasets with measurable results"
    },
    {
      icon: Rocket,
      title: "Deployment Expertise",
      description: "Docker, FastAPI, vector databases, edge deployment, and real-time inference"
    }
  ];

  return (
    <section id="about" className="relative py-32 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500 rounded-full filter blur-[120px]" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500 rounded-full filter blur-[120px]" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {aboutText}
            </p>
            <motion.a
              href={personalInfo.resumeUrl}
              download
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Download Resume
            </motion.a>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.2 }}
                  whileHover={{ x: 10 }}
                  className="flex gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Icon className="text-white" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
