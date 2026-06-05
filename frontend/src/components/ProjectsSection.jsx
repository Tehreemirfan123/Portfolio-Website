import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, TrendingUp, Star } from 'lucide-react';
import { projects as resumeProjects } from '../mock';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

const ProjectCard = ({ project, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const isGitHubProject = project.source === 'github';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="relative p-8 md:p-12 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden">
        {/* Background glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-500" />

        <div className="relative z-10">
          {/* Project Type Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="inline-block px-4 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-semibold rounded-full">
              {project.type ? project.type.replace('-', ' ').toUpperCase() : 'PROJECT'}
            </div>
            {isGitHubProject && project.stargazers_count > 0 && (
              <div className="flex items-center gap-1 text-yellow-400 text-sm">
                <Star size={14} fill="currentColor" />
                <span>{project.stargazers_count}</span>
              </div>
            )}
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300"
          >
            {project.title || project.name}
          </motion.h3>

          {/* Description */}
          {project.description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.1 + 0.4 }}
              className="text-gray-300 text-lg mb-6 leading-relaxed"
            >
              {project.description}
            </motion.p>
          )}

          {/* Technologies */}
          {(project.technologies || project.topics) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.5 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {(project.technologies || project.topics || []).map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white/5 text-gray-400 text-sm rounded-lg border border-white/10"
                >
                  {tech}
                </span>
              ))}
              {project.language && !project.technologies && (
                <span className="px-3 py-1 bg-white/5 text-gray-400 text-sm rounded-lg border border-white/10">
                  {project.language}
                </span>
              )}
            </motion.div>
          )}

          {/* Achievements (for resume projects) */}
          {project.achievements && project.achievements.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.6 }}
              className="space-y-3 mb-8"
            >
              {project.achievements.map((achievement, i) => (
                <div key={i} className="flex items-start gap-3">
                  <TrendingUp className="text-cyan-400 flex-shrink-0 mt-1" size={16} />
                  <p className="text-gray-400 text-sm">{achievement}</p>
                </div>
              ))}
            </motion.div>
          )}

          {/* Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.7 }}
            className="flex gap-4"
          >
            <motion.a
              href={project.html_url || project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all duration-300"
            >
              <Github size={18} />
              <span>View Code</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [allProjects, setAllProjects] = useState(resumeProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubProjects = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/github/projects`);
        if (response.ok) {
          const data = await response.json();

          // Mark GitHub projects with source and filter out unwanted ones
          const excludedProjects = [
            'react-optimization-bootcamp',
            'codsoft',
            'portfolio-website',
            'portfolio'
          ];

          // Helper function to normalize names for comparison (removes spaces, hyphens, underscores)
          const normalize = (str) => str.toLowerCase().replace(/[\s\-_]/g, '');

          const githubProjects = data.projects
            .filter(proj => !excludedProjects.some(excluded =>
              proj.name.toLowerCase().includes(excluded)
            ))
            .map(proj => ({
              ...proj,
              source: 'github',
              title: proj.name,
              // Determine project type based on topics or language
              type: proj.topics.includes('computer-vision') || proj.topics.includes('yolo')
                ? 'computer-vision'
                : proj.topics.includes('ai') || proj.topics.includes('machine-learning')
                  ? 'ai-ml'
                  : 'software'
            }));

          // Merge resume projects with GitHub projects (resume projects first)
          const merged = [...resumeProjects];

          // Add GitHub projects that aren't already in resume projects
          // Uses normalized comparison and keyword matching for accuracy
          githubProjects.forEach(ghProj => {
            const ghNormalized = normalize(ghProj.name);

            const exists = resumeProjects.some(rp => {
              const rpNormalized = normalize(rp.title);
              // Check normalized inclusion in either direction
              if (rpNormalized.includes(ghNormalized) || ghNormalized.includes(rpNormalized)) {
                return true;
              }
              // Check for shared significant keywords (4+ chars)
              const rpKeywords = rpNormalized.match(/[a-z]+/g) || [];
              const ghKeywords = ghNormalized.match(/[a-z]+/g) || [];
              const sharedKeywords = rpKeywords.filter(k =>
                k.length >= 4 && ghKeywords.some(g => g.includes(k) || k.includes(g))
              );
              return sharedKeywords.length >= 2 ||
                (sharedKeywords.length === 1 && sharedKeywords[0].length >= 6);
            });

            if (!exists) {
              merged.push(ghProj);
            }
          });

          setAllProjects(merged);
        }
      } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        // Keep using resume projects as fallback
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubProjects();
  }, []);

  return (
    <section id="projects" className="relative py-32 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-600 rounded-full filter blur-[120px]" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Production-grade AI systems from research to deployment
          </p>
          {loading && (
            <p className="text-cyan-400 text-sm mt-4">Loading projects from GitHub...</p>
          )}
        </motion.div>

        <div className="space-y-16">
          {allProjects.map((project, index) => (
            <ProjectCard key={project.id || index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
