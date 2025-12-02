import type { Experience, Skill, Project, AboutContent } from '~/types'

export const experiences: Experience[] = [
    {
        startDate: 'Jul 2024',
        endDate: 'Present',
        companyName: 'Esper Solutions',
        designation: 'Software Engineer',
        roleSummary: 'Leading development of Gen AI products and customizing open-source packages for enterprise clients. Implementing AI-powered solutions that automate business workflows and enhance productivity.',
        achievements: [
            'Developed 3 Gen AI products serving 500+ active users',
            'Reduced client onboarding time by 40% through package customization',
            'Implemented RAG-based document processing system with 95% accuracy'
        ],
        technologies: ['Vue.js', 'Python', 'OpenAI', 'LangChain', 'PostgreSQL', 'TypeScript']
    },
    {
        startDate: 'May 2023',
        endDate: 'Feb 2024',
        companyName: 'CTO Gmbh',
        designation: 'Freelance Frontend Developer',
        roleSummary: 'Delivered 2 web applications and 1 hybrid mobile app for a German tech company. Focused on creating responsive, performant UIs with modern frameworks and best practices.',
        achievements: [
            'Built responsive web apps achieving 90+ Lighthouse performance scores',
            'Developed cross-platform mobile app deployed to iOS and Android',
            'Reduced bundle size by 35% through code splitting and lazy loading'
        ],
        technologies: ['Nuxt.js', 'Tailwind CSS', 'TypeScript', 'Ionic', 'Capacitor']
    },
    {
        startDate: 'Nov 2021',
        endDate: 'May 2023',
        companyName: 'Motocle',
        designation: 'Full Stack Web Developer',
        roleSummary: 'Collaborated with an international team to build and maintain full-stack applications. Led frontend development while contributing to backend API design and implementation.',
        achievements: [
            'Developed 15+ reusable Vue.js components reducing development time by 30%',
            'Designed and implemented RESTful APIs handling 10,000+ daily requests',
            'Mentored junior developers and established code review practices'
        ],
        technologies: ['Vue.js', 'Laravel', 'MySQL', 'Redis', 'Docker']
    },
    {
        startDate: '2020',
        endDate: 'Present',
        companyName: 'Fiverr Freelancer',
        designation: 'Full Stack Web Developer',
        roleSummary: 'Providing freelance development services to clients worldwide. Specializing in Vue.js applications and helping small businesses establish their digital presence.',
        achievements: [
            'Completed 50+ projects with 5-star average rating',
            'Built hybrid mobile apps for small businesses using Capacitor',
            'Achieved Level 2 seller status with 100% client satisfaction'
        ],
        technologies: ['Vue.js', 'Nuxt.js', 'Capacitor', 'Firebase', 'Tailwind CSS']
    },
    {
        startDate: 'Jul 2019',
        endDate: 'Aug 2019',
        companyName: 'Fatima Sugar Mills',
        designation: 'Database Developer Intern',
        roleSummary: 'Gained hands-on experience with enterprise database systems and reporting tools during summer internship. Worked on optimizing database queries and creating automated reports.',
        achievements: [
            'Developed automated reports using Oracle Report Builder',
            'Optimized SQL queries reducing report generation time by 50%',
            'Created documentation for database procedures and best practices'
        ],
        technologies: ['Oracle', 'SQL', 'PL/SQL', 'BI Publisher']
    }
]

export const skills: Skill[] = [
    {
        firstName: 'Frontend',
        lastName: 'Development',
        description: 'Building responsive, accessible, and performant user interfaces using Vue.js, Nuxt.js, and React. Expert in component architecture, state management with Pinia/Vuex, and creating delightful user experiences with modern CSS frameworks like Tailwind.',
        proficiencyLevel: 95
    },
    {
        firstName: 'Backend',
        lastName: 'Development',
        description: 'Designing scalable RESTful APIs and microservices using Laravel and Node.js. Experienced in database design, authentication systems, caching strategies, and optimizing application performance for high-traffic scenarios.',
        proficiencyLevel: 85
    }
]

