import fs from 'node:fs';
import path from 'node:path';
import { db } from './index';
import { users, resumes, resumeSections } from './schema';

function loadAvatarBase64(): string {
  const imgPath = path.resolve(process.cwd(), 'images/demo-avatar.jpg');
  if (!fs.existsSync(imgPath)) {
    console.warn('Warning: images/demo-avatar.jpg not found, skipping avatar');
    return '';
  }
  const buf = fs.readFileSync(imgPath);
  return `data:image/jpeg;base64,${buf.toString('base64')}`;
}

async function seed() {
  console.log('Seeding database...');

  const avatar = loadAvatarBase64();

  // Create a demo user
  const userId = crypto.randomUUID();
  await db.insert(users).values({
    id: userId,
    name: 'Alex Chen',
    authType: 'fingerprint',
    fingerprint: 'demo-fingerprint',
  });

  // Create a sample resume
  const resumeId = crypto.randomUUID();
  await db.insert(resumes).values({
    id: resumeId,
    userId,
    title: 'Sample Resume - Alex Chen',
    template: 'modern',
    language: 'en',
  });

  // Sections with real demo content
  const sections = [
    {
      type: 'personal_info',
      title: 'Personal Information',
      sortOrder: 0,
      content: {
        fullName: 'Alex Chen',
        jobTitle: 'Senior Frontend Engineer',
        email: 'alex.chen@example.com',
        phone: '138-0013-8000',
        location: 'Chengdu, China',
        website: 'https://alexchen.dev',
        avatar,
      },
    },
    {
      type: 'summary',
      title: 'Professional Summary',
      sortOrder: 1,
      content: {
        text: 'Senior Frontend Engineer with 6 years of experience specializing in React ecosystem and modern web technologies. Led frontend architecture design and performance optimization for multiple large-scale SaaS products, reducing core page load time by 60%. Excel at transforming complex business requirements into elegant technical solutions with uncompromising focus on code quality and user experience.',
      },
    },
    {
      type: 'work_experience',
      title: 'Work Experience',
      sortOrder: 2,
      content: {
        items: [
          {
            id: crypto.randomUUID(),
            company: 'ByteDance',
            position: 'Senior Frontend Engineer',
            location: 'Chengdu',
            startDate: '2022-03',
            endDate: null,
            current: true,
            description: 'Led frontend architecture design and core feature development for Feishu document collaboration module.',
            highlights: [
              'Designed and implemented CRDT-based real-time collaborative editing engine supporting 10,000+ concurrent users',
              'Built frontend performance monitoring system, optimized LCP from 3.2s to 1.1s',
              'Designed micro-frontend architecture for component library, increasing cross-team component reuse by 40%',
            ],
          },
          {
            id: crypto.randomUUID(),
            company: 'Ant Group',
            position: 'Frontend Engineer',
            location: 'Hangzhou',
            startDate: '2019-07',
            endDate: '2022-02',
            current: false,
            description: 'Participated in development and maintenance of Alipay mini-program platform, responsible for developer toolchain construction.',
            highlights: [
              'Built plugin system for mini-program IDE from scratch, supporting 200+ third-party plugin integrations',
              'Optimized mini-program compilation process, improving build speed by 3x and significantly enhancing developer experience',
              'Led frontend unit test coverage from 30% to 85%, reducing production incidents by 50%',
            ],
          },
          {
            id: crypto.randomUUID(),
            company: 'Meituan',
            position: 'Frontend Development Intern',
            location: 'Beijing',
            startDate: '2018-06',
            endDate: '2019-06',
            current: false,
            description: 'Participated in frontend development of Meituan Food merchant-side B2B system.',
            highlights: [
              'Independently completed refactoring of order management module, replacing Class components with React Hooks',
              'Developed reusable table and form components widely adopted by the team',
            ],
          },
        ],
      },
    },
    {
      type: 'education',
      title: 'Education',
      sortOrder: 3,
      content: {
        items: [
          {
            id: crypto.randomUUID(),
            institution: 'University of Electronic Science and Technology of China',
            degree: 'Master of Science',
            field: 'Software Engineering',
            location: 'Chengdu',
            startDate: '2016-09',
            endDate: '2019-06',
            gpa: '3.8/4.0',
            highlights: ['Research Focus: Web Frontend Performance Optimization and Visualization', 'University-level Excellent Thesis Award'],
          },
          {
            id: crypto.randomUUID(),
            institution: 'Sichuan University',
            degree: 'Bachelor of Science',
            field: 'Computer Science and Technology',
            location: 'Chengdu',
            startDate: '2012-09',
            endDate: '2016-06',
            gpa: '3.6/4.0',
            highlights: [],
          },
        ],
      },
    },
    {
      type: 'skills',
      title: 'Skills & Expertise',
      sortOrder: 4,
      content: {
        categories: [
          {
            id: crypto.randomUUID(),
            name: 'Frontend Frameworks',
            skills: ['React', 'Next.js', 'Vue 3', 'TypeScript'],
          },
          {
            id: crypto.randomUUID(),
            name: 'Engineering Tools',
            skills: ['Webpack', 'Vite', 'Turborepo', 'CI/CD'],
          },
          {
            id: crypto.randomUUID(),
            name: 'Other Technologies',
            skills: ['Node.js', 'Docker', 'PostgreSQL', 'Figma'],
          },
        ],
      },
    },
    {
      type: 'projects',
      title: 'Projects',
      sortOrder: 5,
      content: {
        items: [
          {
            id: crypto.randomUUID(),
            name: 'NexoraAI Resume Assistant',
            url: 'https://github.com/example/nexoraai',
            startDate: '2024-10',
            endDate: '2025-02',
            description: 'AI-powered resume creation and optimization tool with templates, live preview, and conversational editing.',
            technologies: ['Next.js', 'React 19', 'Tailwind CSS', 'Vercel AI SDK'],
            highlights: [
              'Implemented streaming conversations and automatic resume content filling using AI SDK',
              'Designed three professional resume templates with real-time preview and PDF export',
            ],
          },
          {
            id: crypto.randomUUID(),
            name: 'Open Source Component Library AuraUI',
            url: 'https://github.com/example/auraui',
            startDate: '2023-03',
            endDate: '',
            description: 'High-quality UI component library for React ecosystem, focusing on accessibility and theme customization.',
            technologies: ['React', 'TypeScript', 'Storybook', 'Radix UI'],
            highlights: [
              'GitHub 2.5k+ Stars, npm weekly downloads 8k+',
              'Complete A11y support, compliant with WCAG 2.1 AA standards',
            ],
          },
        ],
      },
    },
  ];

  for (const section of sections) {
    await db.insert(resumeSections).values({
      id: crypto.randomUUID(),
      resumeId,
      ...section,
    } as any);
  }

  console.log('Seed complete! Demo resume created for user "Alex Chen"');
  process.exit(0);
}

seed().catch(console.error);
