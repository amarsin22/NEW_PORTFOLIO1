export const portfolioData = {
  personal: {
    name: "Amar Singh",
    title: "Full Stack & AI Automation Developer",
    email: "amarsmy2201@gmail.com",
    phone: "+91-9889930940",
    location: "Prayagraj, India",
    github: "https://github.com/amarsin22",
    linkedin: "https://linkedin.com/in/amarsin2201",
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
      github: "#",
      live: "#",
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
      github: "#",
      live: "#",
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
      github: "#",
      live: "#",
      aiExplanation: "Integrates OpenWeatherMap API with custom AI logic to suggest activities based on weather conditions and user mood patterns."
    }
  ],

  strengths: [
    "Strong debugging and backend architectural skills with clean, modular coding practices",
    "Experience optimizing API performance, request handling, and frontend rendering efficiency",
    "Skilled in async programming, state management, and workflow automation",
    "Ability to design scalable systems with structured API interactions"
  ]
};