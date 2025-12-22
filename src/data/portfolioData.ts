export const portfolioData = {
  personal: {
    name: "Amar Singh",
    title: "Full Stack & AI Automation Developer",
    email: "amarsmy2201@gmail.com",
    phone: "+91-9889930940",
    location: "Prayagraj, India",
    github: "https://github.com/amarsin22",
    linkedin: "https://www.linkedin.com/in/amar-singh22",
    tagline: "Building intelligent web applications with cutting-edge AI integration",
    summary: "Full Stack and AI Automation Developer skilled in React.js, Node.js, and Express.js with experience integrating AI workflows using OpenAI API, LangChain, and n8n. Strong in building scalable UIs, modular backend APIs, and performance-focused features.",
  },

  skills: {
    programming: ["Python", "Java", "JavaScript", "TypeScript"],
    frontend: ["React.js", "Tailwind CSS", "HTML5", "CSS3", "JavaScript"],
    backend: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "API Security"],
    database: ["MySQL", "MongoDB"],
    devops: ["Git", "GitHub", "Docker", "CI/CD", "Postman", "Vercel", "Render", "Netlify"],
    ai_ml: ["OpenAI API", "LangChain", "n8n", "Prompt Engineering"],
  },

  experience: [
    {
      company: "SGTech Technology Pvt Ltd, Noida",
      role: "Full Stack Developer Intern (Remote)",
      period: "2024",
      achievements: [
        "Built an AI-driven weather dashboard delivering real-time weather and air quality insights",
        "Reduced user search effort by 40% and improved session engagement",
        "Implemented responsive interface with dynamic client-server interactions"
      ],
      technologies: ["React", "Node.js", "Express.js", "Postman", "Vercel"]
    }
  ],

  education: {
    degree: "Bachelor of Technology in Computer Science",
    institution: "Shambhunath Institute of Engineering and Technology, Prayagraj",
    cgpa: "7.75",
    coursework: [
      "Object Oriented Programming",
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
      "Web Technologies",
      "Machine Learning"
    ]
  },

  projects: [
    {
      id: 1,
      title: "AI Email Responder",
      description: "AI-powered email assistant that generates context-aware reply drafts, improving response efficiency.",
      longDescription: "Developed an AI-powered email assistant that generates context-aware reply drafts, reducing manual email writing time by using OpenAI GPT-4o-mini API with Streamlit UI.",
      technologies: ["Python", "Streamlit", "OpenAI GPT-4o-mini API"],
      features: [
        "Context-aware email understanding",
        "Multiple reply tone options",
        "Privacy-focused local processing",
        "One-click reply generation"
      ],
      metrics: "Reduces email writing time by 60%",
      github: "https://github.com/amarsin22",
      live: "https://ai-email-responder1-gappfekpnjczhdc6zj6dj3p.streamlit.app/",
      aiExplanation: "Uses GPT-4o-mini for natural language understanding and generation. The system analyzes email context, tone, and intent to generate appropriate responses."
    },
    {
      id: 2,
      title: "Task Management Agent",
      description: "Chat-driven task management agent using n8n, LangChain, and Google Sheets API.",
      longDescription: "Developed a chat-driven task management agent using n8n, LangChain, and Google Sheets API, enabling natural language task creation, updates, and queries.",
      technologies: ["n8n", "LangChain", "Google Sheets API"],
      features: [
        "Natural language task commands",
        "Google Sheets integration",
        "Automated task categorization",
        "Smart reminders and updates"
      ],
      metrics: "Zero learning curve for new users",
      github: "https://github.com/amarsin22",
      live: "https://github.com/amarsin22/n8n-workflows",
      aiExplanation: "Combines LangChain for NLP with n8n workflow automation. Understands natural language commands like 'Add meeting with John tomorrow at 3pm' and updates Google Sheets automatically."
    },
    {
      id: 3,
      title: "AI Weather Mood Dashboard",
      description: "AI-powered weather dashboard with real-time updates and mood-based suggestions.",
      longDescription: "Developed an AI-powered weather dashboard with real-time updates and mood-based suggestions using React.js, Node.js, Express.js, and OpenWeatherMap API.",
      technologies: ["React.js", "TypeScript", "Node.js", "Express.js", "Tailwind CSS", "OpenWeatherMap API"],
      features: [
        "Real-time weather updates",
        "Mood-based activity suggestions",
        "Air quality monitoring",
        "7-day forecast with AI insights"
      ],
      metrics: "Reduced user search effort by 40%",
      github: "https://github.com/amarsin22",
      live: "https://ai-weather-mood-dashboard-new.vercel.app/",
      aiExplanation: "Integrates OpenWeatherMap API with custom AI logic to suggest activities based on weather conditions and user mood patterns."
    },
    {
  id: 4,
  title: "PhonePe-Style Expense Tracker",
  description: "A modern expense-tracking web app inspired by PhonePe UI to manage daily income and expenses.",
  longDescription:
    "Developed a PhonePe-style expense tracker using React and Vite that allows users to add, categorize, and monitor daily expenses with real-time balance updates and persistent storage.",
  technologies: [
    "React.js",
    "Vite",
    "JavaScript",
    "Tailwind CSS",
    "Local Storage",
    "Vercel"
  ],
  features: [
    "Add and categorize income and expenses",
    "Real-time balance and expense summary",
    "Clean PhonePe-inspired UI design",
    "Persistent data using browser local storage",
    "Fully responsive across devices"
  ],
  metrics: "Handles 100+ expense entries with instant UI updates",
  github: "https://github.com/amarsin22/phonepe-expense-tracker",
  live: "https://phonepe-expense-tracker.vercel.app",
  aiExplanation:
    "This project focuses on frontend performance and state management. While it does not use AI, it demonstrates strong UI structuring, React state handling, and real-world product-style design inspired by fintech applications."
},
{
  id: 5,
  title: "Smart Book Recommendation App",
  description: "A modern, responsive React + TypeScript web app to search for books, view details, and mark favorites with persistent storage.",
  longDescription:
    "Developed a Smart Book Recommendation App using React and TypeScript that lets users search books via the Open Library API, view details, and manage favorites with a smooth, responsive UI and persistent storage using localStorage.",
  technologies: [
    "React.js",
    "TypeScript",
    "Axios / Fetch API",
    "CSS (Flexbox, Grid, Animations)",
    "Local Storage",
    "Vercel"
  ],
  features: [
    "Book search by title or author using the Open Library API",
    "Add or remove favorite books with persistent storage",
    "Filter view between all books and favorites",
    "Responsive and interactive UI with hover effects and animations"
  ],
  metrics: "Searches and displays relevant book results efficiently with instant favorites toggle",
  github: "https://github.com/amarsin22/Smart-Book-Recommendation-App",
  live: "https://smart-book-recommendation-app.vercel.app/",
  aiExplanation:
    "This app uses the Open Library API to fetch book data dynamically. While it does not contain AI recommendation logic, it demonstrates real-world API integration, state management, and responsive frontend design."
},
{
  id: 6,
  title: "Freelance Services Website",
  description: "A modern freelance services landing website with interactive sections and an AI chatbot for user engagement.",
  longDescription:
    "Built a responsive freelance services website using React and Vite, showcasing services like resume writing, LinkedIn optimization, interview preparation, and frontend development, along with an interactive AI-style chatbot for enhanced user interaction.",
  technologies: [
    "React.js",
    "Vite",
    "Tailwind CSS",
    "Framer Motion",
    "React Hooks",
    "Git & GitHub"
  ],
  features: [
    "Responsive single-page layout with smooth anchor navigation",
    "Sections for Services, About, Pricing, Testimonials, and Contact",
    "Interactive AI chatbot with voice and text support",
    "Clean reusable React components and UI animations"
  ],
  metrics: "Improved user interaction experience with dynamic UI and chatbot",
  github: "https://github.com/amarsin22/Freelance-website",
  live: "https://freelance-website-peach.vercel.app",
  aiExplanation:
    "The project includes an interactive AI-style chatbot component that enhances user engagement by supporting both voice and text interactions, showcasing frontend innovations and user experience focus."
}
  ],

  strengths: [
    "Strong debugging and backend architectural skills with clean, modular coding practices",
    "Experience optimizing API performance, request handling, and frontend rendering efficiency",
    "Skilled in async programming, state management, and workflow automation",
    "Ability to design scalable systems with structured API interactions"
  ]
};