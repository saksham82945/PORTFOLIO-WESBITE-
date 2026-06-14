import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Project from './models/Project.js';
import Blog from './models/Blog.js';
import Admin from './models/Admin.js';
import Message from './models/Message.js';

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  // Clear all collections
  await Promise.all([
    Project.deleteMany(),
    Blog.deleteMany(),
    Admin.deleteMany(),
    Message.deleteMany(),
  ]);
  console.log('🗑️  Cleared all collections');

  // ── Seed Projects ────────────────────────────────────────
  await Project.insertMany([
    {
      title: 'College Management System',
      description: 'A comprehensive MERN platform digitizing institutional workflows for Admin, students, teachers, and staff. Features role-based dashboards, JWT auth, 40+ REST APIs, fee collection, and real-time statistics across 20 MongoDB collections.',
      category: 'Full Stack',
      tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS', 'JWT'],
      image: '',
      githubUrl: 'https://github.com/sakshamsinghrajput/college-management-system',
      liveUrl: 'https://college-management-system-frontend-u7s6.onrender.com/',
      featured: true,
      date: 'May 2026',
    },
    {
      title: 'Ecommerce Application',
      description: 'A full-stack e-commerce platform using MERN Stack and Tailwind CSS. Supports product browsing, cart management, order placement, payment gateway integration, and secure JWT authentication.',
      category: 'Full Stack',
      tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS', 'Payment Gateway'],
      image: '',
      githubUrl: 'https://github.com/sakshamsinghrajput/ecommerce-app',
      liveUrl: '',
      featured: true,
      date: 'Dec 2025',
    },
    {
      title: 'Space Portfolio Website',
      description: 'Personal portfolio with React + Vite, Three.js starfield, GSAP scroll animations, Framer Motion page transitions, and a full MERN backend with admin panel.',
      category: 'Frontend',
      tags: ['React', 'Three.js', 'GSAP', 'Framer Motion', 'Tailwind CSS'],
      image: '',
      githubUrl: 'https://github.com/sakshamsinghrajput/portfolio',
      liveUrl: '',
      featured: false,
      date: 'June 2026',
    },
    {
      title: 'REST API Suite',
      description: 'A scalable RESTful API architecture built with Express.js and MongoDB, featuring authentication middleware, rate limiting, and comprehensive Postman docs.',
      category: 'Backend',
      tags: ['Node.js', 'Express', 'MongoDB', 'JWT', 'REST APIs', 'Postman'],
      image: '',
      githubUrl: 'https://github.com/sakshamsinghrajput/rest-api-suite',
      liveUrl: '',
      featured: false,
      date: 'Nov 2025',
    },
    {
      title: 'DSA Visualizer',
      description: 'An interactive algorithm visualization tool built with React, featuring step-by-step animations for sorting, searching, graph traversal, and data structure operations.',
      category: 'Frontend',
      tags: ['React', 'JavaScript', 'CSS Animations', 'Data Structures'],
      image: '',
      githubUrl: 'https://github.com/sakshamsinghrajput/dsa-visualizer',
      liveUrl: '',
      featured: false,
      date: 'Sep 2025',
    },
    {
      title: 'AI Chat Interface',
      description: 'A real-time AI-powered chat interface integrated with OpenAI APIs. Features message streaming, conversation history, code highlighting, and a responsive dark UI.',
      category: 'Full Stack',
      tags: ['React', 'Node.js', 'OpenAI API', 'Express', 'WebSockets'],
      image: '',
      githubUrl: 'https://github.com/sakshamsinghrajput/ai-chat',
      liveUrl: '',
      featured: false,
      date: 'Aug 2025',
    },
  ]);
  console.log('✅ Seeded 6 projects');

  // ── Seed Blog Posts ──────────────────────────────────────
  await Blog.insertMany([
    {
      title: 'Building a Full-Stack MERN App from Scratch',
      slug: 'building-mern-app-from-scratch',
      excerpt: 'A step-by-step guide to architecting a production-ready MERN stack application — from MongoDB schema design to React deployment.',
      content: `# Building a Full-Stack MERN App from Scratch\n\nThe MERN stack (MongoDB, Express, React, Node.js) is one of the most popular choices for full-stack JavaScript development...\n\n## Setting Up MongoDB Atlas\n\nFirst, create a free cluster on MongoDB Atlas...\n\n## Building the Express Backend\n\n...\n\n## Creating the React Frontend\n\n...\n\n## Deploying to Production\n\n...`,
      category: 'MERN Stack',
      readTime: '8 min read',
      date: 'June 2026',
      coverImage: '',
      published: true,
    },
    {
      title: 'Creating a 3D StarField with Three.js in React',
      slug: 'threejs-starfield-react',
      excerpt: 'Deep dive into Three.js — how to set up a WebGL starfield with mouse parallax, nebula particles, and smooth animation loops inside React.',
      content: `# Creating a 3D StarField with Three.js in React\n\nThree.js is a powerful WebGL library that makes 3D rendering accessible in the browser...\n\n## Setting Up Three.js in React\n\n...\n\n## Creating the StarField\n\n...\n\n## Adding Mouse Parallax\n\n...\n\n## Nebula Particle Clouds\n\n...`,
      category: 'Three.js',
      readTime: '6 min read',
      date: 'May 2026',
      coverImage: '',
      published: true,
    },
    {
      title: 'How I Landed My First Internship as a BCA Student',
      slug: 'first-internship-bca-student',
      excerpt: 'My journey from zero internship experience to landing a Full Stack Developer intern role — the resources, projects, and mindset that helped me stand out.',
      content: `# How I Landed My First Internship as a BCA Student\n\nWhen I started my BCA at LNMI, I had no idea how competitive the internship market would be...\n\n## Building the Right Projects\n\n...\n\n## The Application Process\n\n...\n\n## Interview Preparation\n\n...\n\n## Final Thoughts\n\n...`,
      category: 'Career',
      readTime: '5 min read',
      date: 'April 2026',
      coverImage: '',
      published: true,
    },
  ]);
  console.log('✅ Seeded 3 blog posts');

  // ── Seed Admin ───────────────────────────────────────────
  await Admin.create({
    email: 'admin@portfolio.com',
    password: 'Admin@123',
    name: 'Saksham Kumar',
  });
  console.log('✅ Created admin: admin@portfolio.com / Admin@123');

  mongoose.disconnect();
  console.log('🎉 Seeding complete!');
};

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
