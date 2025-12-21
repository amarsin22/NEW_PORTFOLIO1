import { motion } from 'framer-motion';
import { Code, Database, Cpu, Cloud, Palette, Wrench } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Skills = () => {
  const { skills } = portfolioData;

  const skillCategories = [
    {
      icon: <Code className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Programming",
      skills: skills.programming,
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Palette className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Frontend",
      skills: skills.frontend,
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Backend",
      skills: skills.backend,
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Database className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Database",
      skills: skills.database,
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Cloud className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "AI/ML",
      skills: skills.ai_ml,
      color: "from-red-500 to-pink-500"
    },
    {
      icon: <Wrench className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "DevOps & Tools",
      skills: skills.devops,
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section id="skills" className="py-12 sm:py-16 lg:py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Technical Skills</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-4">
            A comprehensive set of skills that allow me to build complete, AI-powered web applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-lg card-hover"
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <div className={`p-2 sm:p-3 rounded-lg bg-gradient-to-r ${category.color} mr-3 sm:mr-4`}>
                  {category.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold">{category.title}</h3>
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                {category.skills.map((skill) => (
                  <div key={skill} className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{skill}</span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                            i < 4 ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Progress Visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 sm:mt-16 bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Skills Distribution</h3>
          <div className="space-y-4 sm:space-y-6">
            {[
              { label: "AI Integration", level: 85 },
              { label: "Full Stack Development", level: 90 },
              { label: "API Development", level: 88 },
              { label: "System Architecture", level: 80 },
              { label: "DevOps & Deployment", level: 75 }
            ].map((skill) => (
              <div key={skill.label}>
                <div className="flex justify-between mb-1 sm:mb-2">
                  <span className="font-medium text-sm sm:text-base">{skill.label}</span>
                  <span className="text-primary-600 dark:text-primary-400 text-sm sm:text-base">{skill.level}%</span>
                </div>
                <div className="h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full skill-bar"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;