// ============================================================
//  ✏️  PERSONAL DATA CONFIG — EDIT EVERYTHING HERE
//  This is the SINGLE SOURCE OF TRUTH for the entire portfolio.
//  Update your links, projects, skills, bio etc. in this file.
// ============================================================

export const PERSONAL = {
  name: "Saksham Kumar",
  role: "Full Stack Developer",
  tagline: "MERN Stack · React · Three.js",
  location: "Patna, Bihar, India",
  phone: "+91-8294517358",
  email: "sakshamsinghrajput12345@gmail.com",
  availableForWork: true,
  resumeUrl: "/resume.pdf", // place resume.pdf inside client/public/

  // ── Social / External Links ────────────────────────────────
  links: {
    github:   "https://github.com/saksham82945",   // ✏️ YOUR GITHUB URL
    linkedin: "https://www.linkedin.com/in/saksham-kumar007/",   // ✏️ YOUR LINKEDIN URL
    twitter:  "https://twitter.com/sakshamkumar",        // ✏️ YOUR TWITTER URL (or remove)
    instagram: "",                                        // ✏️ optional
    leetcode:  "",                                        // ✏️ optional
    portfolio: "https://sakshamkumar.dev",                // ✏️ your live site URL
  },

  // ── Bio ───────────────────────────────────────────────────
  bio: [
    "Aspiring Full-Stack Developer with hands-on internship experience in JavaScript, React, and the MERN Stack. Strong analytical and problem-solving skills in Data Structures & Algorithms with a keen interest in AI-based solutions.",
    "I love crafting pixel-perfect, high-performance web experiences. From building role-based college management systems to e-commerce platforms, I'm committed to writing clean, maintainable code.",
    "Committed to delivering impactful digital experiences and always exploring new technologies — currently deep-diving into Three.js, 3D web, and AI integrations.",
  ],

  // ── Stats (About page counters) ──────────────────────────
  stats: [
    { value: 6,   suffix: "+", label: "Projects Built" },
    { value: 2,   suffix: "+", label: "Years Learning" },
    { value: 15,  suffix: "+", label: "Technologies" },
    { value: 100, suffix: "%", label: "Passion" },
  ],

  // ── Typewriter strings (Hero) ─────────────────────────────
  typewriterStrings: [
    "Building the Universe in Code",
    "MERN Stack Architect",
    "Crafting 3D Web Experiences",
    "Open to Work · Remote Friendly",
  ],
};

// ─────────────────────────────────────────────────────────────
//  SKILLS
// ─────────────────────────────────────────────────────────────
export const SKILLS = {
  frontend: [
    { name: "React.js",        percent: 90 },
    { name: "JavaScript ES6+", percent: 88 },
    { name: "HTML5 / CSS3",    percent: 90 },
    { name: "Tailwind CSS",    percent: 85 },
    { name: "Three.js",        percent: 72 },
    { name: "TypeScript",      percent: 68 },
  ],
  backend: [
    { name: "Node.js / Express", percent: 85 },
    { name: "MongoDB",           percent: 82 },
    { name: "REST APIs",         percent: 88 },
    { name: "SQL",               percent: 70 },
    { name: "JWT / Auth",        percent: 80 },
  ],
  tools: [
    { name: "Git / GitHub",  percent: 88 },
    { name: "Postman",       percent: 85 },
    { name: "Figma",         percent: 65 },
    { name: "Docker",        percent: 55 },
    { name: "Python",        percent: 65 },
    { name: "C / C++",       percent: 68 },
    { name: "Data Structures", percent: 80 },
  ],
  // Tech icon grid — shown below skill bars
  icons: [
    "React", "Node.js", "MongoDB", "Express",
    "JavaScript", "TypeScript", "HTML5", "CSS3",
    "Tailwind", "Three.js", "Git", "GitHub",
    "Python", "C++", "SQL", "REST APIs",
  ],
};

