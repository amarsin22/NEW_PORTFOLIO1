import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Linkedin, Github, FileText, Loader2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Contact = () => {
  const { personal } = portfolioData;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    // Message length validation
    if (formData.message.length < 10) {
      setError('Message should be at least 10 characters long');
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const quickMessages = [
    {
      title: "Job Opportunity",
      message: "Hi Amar, I came across your portfolio and I'm impressed with your AI integration projects. We have an opening for a Full Stack Developer with AI experience. Are you available for a chat?"
    },
    {
      title: "Project Collaboration",
      message: "Hello Amar, I'm working on an AI-powered SaaS product and would love to collaborate. Your experience with LangChain and OpenAI API is exactly what we need!"
    },
    {
      title: "Technical Question",
      message: "Hi Amar, I saw your AI Email Responder project and had a technical question about your implementation with Streamlit and OpenAI API. Could you share more details?"
    }
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center justify-center p-2 sm:p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-3 sm:mb-4">
            <Send className="text-white w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Get In Touch</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Interested in working together? Have a question about my projects? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div className="p-2 sm:p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg mr-3 sm:mr-4">
                    <Mail className="text-primary-600 dark:text-primary-400 w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Email</div>
                    <div className="font-medium text-sm sm:text-base truncate">{personal.email}</div>
                  </div>
                </a>

                <a
                  href={`tel:${personal.phone.replace(/-/g, '')}`}
                  className="flex items-center p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div className="p-2 sm:p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg mr-3 sm:mr-4">
                    <Phone className="text-primary-600 dark:text-primary-400 w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Phone</div>
                    <div className="font-medium text-sm sm:text-base">{personal.phone}</div>
                  </div>
                </a>

                <div className="flex items-center p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl">
                  <div className="p-2 sm:p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg mr-3 sm:mr-4">
                    <MapPin className="text-primary-600 dark:text-primary-400 w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Location</div>
                    <div className="font-medium text-sm sm:text-base">{personal.location}</div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Connect With Me</h4>
                <div className="flex space-x-3">
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 sm:p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 sm:p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <button
                    className="p-2.5 sm:p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="Download Resume"
                  >
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Contact Tips */}
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
              <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">💡 Quick Tips</h4>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mt-1 mr-2"></div>
                  <span>I typically respond within 24 hours</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mt-1 mr-2"></div>
                  <span>Mention specific projects for faster responses</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full mt-1 mr-2"></div>
                  <span>Include your timezone for scheduling calls</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form & Quick Messages */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Send a Message</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    Fill out the form below and I'll get back to you as soon as possible
                  </p>
                </div>
                <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  <span className="text-xs sm:text-sm font-medium">Response time: 24 hours</span>
                </div>
              </div>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 sm:py-8"
                >
                  <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-3 sm:mb-4" />
                  <h4 className="text-xl sm:text-2xl font-bold mb-2">Message Sent Successfully! 🎉</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
                    Thank you for reaching out. I've received your message and will get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {error && (
                    <div className="p-3 sm:p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="Enter your name"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="Enter your email"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-sm sm:text-base"
                      placeholder="Tell me about your project or ask a question..."
                      disabled={isSubmitting}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || formData.message.length < 10}
                    className="w-full flex items-center justify-center px-4 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base min-h-[44px]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Quick Message Templates */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">💬 Quick Templates</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                  {quickMessages.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setFormData({
                          ...formData,
                          message: template.message
                        });
                      }}
                      className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-left hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                    >
                      <div className="font-medium mb-1">{template.title}</div>
                      <div className="text-gray-600 dark:text-gray-400 line-clamp-2 text-xs">
                        {template.message}
                      </div>
                    </button>
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

export default Contact;