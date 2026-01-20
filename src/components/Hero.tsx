import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Terminal, ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Hero = () => {
  const { personal } = portfolioData;

  return (
    <section id="hero" className="min-h-screen pt-16 sm:pt-20 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center space-x-2 mb-4 sm:mb-6 justify-center lg:justify-start">
              <Terminal className="text-primary-500 w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-sm sm:text-base font-mono text-primary-600 dark:text-primary-400">
                Full Stack & AI Developer
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {personal.name.split(' ')[0]}
              </span>
            </h1>

            <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
              {personal.title}
            </h2>

            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
              {personal.tagline}
            </p>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-3 sm:space-x-4 mb-6 sm:mb-8">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="p-2.5 sm:p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="#projects"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center justify-center min-h-[44px]"
              >
                View Projects
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="#contact"
                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-primary-600 text-primary-600 dark:text-primary-400 rounded-lg font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors flex items-center justify-center min-h-[44px]"
              >
                Get In Touch
              </a>
            </div>
          </motion.div>

          {/* Right Column - Visual/AI Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mt-8 lg:mt-0"
          >
            {/* AI Visualization */}
            <div className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-mono text-xs sm:text-sm">AI Assistant Active</span>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm">
                  <div className="text-green-400">
                    $ ask_portfolio --skill="AI Integration"
                  </div>
                  <div className="text-gray-300 mt-2">
                    › OpenAI API: Beginner to Intermediate
                    <br />
                    › LangChain: Understanding of core concepts
                    <br />
                    › n8n: Beginner to Intermediate
                    <br />
                    › Projects: 4 AI-powered apps
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6">
                  {['AI', 'React', 'Node', 'API'].map((tech) => (
                    <div
                      key={tech}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 dark:bg-black/20 rounded-full border border-white/20 text-xs sm:text-sm"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