// ─────────────────────────────────────────────────────────────
//  PROJECTS
//  ✏️  Add your real GitHub and live demo links here!
// ─────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    id: 1,
    title: "College Management System",
    description:
      "A comprehensive MERN platform that digitizes and automates institutional workflows for Admin, students, teachers, and staff. Features role-based dashboards, JWT auth, 40+ REST APIs, fee collection, and real-time statistics across 20 MongoDB collections.",
    category: "Full Stack",
    tags: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS", "JWT"],
    image: "",                                              // ✏️ image URL or leave empty
    githubUrl: "https://github.com/sakshamsinghrajput/college-management-system", // ✏️ REAL GITHUB LINK
    liveUrl:   "https://college-management-system-frontend-u7s6.onrender.com/",   // ✏️ LIVE DEMO LINK (if deployed)
    featured: true,
    date: "May 2026",
  },
  {
    id: 2,
    title: "Ecommerce Application",
    description:
      "A full-stack e-commerce platform using MERN Stack and Tailwind CSS. Supports product browsing, cart management, order placement, payment gateway integration, and secure JWT authentication.",
    category: "Full Stack",
    tags: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS", "Payment Gateway"],
    image: "",                                              // ✏️ image URL or leave empty
    githubUrl: "https://github.com/sakshamsinghrajput/ecommerce-app",            // ✏️ REAL GITHUB LINK
    liveUrl:   "",                                          // ✏️ LIVE DEMO LINK (if deployed)
    featured: true,
    date: "Dec 2025",
  },
  {
    id: 3,
    title: "Space Portfolio Website",
    description:
      "This very portfolio! Built with React + Vite, Three.js starfield, GSAP scroll animations, Framer Motion page transitions, and a full MERN backend with admin panel.",
    category: "Frontend",
    tags: ["React", "Three.js", "GSAP", "Framer Motion", "Tailwind CSS"],
    image: "",
    githubUrl: "https://github.com/sakshamsinghrajput/portfolio",                // ✏️ REAL GITHUB LINK
    liveUrl:   "https://sakshamkumar.dev",                  // ✏️ LIVE DEMO LINK
    featured: false,
    date: "June 2026",
  },
  {
    id: 4,
    title: "REST API Suite",
    description:
      "A scalable RESTful API architecture built with Express.js and MongoDB, featuring authentication middleware, rate limiting, and comprehensive endpoint documentation via Postman.",
    category: "Backend",
    tags: ["Node.js", "Express", "MongoDB", "JWT", "REST APIs", "Postman"],
    image: "",
    githubUrl: "https://github.com/sakshamsinghrajput/rest-api-suite",            // ✏️ REAL GITHUB LINK
    liveUrl:   "",
    featured: false,
    date: "Nov 2025",
  },
  {
    id: 5,
    title: "DSA Visualizer",
    description:
      "An interactive algorithm visualization tool built with React, featuring step-by-step animations for sorting, searching, graph traversal, and data structure operations.",
    category: "Frontend",
    tags: ["React", "JavaScript", "CSS Animations", "Data Structures"],
    image: "",
    githubUrl: "https://github.com/sakshamsinghrajput/dsa-visualizer",            // ✏️ REAL GITHUB LINK
    liveUrl:   "",
    featured: false,
    date: "Sep 2025",
  },
  {
    id: 6,
    title: "AI Chat Interface",
    description:
      "A real-time AI-powered chat interface integrated with OpenAI APIs. Features message streaming, conversation history, code highlighting, and a responsive dark UI.",
    category: "Full Stack",
    tags: ["React", "Node.js", "OpenAI API", "Express", "WebSockets"],
    image: "",
    githubUrl: "https://github.com/sakshamsinghrajput/ai-chat",                   // ✏️ REAL GITHUB LINK
    liveUrl:   "",
    featured: false,
    date: "Aug 2025",
  },
];

// ─────────────────────────────────────────────────────────────
//  EXPERIENCE
// ─────────────────────────────────────────────────────────────
export const EXPERIENCE = [
  {
    id: 1,
    role: "Full Stack Developer Intern",
    company: "SBPDCL",
    companyFull: "South Bihar Power Distribution Co. Ltd.",
    companyUrl: "https://www.sbpdcl.co.in",                // ✏️ company website
    location: "Patna, India",
    duration: "Jan 2026 – Mar 2026",
    type: "Internship",
    description: [
      "Built and optimized responsive user interfaces using React.js, CSS3, and JavaScript, ensuring cross-browser compatibility and seamless backend integration.",
      "Collaborated with the engineering team to implement interactive features, improve UI/UX workflows, and enhance database performance, increasing overall usability.",
    ],
    logo: "",                                               // ✏️ company logo URL (optional)
  },
  {
    id: 2,
    role: "Frontend Developer Intern",
    company: "Web Technology Ltd.",
    companyFull: "Web Technology Ltd.",
    companyUrl: "",                                         // ✏️ company website
    location: "Patna, India",
    duration: "Jun 2025 – Aug 2025",
    type: "Internship",
    description: [
      "Built and optimized responsive interfaces using React.js, HTML5, CSS3, and JavaScript, ensuring pixel-perfect cross-browser rendering.",
      "Collaborated with the team to implement interactive features and improve UI/UX using AI-assisted tooling, boosting usability and performance metrics.",
    ],
    logo: "",                                               // ✏️ company logo URL (optional)
  },
];