export const projects: Project[] = [
    {
        id: 'project-1',
        title: 'AI Document Assistant',
        description: 'Enterprise-grade document processing platform powered by GPT-4 and RAG architecture. Enables users to chat with their documents and extract insights.',
        longDescription: 'Built a comprehensive document intelligence platform that allows enterprises to upload, process, and query their documents using natural language. Implemented vector embeddings for semantic search and GPT-4 for response generation.',
        technologies: ['Vue.js', 'Python', 'LangChain', 'OpenAI', 'PostgreSQL', 'pgvector'],
        imageUrl: '/img/projects/ai-assistant.png',
        liveUrl: 'https://example.com',
        featured: true,
        category: 'ai',
        completionDate: '2024'
    },
    {
        id: 'project-2',
        title: 'E-Commerce Dashboard',
        description: 'Full-stack admin dashboard for multi-vendor e-commerce platform with real-time analytics, inventory management, and order processing.',
        longDescription: 'Developed a comprehensive admin panel for managing products, orders, vendors, and customers. Includes real-time sales analytics, inventory alerts, and automated reporting features.',
        technologies: ['Nuxt.js', 'Laravel', 'MySQL', 'Redis', 'Chart.js', 'Tailwind CSS'],
        imageUrl: '/img/projects/ecommerce.png',
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/shahabgohar',
        featured: true,
        category: 'web',
        completionDate: '2023'
    },
    {
        id: 'project-3',
        title: 'Mobile Fitness Tracker',
        description: 'Cross-platform mobile app for tracking workouts, nutrition, and fitness goals. Features offline support and sync capabilities.',
        longDescription: 'Built a hybrid mobile application using Vue.js and Capacitor that works on both iOS and Android. Includes workout logging, progress tracking, and integration with health APIs.',
        technologies: ['Vue.js', 'Capacitor', 'Ionic', 'Firebase', 'TypeScript'],
        imageUrl: '/img/projects/fitness.png',
        liveUrl: 'https://example.com',
        featured: true,
        category: 'mobile',
        completionDate: '2023'
    },
    {
        id: 'project-4',
        title: 'Real-time Chat Platform',
        description: 'Scalable real-time messaging application with end-to-end encryption, file sharing, and group chat capabilities.',
        technologies: ['Vue.js', 'Node.js', 'Socket.io', 'MongoDB', 'Redis'],
        imageUrl: '/img/projects/chat.png',
        githubUrl: 'https://github.com/shahabgohar',
        featured: false,
        category: 'web',
        completionDate: '2022'
    },
    {
        id: 'project-5',
        title: 'Portfolio Website Builder',
        description: 'Drag-and-drop website builder for creating professional portfolios. Features customizable templates and one-click deployment.',
        technologies: ['Nuxt.js', 'Tailwind CSS', 'Supabase', 'Vercel'],
        imageUrl: '/img/projects/portfolio-builder.png',
        liveUrl: 'https://example.com',
        featured: false,
        category: 'web',
        completionDate: '2022'
    }
]

export const aboutContent: AboutContent = {
    headline: 'Full Stack Developer with 5+ Years of Experience',
    bio: `I am a passionate Full Stack Web Developer specializing in the Vue.js ecosystem and Laravel.
          With experience across startups and established companies in Pakistan and internationally,
          I have delivered solutions that serve thousands of users daily.

          My approach combines clean code practices with user-centric design to create applications
          that are both technically sound and delightful to use. I believe in continuous learning
          and staying updated with the latest technologies to deliver cutting-edge solutions.`,
    highlights: [
        '50+ projects delivered across various industries',
        'Expertise in Vue.js, Nuxt.js, Laravel, and modern web technologies',
        'Strong focus on performance optimization and accessibility',
        'Experience with AI/ML integration and Gen AI products',
        'Active contributor to open-source projects'
    ]
}

export const education = {
    institution: 'University of Engineering and Technology, Taxila',
    degree: 'Bachelor of Science in Software Engineering',
    period: '2017 - 2021',
    achievements: [
        'Hackathon Winner 2019 at Air University, Islamabad',
        'Member of Softdesk Society for extracurricular activities',
        'Head of Graphics - organized events and workshops'
    ]
}
