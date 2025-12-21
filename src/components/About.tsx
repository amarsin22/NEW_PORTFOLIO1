import { motion } from 'framer-motion';
import { User, Target, Rocket, Zap } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const About = () => {
  const { strengths } = portfolioData;

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center justify-center p-2 sm:p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-3 sm:mb-4">
            <User className="text-white w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">About Me</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-sm sm:text-base px-4">
            Passionate Full Stack Developer with a focus on AI integration and automation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1 mt-8 lg:mt-0"
          >
            <div className="bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm">
              <div className="aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <div className="text-center p-4 sm:p-6 lg:p-8">
                  <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">👨‍💻</div>
                  <div className="text-white font-bold text-lg sm:text-xl lg:text-2xl">AI + Full Stack</div>
                  <div className="text-white/80 mt-1 sm:mt-2 text-sm sm:text-base">Specialist</div>
                </div>
              </div>
              
              {/* Floating badges */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 mt-6">
                {['React', 'Node.js', 'OpenAI', 'LangChain'].map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ y: 0 }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 2,
                      delay: index * 0.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 dark:bg-black/20 rounded-full border border-white/20 backdrop-blur-sm text-xs sm:text-sm"
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 sm:space-y-6 order-1 lg:order-2"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 flex items-center">
                <Target className="mr-2 sm:mr-3 text-primary-600 w-5 h-5 sm:w-6 sm:h-6" />
                My Mission
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">
                To build intelligent, scalable web applications that leverage AI to solve real-world problems efficiently.
              </p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 flex items-center">
                <Zap className="mr-2 sm:mr-3 text-secondary-600 w-5 h-5 sm:w-6 sm:h-6" />
                What I Do
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
                I specialize in creating full-stack applications with AI integration, focusing on:
              </p>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  "AI-powered workflow automation",
                  "Scalable backend APIs with Node.js",
                  "Interactive React frontends",
                  "Database design and optimization",
                  "Production deployment and DevOps"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-500 rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 flex items-center">
                <Rocket className="mr-2 sm:mr-3 text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
                Engineering Strengths
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {strengths.map((strength, index) => (
                  <div
                    key={index}
                    className="p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg"
                  >
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{strength}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6">
              {[
                { label: "Projects", value: "3", sub: "AI-powered" },
                { label: "Experience", value: "1+", sub: "years" },
                { label: "Technologies", value: "15+", sub: "mastered" }
              ].map((stat) => (
                <div key={stat.label} className="text-center p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-600 dark:text-primary-400">
                    {stat.value}
                  </div>
                  <div className="font-medium text-sm sm:text-base">{stat.label}</div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{stat.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;