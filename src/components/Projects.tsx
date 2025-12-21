import { motion } from 'framer-motion';
import { ExternalLink, Github, Cpu, Sparkles, Zap } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Projects = () => {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center justify-center p-2 sm:p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-3 sm:mb-4">
            <Cpu className="text-white w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">AI-Powered Projects</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Showcasing my work integrating cutting-edge AI with modern web development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl card-hover group"
            >
              {/* Project Header */}
              <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="p-1.5 sm:p-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-lg">
                      <Zap className="text-primary-600 dark:text-primary-400 w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold">{project.title}</h3>
                  </div>
                  <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium">
                    AI Project
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
                  {project.description}
                </p>
                
                {/* Metrics Badge */}
                <div className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-700 dark:text-green-400 rounded-full text-xs sm:text-sm">
                  <Sparkles size={12} className="sm:w-3 sm:h-3 mr-1 sm:mr-2" />
                  {project.metrics}
                </div>
              </div>

              {/* AI Explanation */}
              <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                <div className="flex items-center mb-2 sm:mb-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                    AI Integration
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                  {project.aiExplanation}
                </p>
              </div>

              {/* Technologies */}
              <div className="p-4 sm:p-6 pt-3 sm:pt-4">
                <h4 className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 sm:mb-3">
                  TECHNOLOGIES USED
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 sm:px-3 sm:py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <h4 className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 sm:mb-3">
                  KEY FEATURES
                </h4>
                <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary-500 rounded-full mr-2 sm:mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Action Buttons */}
                <div className="flex space-x-2 sm:space-x-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-xs sm:text-sm min-h-[44px]"
                  >
                    <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                    Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-shadow text-xs sm:text-sm min-h-[44px]"
                  >
                    <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Project Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 sm:mt-12 bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-primary-500/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-primary-500/20"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: "AI Projects", value: "3", icon: "🤖" },
              { label: "APIs Integrated", value: "5+", icon: "🔌" },
              { label: "Lines of Code", value: "10K+", icon: "💻" },
              { label: "User Impact", value: "40%+", icon: "🚀" }
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl mb-2">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;