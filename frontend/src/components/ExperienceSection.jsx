import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { experience, education } from '../mock';

const ExperienceSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <section id="experience" className="relative py-32 bg-black overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500 rounded-full filter blur-[150px]" />
      </div>

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Experience & Education
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto" />
        </motion.div>

        {/* Experience */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <Briefcase className="text-cyan-400" size={32} />
            Professional Experience
          </motion.h3>

          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
              className="p-8 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">{exp.title}</h4>
                  <p className="text-cyan-400 text-lg font-semibold">{exp.company}</p>
                </div>
                <div className="flex flex-col md:items-end mt-4 md:mt-0">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Calendar size={16} />
                    <span className="text-sm">{exp.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin size={16} />
                    <span className="text-sm">{exp.location}</span>
                  </div>
                </div>
              </div>
              <ul className="space-y-3 mt-6">
                {exp.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-3xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <svg className="text-cyan-400" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
            Education
          </motion.h3>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                className="p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
                    <p className="text-gray-400">{edu.institution}</p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 mt-3 md:mt-0">
                    <Calendar size={16} />
                    <span className="text-sm">{edu.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
