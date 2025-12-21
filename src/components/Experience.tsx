import { motion } from 'framer-motion';
import { Briefcase, Calendar, Target, TrendingUp, Code } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Experience = () => {
  const { experience, education } = portfolioData;

  return (
    <section id="experience" className="py-12 sm:py-16 lg:py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center justify-center p-2 sm:p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-3 sm:mb-4">
            <Briefcase className="text-white w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Experience & Education</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-4">
            My professional journey and academic background
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 sm:space-y-8"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center">
              <Target className="mr-3 text-primary-600 w-5 h-5 sm:w-6 sm:h-6" />
              Professional Experience
            </h3>

            {experience.map((exp, index) => (
              <div
                key={index}
                className="relative bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-lg card-hover"
              >
                <div className="relative">
                  <div className="flex flex-wrap items-center justify-between mb-3 sm:mb-4">
                    <h4 className="text-lg sm:text-xl font-bold">{exp.company}</h4>
                    <div className="flex items-center text-primary-600 dark:text-primary-400">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      <span className="text-sm font-medium">{exp.period}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4 sm:mb-6">
                    <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                      {exp.role}
                    </span>
                  </div>

                  <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start">
                        <TrendingUp className="text-green-500 mr-3 mt-0.5 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies Used */}
                  <div>
                    <h5 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                      Technologies Used
                    </h5>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs flex items-center"
                        >
                          <Code className="w-3 h-3 mr-1.5" />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 sm:space-y-8"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center">
              <Target className="mr-3 text-secondary-600 w-5 h-5 sm:w-6 sm:h-6" />
              Education
            </h3>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-lg card-hover">
              <div className="mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                  <div className="mb-3 sm:mb-0">
                    <h4 className="text-xl sm:text-2xl font-bold mb-2">{education.degree}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">{education.institution}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400">
                      {education.cgpa}/10
                    </div>
                    <div className="text-sm text-gray-500">CGPA</div>
                  </div>
                </div>

                {/* Coursework */}
                <div className="mb-4 sm:mb-6">
                  <h5 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
                    Relevant Coursework
                  </h5>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {education.coursework.map((course) => (
                      <span
                        key={course}
                        className="px-2 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Engineering Strengths */}
                <div>
                  <h5 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300 flex items-center">
                    <TrendingUp className="mr-2 text-green-500 w-4 h-4 sm:w-5 sm:h-5" />
                    Engineering Strengths
                  </h5>
                  <div className="space-y-2 sm:space-y-3">
                    {[
                      "Strong debugging and backend architectural skills",
                      "API performance optimization",
                      "Clean, modular coding practices",
                      "Scalable system design",
                      "Workflow automation"
                    ].map((strength, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-500 rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3"></div>
                        <span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-lg card-hover">
              <h4 className="text-xl font-bold mb-3 sm:mb-4">Languages</h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { language: "English", level: "Fluent", levelNum: 90 },
                  { language: "Hindi", level: "Native", levelNum: 100 }
                ].map((lang) => (
                  <div key={lang.language}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-sm sm:text-base">{lang.language}</span>
                      <span className="text-primary-600 dark:text-primary-400 text-sm sm:text-base">{lang.level}</span>
                    </div>
                    <div className="h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.levelNum}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;