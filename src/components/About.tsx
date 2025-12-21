import { motion } from 'framer-motion';
import { User, Target, Rocket, Zap } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const About = () => {
  const { personal, strengths } = portfolioData;

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-4">
            <User className="text-white" size={24} />
          </div>
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Passionate Full Stack Developer with a focus on AI integration and automation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-2xl p-8 backdrop-blur-sm">
              <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">👨‍💻</div>
                  <div className="text-white font-bold text-2xl">AI + Full Stack</div>
                  <div className="text-white/80 mt-2">Specialist</div>
                </div>
              </div>
              
              {/* Floating badges */}
              <div className="flex justify-center space-x-4 mt-8">
                {['React', 'Node.js', 'OpenAI', 'LangChain'].map((tech, idx) => (
                  <motion.div
                    key={tech}
                    initial={{ y: 0 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 2,
                      delay: idx * 0.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="px-4 py-2 bg-white/10 dark:bg-black/20 rounded-full border border-white/20 backdrop-blur-sm"
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
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Target className="mr-3 text-primary-600" />
                My Mission
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                To build intelligent, scalable web applications that leverage AI to solve real-world problems efficiently.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Zap className="mr-3 text-secondary-600" />
                What I Do
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                I specialize in creating full-stack applications with AI integration, focusing on:
              </p>
              <ul className="space-y-3">
                {[
                  "AI-powered workflow automation",
                  "Scalable backend APIs with Node.js",
                  "Interactive React frontends",
                  "Database design and optimization",
                  "Production deployment and DevOps"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Rocket className="mr-3 text-green-600" />
                Engineering Strengths
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {strengths.map((strength, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg"
                  >
                    <div className="text-sm text-gray-600 dark:text-gray-400">{strength}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { label: "Projects", value: "3", sub: "AI-powered" },
                { label: "Experience", value: "1+", sub: "years" },
                { label: "Technologies", value: "15+", sub: "mastered" }
              ].map((stat, idx) => (
                <div key={stat.label} className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                    {stat.value}
                  </div>
                  <div className="font-medium">{stat.label}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{stat.sub}</div>
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