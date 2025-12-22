import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Linkedin, Github, FileText, Loader2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Contact = () => {
  const { personal } = portfolioData;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Vite uses import.meta.env, not process.env
  const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if access key is configured
    if (!ACCESS_KEY) {
      setError('Form submission is not configured. Please contact the website owner.');
      console.error('Web3Forms access key is not configured in environment variables.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields');
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

    try {
      // Prepare form data with bot check
      const formPayload = {
        access_key: ACCESS_KEY,
        name: formData.name,
        email: formData.email,
        subject: formData.subject || `New Contact from ${formData.name} - Portfolio`,
        message: formData.message,
        from_name: 'Portfolio Contact Form',
        botcheck: '',
        replyto: formData.email,
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formPayload),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        if (data.message?.includes('access_key')) {
          setError('Form configuration error. Please contact the website owner.');
          console.error('Web3Forms access key error:', data.message);
        } else {
          setError(data.message || 'Something went wrong. Please try again.');
        }
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
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
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-4">
            <Send className="text-white" size={24} />
          </div>
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Interested in working together? Have a question about my projects? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow group"
                >
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg mr-4">
                    <Mail className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                    <div className="font-medium break-all">{personal.email}</div>
                  </div>
                </a>

                <a
                  href={`tel:${personal.phone.replace(/-/g, '')}`}
                  className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow group"
                >
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg mr-4">
                    <Phone className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Phone</div>
                    <div className="font-medium">{personal.phone}</div>
                  </div>
                </a>

                <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg mr-4">
                    <MapPin className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Location</div>
                    <div className="font-medium">{personal.location}</div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-semibold mb-4">Connect With Me</h4>
                <div className="flex space-x-4">
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                    title="GitHub"
                  >
                    <Github size={24} />
                  </a>
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin size={24} />
                  </a>
                  <a href="https://drive.google.com/file/d/1fk-pCbsu8UoXr5fmrUawWGnQvf6ZDn2_/view?usp=sharing">
                  <button 
                    className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                    title="Download Resume"
                  >
                    <FileText size={24} />
                  </button>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h4 className="text-xl font-bold mb-4">💡 Quick Tips</h4>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <span>I typically respond within 24 hours</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <span>Mention specific projects for faster responses</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Send a Message</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Fill out the form below and I'll get back to you as soon as possible
                  </p>
                </div>
              </div>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold mb-2">Message Sent Successfully! 🎉</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Environment variable warning */}
                  {!ACCESS_KEY && (
                    <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-lg">
                      ⚠️ Form submission is not configured. Please add your Web3Forms access key to the .env file.
                    </div>
                  )}

                  {error && (
                    <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg">
                      {error}
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter your name"
                        disabled={isSubmitting || !ACCESS_KEY}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter your email"
                        disabled={isSubmitting || !ACCESS_KEY}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject (Optional)
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Message subject"
                      disabled={isSubmitting || !ACCESS_KEY}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      placeholder="Tell me about your project or ask a question..."
                      disabled={isSubmitting || !ACCESS_KEY}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !ACCESS_KEY}
                    className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : !ACCESS_KEY ? (
                      'Form Not Configured'
                    ) : (
                      <>
                        <Send className="mr-2" size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Quick Message Templates */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-bold mb-4">💬 Quick Templates</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {quickMessages.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (!ACCESS_KEY) return;
                        setFormData({
                          ...formData,
                          message: template.message
                        });
                      }}
                      disabled={!ACCESS_KEY}
                      className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-left hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="font-medium text-sm mb-1">{template.title}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
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