// ─────────────────────────────────────────────────────────────
//  EDUCATION
// ─────────────────────────────────────────────────────────────
export const EDUCATION = [
  {
    id: 1,
    degree: "Bachelor in Computer Application (BCA)",
    institution: "LNMI",
    institutionFull: "Lalit Narayan Mishra Institute of Economic Development & Social Change",
    institutionUrl: "",                                     // ✏️ institution website
    location: "Patna, Bihar, India",
    duration: "Aug 2023 – May 2026",
    cgpa: "7.5",
    description: "Focused on computer science fundamentals, data structures, web development, and software engineering principles.",
  },
];

// ─────────────────────────────────────────────────────────────
//  CERTIFICATIONS & TRAINING
// ─────────────────────────────────────────────────────────────
export const CERTIFICATIONS = [
  {
    id: 1,
    title: "React & MERN Stack Development",
    issuer: "Self-Paced Training",
    issuerUrl: "",                                          // ✏️ course link
    date: "2025",
    credentialUrl: "",                                      // ✏️ certificate link
    description: "Self-paced full-stack training covering React, Node.js, Express, and MongoDB.",
  },
  {
    id: 2,
    title: "DSA & Problem Solving",
    issuer: "Self-Paced Training",
    issuerUrl: "",                                          // ✏️ course link (e.g. LeetCode, GFG)
    date: "2024",
    credentialUrl: "",                                      // ✏️ certificate link
    description: "C/C++ and JavaScript based Data Structures & Algorithms preparation.",
  },
  {
    id: 3,
    title: "BCA Program",
    issuer: "LNMI, Patna",
    issuerUrl: "",
    date: "2023 – 2026",
    credentialUrl: "",
    description: "Full Bachelor's degree in Computer Applications.",
  },
];

// ─────────────────────────────────────────────────────────────
//  ACHIEVEMENTS
// ─────────────────────────────────────────────────────────────
export const ACHIEVEMENTS = [
  {
    id: 1,
    title: "Hackathon Organizer",
    description:
      "Organized a campus-wide hackathon with 200+ student participants, managing end-to-end event coordination and technical judging.",
    icon: "🏆",
  },
  {
    id: 2,
    title: "Technical Club Leader",
    description:
      "Active participant and contributor in college technical clubs and competitive coding contests, driving peer learning.",
    icon: "🚀",
  },
];

// ─────────────────────────────────────────────────────────────
//  BLOG POSTS (seed data — update with real posts)
// ─────────────────────────────────────────────────────────────
export const BLOG_POSTS = [
  {
    title: "Building a Full-Stack MERN App from Scratch",
    slug: "building-mern-app-from-scratch",
    excerpt:
      "A step-by-step guide to architecting a production-ready MERN stack application — from MongoDB schema design to React deployment.",
    category: "MERN Stack",
    readTime: "8 min read",
    date: "June 2026",
    content: "Full article content here...",               // ✏️ add full content
    coverImage: "",                                         // ✏️ cover image URL
  },
  {
    title: "Creating a 3D StarField with Three.js in React",
    slug: "threejs-starfield-react",
    excerpt:
      "Deep dive into Three.js — how to set up a WebGL starfield with mouse parallax, nebula particles, and smooth animation loops inside React.",
    category: "Three.js",
    readTime: "6 min read",
    date: "May 2026",
    content: "Full article content here...",
    coverImage: "",
  },
  {
    title: "How I Landed My First Internship as a BCA Student",
    slug: "first-internship-bca-student",
    excerpt:
      "My journey from zero internship experience to landing a Full Stack Developer intern role — the resources, projects, and mindset that helped me stand out.",
    category: "Career",
    readTime: "5 min read",
    date: "April 2026",
    content: "Full article content here...",
    coverImage: "",
  },
];

// ─────────────────────────────────────────────────────────────
//  FLOATING TECH TAGS (Hero orbit rings)
// ─────────────────────────────────────────────────────────────
export const FLOATING_TAGS = [
  { label: "React",       color: "#61DAFB" },
  { label: "Node.js",     color: "#5DCAA5" },
  { label: "MongoDB",     color: "#4DB33D" },
  { label: "Three.js",    color: "#7F77DD" },
  { label: "GSAP",        color: "#EF9F27" },
  { label: "Express",     color: "#FFFFFF" },
  { label: "Tailwind",    color: "#38BDF8" },
  { label: "JavaScript",  color: "#F7DF1E" },
];

// ─────────────────────────────────────────────────────────────
//  NAV LINKS
// ─────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Projects",   href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Blog",       href: "#blog" },
  { label: "Contact",    href: "#contact" },
];
