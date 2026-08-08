import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from '../config/db.js';
import Category from '../models/Category.js';
import Career from '../models/Career.js';
import User from '../models/User.js';

// Resolve environment configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const categoriesData = [
  { key: 'development', name: 'Software Development', description: 'Build scalable web, desktop, and system services.', icon: 'Code' },
  { key: 'ai-ml', name: 'Artificial Intelligence & ML', description: 'Design neural models, prompt agents, and analytics engines.', icon: 'Cpu' },
  { key: 'data-science', name: 'Data Science & Analytics', description: 'Uncover business intelligence and build pipelines.', icon: 'Database' },
  { key: 'cybersecurity', name: 'Cybersecurity & Infosec', description: 'Defend network borders, audit protocols, and patch vectors.', icon: 'Shield' },
  { key: 'devops-sre', name: 'DevOps & SRE', description: 'Automate build operations, monitor uptime, and maintain pipelines.', icon: 'Wrench' },
  { key: 'cloud-infrastructure', name: 'Cloud Infrastructure', description: 'Architect multi-cloud topologies and deploy virtual nets.', icon: 'Cloud' },
  { key: 'product-management', name: 'Product Management', description: 'Strategize roadmaps, gather requirements, and lead teams.', icon: 'Activity' },
  { key: 'design-ui-ux', name: 'Design & UX/UI', description: 'Design user journeys, wireframes, and premium layout prototypes.', icon: 'Layers' },
  { key: 'mobile-dev', name: 'Mobile App Development', description: 'Build native and cross-platform smartphone experiences.', icon: 'Smartphone' },
  { key: 'web3-blockchain', name: 'Blockchain & Web3', description: 'Deploy smart contracts, compile protocols, and audit ledgers.', icon: 'Coins' }
];

const careersData = [
  // 1. Software Development (5)
  {
    categoryKey: 'development',
    title: 'Frontend Developer',
    overview: 'Build user-facing interfaces for web applications using modern javascript frameworks.',
    responsibilities: ['Develop interactive user interfaces.', 'Optimize components for maximum speed.', 'Maintain UI design system consistency.'],
    technicalSkills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'TypeScript'],
    softSkills: ['Teamwork', 'Attention to Detail', 'Effective Communication'],
    tools: ['VS Code', 'Git', 'Webpack', 'Figma'],
    education: 'Bachelor degree in CS or equivalent coding bootcamp training.',
    salary: { median: 105000, low: 70000, high: 150000, currency: 'USD' },
    futureScope: 'High growth driven by demand for rich web interfaces and SaaS applications.',
    companies: ['Google', 'Meta', 'Amazon', 'Netflix'],
    difficulty: 'Easy',
    learningDuration: '6-9 Months',
    roadmap: [
      { step: 1, title: 'Learn Web Basics', description: 'Master HTML structure, CSS layout styling, and basic JavaScript triggers.' },
      { step: 2, title: 'Learn Modern Tooling', description: 'Understand Git version controls, package managers (npm), and build systems.' },
      { step: 3, title: 'Master a Framework', description: 'Adopt React 19, state managers, client-side routing, and Axios API calling.' }
    ],
    learningResources: [
      { name: 'MDN Web Docs', url: 'https://developer.mozilla.org', type: 'Documentation' },
      { name: 'React Documentation', url: 'https://react.dev', type: 'Documentation' }
    ],
    faqs: [
      { question: 'Do I need a computer science degree?', answer: 'No, many frontend developers are self-taught or completed bootcamps.' },
      { question: 'Which framework should I learn first?', answer: 'React is the most widely used and recommended first framework.' }
    ]
  },
  {
    categoryKey: 'development',
    title: 'Backend Developer',
    overview: 'Build server-side logic, databases, API architectures, and application engines.',
    responsibilities: ['Design and deploy RESTful/GraphQL APIs.', 'Manage database servers and data models.', 'Secure servers against vulnerabilities.'],
    technicalSkills: ['Node.js', 'Python', 'Go', 'Express', 'SQL', 'NoSQL'],
    softSkills: ['Problem Solving', 'Logical Reasoning', 'Clear Documentation'],
    tools: ['Docker', 'Postman', 'Git', 'MongoDB', 'PostgreSQL'],
    education: 'Degree in Computer Science, Software Engineering, or equivalent experience.',
    salary: { median: 115000, low: 80000, high: 165000, currency: 'USD' },
    futureScope: 'Solid growth with the expansion of API-first architectures and microservices.',
    companies: ['Amazon', 'Microsoft', 'Stripe', 'Uber'],
    difficulty: 'Medium',
    learningDuration: '9-12 Months',
    roadmap: [
      { step: 1, title: 'Learn a Backend Language', description: 'Learn JavaScript (Node.js), Python, or Go syntax.' },
      { step: 2, title: 'Understand Databases', description: 'Learn SQL schema query operations and NoSQL database setups.' },
      { step: 3, title: 'Master APIs and Security', description: 'Build REST APIs, implement JWT authentication, and secure servers.' }
    ],
    learningResources: [
      { name: 'Node.js Guide', url: 'https://nodejs.org', type: 'Documentation' },
      { name: 'MongoDB University', url: 'https://learn.mongodb.com', type: 'Course' }
    ],
    faqs: [
      { question: 'SQL vs NoSQL: which should I learn first?', answer: 'Start with SQL basics (PostgreSQL), then learn NoSQL (MongoDB).' }
    ]
  },
  {
    categoryKey: 'development',
    title: 'Fullstack Developer',
    overview: 'Implement both client-facing interfaces and backend infrastructure components.',
    responsibilities: ['Bridge frontend and backend subsystems.', 'Build reusable components and database schemas.', 'Deploy complete application instances.'],
    technicalSkills: ['React', 'Node.js', 'SQL', 'TypeScript', 'System Design'],
    softSkills: ['Project Management', 'Adaptability', 'Holistic View'],
    tools: ['Docker', 'Vercel', 'Render', 'Git', 'MongoDB'],
    education: 'Equivalent bootcamps, self-taught path, or Computer Science degree.',
    salary: { median: 120000, low: 85000, high: 175000, currency: 'USD' },
    futureScope: 'High demand, especially in startup environments where developers wear multiple hats.',
    companies: ['Vercel', 'Airbnb', 'HubSpot', 'Shopify'],
    difficulty: 'Hard',
    learningDuration: '12-18 Months',
    roadmap: [
      { step: 1, title: 'Master Frontend', description: 'Build responsive web apps using React, Tailwind CSS, and TypeScript.' },
      { step: 2, title: 'Master Backend', description: 'Build database pipelines, REST routes, and server systems.' },
      { step: 3, title: 'Integrate & Deploy', description: 'Connect MERN apps, configure environmental pipelines, and deploy.' }
    ],
    learningResources: [
      { name: 'Full Stack Open', url: 'https://fullstackopen.com/en', type: 'Course' }
    ],
    faqs: [
      { question: 'Is it hard to become a Fullstack developer?', answer: 'Yes, it requires continuous learning across both client and server disciplines.' }
    ]
  },
  {
    categoryKey: 'development',
    title: 'Software Engineer',
    overview: 'Design, write, test, and optimize desktop, embedded, or enterprise systems.',
    responsibilities: ['Write clean, performant, and verified code.', 'Architect scalable software pipelines.', 'Perform code reviews and testing.'],
    technicalSkills: ['Java', 'C++', 'Python', 'Data Structures', 'Algorithms'],
    softSkills: ['Analytical thinking', 'Problem Solving', 'Collaboration'],
    tools: ['Git', 'IntelliJ', 'CLion', 'Jira'],
    education: 'Bachelor or Master of Science in Computer Science or Computer Engineering.',
    salary: { median: 125050, low: 90000, high: 180000, currency: 'USD' },
    futureScope: 'Evergreen role supporting core infrastructure development.',
    companies: ['Intel', 'Apple', 'Nvidia', 'Oracle'],
    difficulty: 'Hard',
    learningDuration: '12-24 Months',
    roadmap: [
      { step: 1, title: 'Learn CS Fundamentals', description: 'Study algorithms, memory management, and data structures.' },
      { step: 2, title: 'Learn Object-Oriented languages', description: 'Learn Java, C++, or C# design principles.' },
      { step: 3, title: 'Understand Software Design', description: 'Study OOP design patterns and clean architectures.' }
    ],
    learningResources: [
      { name: 'GeeksforGeeks CS Guide', url: 'https://www.geeksforgeeks.org', type: 'Documentation' }
    ],
    faqs: [
      { question: 'Do I need math skills?', answer: 'Basic algebra and logical reasoning are essential for algorithms.' }
    ]
  },
  {
    categoryKey: 'development',
    title: 'QA Automation Engineer',
    overview: 'Write automation scripts to audit and verify application features.',
    responsibilities: ['Create test cases and scenarios.', 'Develop automated testing suites.', 'Collaborate on continuous integrations.'],
    technicalSkills: ['Selenium', 'Cypress', 'Playwright', 'Python', 'CI/CD'],
    softSkills: ['Detail Oriented', 'Communication', 'Persistence'],
    tools: ['Jenkins', 'GitHub Actions', 'Postman', 'Jira'],
    education: 'Technical degree, coding bootcamp, or QA training certification.',
    salary: { median: 95000, low: 65000, high: 135000, currency: 'USD' },
    futureScope: 'Growing demand as companies shift left in their testing cycles.',
    companies: ['IBM', 'Salesforce', 'Cognizant', 'Accenture'],
    difficulty: 'Easy',
    learningDuration: '4-6 Months',
    roadmap: [
      { step: 1, title: 'Learn Quality Assurance Basics', description: 'Understand manual testing cycles, bug tracking, and test plans.' },
      { step: 2, title: 'Learn Scripting & Code', description: 'Learn Python or JavaScript syntax basics.' },
      { step: 3, title: 'Master Automation Frameworks', description: 'Learn Cypress, Playwright, or Selenium automation hooks.' }
    ],
    learningResources: [
      { name: 'Playwright Docs', url: 'https://playwright.dev', type: 'Documentation' }
    ],
    faqs: [
      { question: 'Is coding required?', answer: 'Yes, modern QA Automation engineers write automated scripting tests.' }
    ]
  },

  // 2. Artificial Intelligence & ML (5)
  {
    categoryKey: 'ai-ml',
    title: 'Machine Learning Engineer',
    overview: 'Design, build, and deploy machine learning models to solve complex predictions.',
    responsibilities: ['Train and fine-tune ML models.', 'Process raw training data features.', 'Deploy models to production endpoints.'],
    technicalSkills: ['Python', 'PyTorch', 'TensorFlow', 'Linear Algebra', 'MLOps'],
    softSkills: ['Mathematical Thinking', 'Analytical Research', 'Problem Solving'],
    tools: ['Jupyter', 'Weights & Biases', 'AWS SageMaker', 'Hugging Face'],
    education: 'Bachelor or Master degree in Statistics, CS, Data Science, or Mathematics.',
    salary: { median: 145000, low: 100000, high: 210000, currency: 'USD' },
    futureScope: 'Rapid exponential growth with massive corporate AI investments.',
    companies: ['OpenAI', 'Google DeepMind', 'Anthropic', 'Tesla'],
    difficulty: 'Hard',
    learningDuration: '12-24 Months',
    roadmap: [
      { step: 1, title: 'Master Python & Math', description: 'Study calculus, linear algebra, statistics, and NumPy library.' },
      { step: 2, title: 'Study Machine Learning', description: 'Learn regression models, decision trees, and SciKit-Learn.' },
      { step: 3, title: 'Master Deep Learning', description: 'Build neural networks using PyTorch or TensorFlow.' }
    ],
    learningResources: [
      { name: 'Fast.ai Practical Deep Learning', url: 'https://www.fast.ai', type: 'Course' }
    ],
    faqs: [
      { question: 'Do I need a PhD?', answer: 'No, but strong mathematical and algorithmic training is highly valued.' }
    ]
  },
  {
    categoryKey: 'ai-ml',
    title: 'AI Research Scientist',
    overview: 'Conduct scientific investigations to advance artificial intelligence models.',
    responsibilities: ['Invent new neural model architectures.', 'Publish scientific papers.', 'Collaborate with engineering teams.'],
    technicalSkills: ['Deep Learning', 'Neural Architectures', 'Mathematics', 'Python'],
    softSkills: ['Researching', 'Scientific Writing', 'Intellectual Curiosity'],
    tools: ['PyTorch', 'Jupyter Lab', 'CUDA', 'LaTeX'],
    education: 'PhD or Master of Science in Computer Science, Machine Learning, or Physics.',
    salary: { median: 175000, low: 120000, high: 260000, currency: 'USD' },
    futureScope: 'Extremely high demand as tech leaders race for cognitive computing breakthroughs.',
    companies: ['Google DeepMind', 'Meta AI', 'OpenAI', 'Microsoft Research'],
    difficulty: 'Hard',
    learningDuration: '24-48 Months',
    roadmap: [
      { step: 1, title: 'Earn Academic Degree', description: 'Earn a relevant MS or PhD with research focus.' },
      { step: 2, title: 'Publish Research', description: 'Contribute papers to major conferences like NeurIPS or ICML.' },
      { step: 3, title: 'Build Scale Models', description: 'Implement large-scale neural network training pipelines.' }
    ],
    learningResources: [
      { name: 'Stanford CS224N (NLP)', url: 'https://web.stanford.edu/class/cs224n/', type: 'Course' }
    ],
    faqs: [
      { question: 'Is this role research-only?', answer: 'Mainly, but you must write performant code to run models.' }
    ]
  },
  {
    categoryKey: 'ai-ml',
    title: 'NLP Engineer',
    overview: 'Engineers text analysis tools, translation engines, and LLM systems.',
    responsibilities: ['Build text parsing pipelines.', 'Fine-tune large language models (LLMs).', 'Deploy semantic search pipelines.'],
    technicalSkills: ['Python', 'Transformers', 'Hugging Face', 'NLTK', 'PyTorch'],
    softSkills: ['Linguistics', 'Problem Solving', 'Data Analysis'],
    tools: ['Hugging Face', 'SpaCy', 'LangChain', 'LlamaIndex'],
    education: 'CS degree with focus on natural language processing or equivalent specialization.',
    salary: { median: 135000, low: 95000, high: 195000, currency: 'USD' },
    futureScope: 'Strong growth supporting voice assistants and conversational AI agents.',
    companies: ['Cohere', 'Grammarly', 'Apple', 'Google'],
    difficulty: 'Medium',
    learningDuration: '9-12 Months',
    roadmap: [
      { step: 1, title: 'Learn Python & Text Basics', description: 'Understand string manipulation, regex, and linguistic concepts.' },
      { step: 2, title: 'Study Classical NLP', description: 'Learn tokenization, TF-IDF, NLTK, and SpaCy libraries.' },
      { step: 3, title: 'Master LLMs & Embeddings', description: 'Work with Hugging Face transformers, fine-tune models, and use LangChain.' }
    ],
    learningResources: [
      { name: 'Hugging Face NLP Course', url: 'https://huggingface.co/learn/nlp-course', type: 'Course' }
    ],
    faqs: [
      { question: 'Should I learn NLP or Computer Vision?', answer: 'Both are great. NLP is currently seeing massive demand due to LLM adoption.' }
    ]
  },
  {
    categoryKey: 'ai-ml',
    title: 'Computer Vision Engineer',
    overview: 'Design AI engines that interpret image feeds, video data, and spatial models.',
    responsibilities: ['Train object detection models.', 'Implement real-time visual tracking.', 'Fine-tune image generators.'],
    technicalSkills: ['OpenCV', 'PyTorch', 'CNNs', 'Python', 'C++'],
    softSkills: ['Mathematical Analysis', 'Testing Rigor', 'Curiosity'],
    tools: ['OpenCV', 'TensorRT', 'Roboflow', 'YOLO'],
    education: 'Engineering degree in CS, robotics, or electrical engineering.',
    salary: { median: 140000, low: 98000, high: 200000, currency: 'USD' },
    futureScope: 'High expansion driven by robotics, autonomous vehicles, and medical image processing.',
    companies: ['Waymo', 'Tesla', 'Adobe', 'Amazon Robotics'],
    difficulty: 'Hard',
    learningDuration: '12-18 Months',
    roadmap: [
      { step: 1, title: 'Learn Image Processing', description: 'Learn matrix math, RGB layouts, and OpenCV fundamentals.' },
      { step: 2, title: 'Study Deep Learning for Images', description: 'Understand CNNs, ResNets, and segmentation models.' },
      { step: 3, title: 'Deploy Real-Time Systems', description: 'Optimize models with TensorRT and deploy onto edge devices.' }
    ],
    learningResources: [
      { name: 'PyImageSearch Guide', url: 'https://pyimagesearch.com', type: 'Documentation' }
    ],
    faqs: [
      { question: 'Is C++ needed?', answer: 'C++ is highly valued for low-latency visual systems (like self-driving).' }
    ]
  },
  {
    categoryKey: 'ai-ml',
    title: 'Prompt Engineer',
    overview: 'Optimize generative model inputs to produce reliable outputs.',
    responsibilities: ['Design prompt templates.', 'Establish model evaluation metrics.', 'Chain generative pipeline steps.'],
    technicalSkills: ['Generative AI', 'Python', 'LLM Architectures', 'API integrations'],
    softSkills: ['Logical structuring', 'Technical Writing', 'Experimentation'],
    tools: ['OpenAI Playground', 'LangChain', 'LangSmith', 'Anthropic Console'],
    education: 'Tech background preferred, or linguistic training with strong LLM exposure.',
    salary: { median: 110000, low: 75000, high: 160000, currency: 'USD' },
    futureScope: 'Emerging role that is evolving rapidly alongside LLM orchestration systems.',
    companies: ['Anthropic', 'Scale AI', 'Copy.ai', 'Jasper'],
    difficulty: 'Easy',
    learningDuration: '3-6 Months',
    roadmap: [
      { step: 1, title: 'Understand Generative Models', description: 'Learn how LLMs operate, tokens count, and context windows.' },
      { step: 2, title: 'Learn Advanced Prompts', description: 'Master few-shot prompting, chain-of-thought, and system prompts.' },
      { step: 3, title: 'Learn LLM Orchestration', description: 'Build Python scripts linking API templates via LangChain.' }
    ],
    learningResources: [
      { name: 'DeepLearning.AI Prompt Course', url: 'https://www.deeplearning.ai', type: 'Course' }
    ],
    faqs: [
      { question: 'Is programming required?', answer: 'Basic Python is necessary for modern enterprise orchestration pipelines.' }
    ]
  },

  // 3. Data Science & Analytics (5)
  {
    categoryKey: 'data-science',
    title: 'Data Scientist',
    overview: 'Analyze large-scale data assets to find trends and build predictive models.',
    responsibilities: ['Clean and wrangle massive datasets.', 'Perform statistical modeling and analysis.', 'Present findings to stakeholders.'],
    technicalSkills: ['Python', 'SQL', 'R', 'Statistics', 'Pandas', 'ML Basics'],
    softSkills: ['Data Storytelling', 'Business Acumen', 'Communication'],
    tools: ['Jupyter', 'Tableau', 'PowerBI', 'Snowflake'],
    education: 'Bachelor or Master in Data Science, Statistics, Economics, or Computer Science.',
    salary: { median: 125000, low: 85000, high: 180000, currency: 'USD' },
    futureScope: 'Strong growth as enterprises seek value in data assets.',
    companies: ['Netflix', 'Microsoft', 'LinkedIn', 'Target'],
    difficulty: 'Medium',
    learningDuration: '9-12 Months',
    roadmap: [
      { step: 1, title: 'Master SQL & Python', description: 'Write complex SQL database queries and script clean Python.' },
      { step: 2, title: 'Study Applied Statistics', description: 'Learn hypothesis testing, regression analysis, and probability.' },
      { step: 3, title: 'Learn Machine Learning basics', description: 'Train decision trees, ensemble models, and scikit-learn models.' }
    ],
    learningResources: [
      { name: 'Kaggle Learn', url: 'https://www.kaggle.com/learn', type: 'Course' }
    ],
    faqs: [
      { question: 'What is the difference between Data Analyst and Data Scientist?', answer: 'Data Scientists build predictive models; Data Analysts study historical records.' }
    ]
  },
  {
    categoryKey: 'data-science',
    title: 'Data Analyst',
    overview: 'Inspect and model historical data to build analytical business reports.',
    responsibilities: ['Write SQL reporting queries.', 'Maintain BI charts and dashboards.', 'Present metric analyses to teams.'],
    technicalSkills: ['SQL', 'Excel', 'Data Visualization', 'Statistics basics'],
    softSkills: ['Communication', 'Detail Oriented', 'Collaboration'],
    tools: ['Tableau', 'PowerBI', 'Excel', 'Google Looker'],
    education: 'Business, Economics, Finance, or CS degree, or specialized certificates.',
    salary: { median: 78000, low: 55000, high: 110000, currency: 'USD' },
    futureScope: 'High request across all business sectors needing tracking reports.',
    companies: ['Dell', 'Home Depot', 'Capital One', 'Salesforce'],
    difficulty: 'Easy',
    learningDuration: '3-6 Months',
    roadmap: [
      { step: 1, title: 'Master Excel & SQL', description: 'Learn formulas, pivots, SQL joins, aggregations, and subqueries.' },
      { step: 2, title: 'Master Visualization Tools', description: 'Build interactive dashboards in Tableau or PowerBI.' },
      { step: 3, title: 'Understand Metrics', description: 'Study cohort analysis, conversion metrics, and KPIs.' }
    ],
    learningResources: [
      { name: 'Google Data Analytics Certificate', url: 'https://grow.google/certificates/data-analytics/', type: 'Course' }
    ],
    faqs: [
      { question: 'Is this a good entry point to tech?', answer: 'Yes, it is one of the most accessible roles with high starting salaries.' }
    ]
  },
  {
    categoryKey: 'data-science',
    title: 'Data Engineer',
    overview: 'Build data pipelines, databases, and large storage warehouses.',
    responsibilities: ['Design and deploy ETL/ELT pipelines.', 'Optimize database tables and indexes.', 'Maintain data warehouse schemas.'],
    technicalSkills: ['Python', 'SQL', 'Apache Spark', 'Data Warehousing', 'Cloud platforms'],
    softSkills: ['System Architecting', 'Logical thinking', 'Collaboration'],
    tools: ['dbt', 'Airflow', 'Snowflake', 'BigQuery', 'Kafka'],
    education: 'CS, IT, or engineering degree with database-first training.',
    salary: { median: 130000, low: 90000, high: 185000, currency: 'USD' },
    futureScope: 'High growth since clean pipelines are required before AI models can operate.',
    companies: ['Amazon', 'Facebook', 'Snowflake', 'Databricks'],
    difficulty: 'Hard',
    learningDuration: '12-18 Months',
    roadmap: [
      { step: 1, title: 'Master Advanced SQL', description: 'Study window functions, indexing, optimization, and warehousing structures.' },
      { step: 2, title: 'Learn Python & Pipelines', description: 'Build ETL pipelines, parse JSON logs, and automate workflows.' },
      { step: 3, title: 'Learn Spark & Orchestration', description: 'Work with Apache Spark and schedule tasks using Airflow.' }
    ],
    learningResources: [
      { name: 'Data Engineering Zoomcamp', url: 'https://github.com/DataTalksClub/data-engineering-zoomcamp', type: 'Course' }
    ],
    faqs: [
      { question: 'Is Python or Java better?', answer: 'Python is standard for data pipelines, but Java/Scala is needed for big data.' }
    ]
  },
  {
    categoryKey: 'data-science',
    title: 'BI Developer',
    overview: 'Design enterprise database warehouses and analytical dashboards.',
    responsibilities: ['Design data modeling schemas.', 'Develop automated report metrics.', 'Manage business metadata catalogs.'],
    technicalSkills: ['SQL', 'Data Modeling', 'ETL processes', 'DAX/MDX'],
    softSkills: ['Requirement gathering', 'Structured communication', 'Presentation'],
    tools: ['PowerBI', 'SSIS/SSAS', 'Alteryx', 'Oracle BI'],
    education: 'Information Systems, Business Administration, or computer technology degree.',
    salary: { median: 98000, low: 70000, high: 140000, currency: 'USD' },
    futureScope: 'Stable demand as corporations consolidate data reporting platforms.',
    companies: ['Microsoft', 'Goldman Sachs', 'Deloitte', 'Lockheed Martin'],
    difficulty: 'Medium',
    learningDuration: '6-9 Months',
    roadmap: [
      { step: 1, title: 'Learn SQL & Schemas', description: 'Learn star schemas, snowflake schemas, and indexing models.' },
      { step: 2, title: 'Master BI Suites', description: 'Build corporate visualizations using PowerBI and study DAX formulas.' },
      { step: 3, title: 'Learn Basic ETL', description: 'Load data from CSVs or APIs using scripting tools.' }
    ],
    learningResources: [
      { name: 'Microsoft Power BI Learning Path', url: 'https://learn.microsoft.com/en-us/training/powerplatform/power-bi', type: 'Course' }
    ],
    faqs: [
      { question: 'Is this similar to a Data Analyst?', answer: 'BI Developers focus more on corporate schemas and pipelines; Analysts focus on insights.' }
    ]
  },
  {
    categoryKey: 'data-science',
    title: 'Analytics Engineer',
    overview: 'Bridge data engineering and data analyst pipelines to maintain clean datasets.',
    responsibilities: ['Write clean, tested dbt models.', 'Maintain documentation for analytical datasets.', 'Enforce data testing rules.'],
    technicalSkills: ['dbt', 'SQL', 'Git', 'Software best practices', 'Warehousing'],
    softSkills: ['Methodical planning', 'Communication', 'Technical alignment'],
    tools: ['dbt Core', 'Snowflake', 'BigQuery', 'GitHub'],
    education: 'Data analysis background with software engineering habits, or CS degree.',
    salary: { median: 115000, low: 80000, high: 160000, currency: 'USD' },
    futureScope: 'High demand as teams adopt modern data stacks like dbt and Snowflake.',
    companies: ['Figma', 'Stripe', 'GitLab', 'Spotify'],
    difficulty: 'Medium',
    learningDuration: '6-9 Months',
    roadmap: [
      { step: 1, title: 'Master SQL & Git', description: 'Learn git branching, SQL window functions, and analytics query structures.' },
      { step: 2, title: 'Learn dbt (Data Build Tool)', description: 'Build models, document schemas, and write data quality tests.' },
      { step: 3, title: 'Configure Cloud Warehouses', description: 'Optimize staging tables and clusters on Snowflake or BigQuery.' }
    ],
    learningResources: [
      { name: 'dbt Developer Tutorials', url: 'https://docs.getdbt.com/docs/introduction', type: 'Documentation' }
    ],
    faqs: [
      { question: 'What is dbt?', answer: 'dbt (Data Build Tool) is a software utility that lets analysts transform data in SQL.' }
    ]
  },

  // 4. Cybersecurity & Infosec (5)
  {
    categoryKey: 'cybersecurity',
    title: 'Security Analyst',
    overview: 'Monitor network systems to defend organizational assets against security threats.',
    responsibilities: ['Monitor SIEM warning logs.', 'Inspect potential breach alerts.', 'Enforce compliance rules.'],
    technicalSkills: ['Networking basics', 'SIEM monitoring', 'Threat hunting', 'Log analysis'],
    softSkills: ['Vigilance', 'Investigation', 'Incident Reporting'],
    tools: ['Wireshark', 'Splunk', 'Nmap', 'LogRhythm'],
    education: 'CS degree, Cybersecurity focus, or certifications like Security+.',
    salary: { median: 92000, low: 62000, high: 130000, currency: 'USD' },
    futureScope: 'High growth due to regular corporate network security incidents.',
    companies: ['CrowdStrike', 'Booz Allen', 'IBM Security', 'Cisco'],
    difficulty: 'Easy',
    learningDuration: '6-9 Months',
    roadmap: [
      { step: 1, title: 'Learn Networking Basics', description: 'Study IP routing, TCP/UDP, DNS, firewalls, and ports.' },
      { step: 2, title: 'Master Monitoring Systems', description: 'Learn Wireshark packet capture analysis and Splunk logs.' },
      { step: 3, title: 'Earn Security+ Cert', description: 'Study foundational cybersecurity modules and take the exam.' }
    ],
    learningResources: [
      { name: 'CompTIA Security+ Exam Guide', url: 'https://www.comptia.org', type: 'Documentation' }
    ],
    faqs: [
      { question: 'Can I get this role self-taught?', answer: 'Yes, certifications like Security+ are highly recognized entry pathways.' }
    ]
  },
  {
    categoryKey: 'cybersecurity',
    title: 'Penetration Tester',
    overview: 'Perform ethical hacking audits to uncover security vulnerabilities.',
    responsibilities: ['Audit corporate network borders.', 'Exploit software vulnerabilities.', 'Deliver detailed patch reports.'],
    technicalSkills: ['Ethical Hacking', 'Linux OS', 'Python scripting', 'Exploit frameworks'],
    softSkills: ['Out-of-box thinking', 'Persistence', 'Clear Reporting'],
    tools: ['Kali Linux', 'Metasploit', 'Burp Suite', 'Nmap'],
    education: 'CS degree, offensive security certifications (OSCP).',
    salary: { median: 118000, low: 80000, high: 170000, currency: 'USD' },
    futureScope: 'Strong growth as companies seek preemptive audits.',
    companies: ['Rapid7', 'Synack', 'FireEye', 'HackerOne'],
    difficulty: 'Hard',
    learningDuration: '12-18 Months',
    roadmap: [
      { step: 1, title: 'Master Linux & Python', description: 'Become comfortable using terminal controls and writing scripts.' },
      { step: 2, title: 'Learn Web Hacking', description: 'Study OWASP Top 10 vulnerabilities and exploit mechanics.' },
      { step: 3, title: 'Pass OSCP Certification', description: 'Complete oscp labs to obtain your credential.' }
    ],
    learningResources: [
      { name: 'Offensive Security OSCP', url: 'https://www.offsec.com', type: 'Course' }
    ],
    faqs: [
      { question: 'Is ethical hacking legal?', answer: 'Yes, it is done under contract to help companies secure their systems.' }
    ]
  },
  {
    categoryKey: 'cybersecurity',
    title: 'Security Engineer',
    overview: 'Design and build secure network architectures and systems.',
    responsibilities: ['Deploy system firewalls.', 'Configure JWT/identity providers.', 'Coordinate vulnerability scans.'],
    technicalSkills: ['Cryptography', 'Network security', 'IAM controls', 'Secure coding'],
    softSkills: ['System Architecting', 'Detail Oriented', 'Communication'],
    tools: ['Okta', 'Vault', 'OpenSSL', 'SonarQube'],
    education: 'Computer Science, Cybersecurity, or Engineering degree.',
    salary: { median: 125000, low: 88000, high: 180000, currency: 'USD' },
    futureScope: 'High request as security integrates deeper into development cycles.',
    companies: ['Cloudflare', 'Microsoft', 'Google', 'Palantir'],
    difficulty: 'Hard',
    learningDuration: '12-18 Months',
    roadmap: [
      { step: 1, title: 'Learn Software Engineering', description: 'Learn programming, backend servers, and network configurations.' },
      { step: 2, title: 'Study Cryptography & Access', description: 'Understand TLS, hashing, public keys, and IAM controls.' },
      { step: 3, title: 'Design Secure Systems', description: 'Build architectures that isolate microservices and protect databases.' }
    ],
    learningResources: [
      { name: 'OWASP Foundation Guide', url: 'https://owasp.org', type: 'Documentation' }
    ],
    faqs: [
      { question: 'Is this a software or IT role?', answer: 'It is a hybrid role requiring coding skills and network engineering.' }
    ]
  },
  {
    categoryKey: 'cybersecurity',
    title: 'Incident Responder',
    overview: 'Mitigate active breaches, restore operations, and investigate breach root-causes.',
    responsibilities: ['Respond to active cyberattacks.', 'Isolate breached network servers.', 'Perform digital forensics.'],
    technicalSkills: ['Digital Forensics', 'Incident response', 'Malware triage', 'OS internals'],
    softSkills: ['Stress Management', 'Crisis Leadership', 'Rapid analysis'],
    tools: ['EnCase', 'Autopsy', 'FTK Imager', 'Wireshark'],
    education: 'Computer forensics degree, cybersecurity training, or SANS certification.',
    salary: { median: 108000, low: 75000, high: 155000, currency: 'USD' },
    futureScope: 'High demand supporting cyber incident response firms.',
    companies: ['Mandiant', 'Palo Alto Networks', 'Booz Allen', 'Verizon'],
    difficulty: 'Medium',
    learningDuration: '9-12 Months',
    roadmap: [
      { step: 1, title: 'Learn Digital Investigations', description: 'Understand file systems, event logs, and memory dumps.' },
      { step: 2, title: 'Study Forensic Tools', description: 'Master imaging disks with FTK and analyzing files in Autopsy.' },
      { step: 3, title: 'Master Mitigations', description: 'Learn containment tactics, traffic filtering, and recovery setups.' }
    ],
    learningResources: [
      { name: 'SANS Digital Forensics', url: 'https://www.sans.org', type: 'Course' }
    ],
    faqs: [
      { question: 'Is this high stress?', answer: 'Yes, responders are often paged during active breaches to mitigate attacks.' }
    ]
  },
  {
    categoryKey: 'cybersecurity',
    title: 'Chief Information Security Officer (CISO)',
    overview: 'Establish security policies and lead cybersecurity operations.',
    responsibilities: ['Establish corporate security guidelines.', 'Manage risk and compliance budgets.', 'Report to executive boards.'],
    technicalSkills: ['Security frameworks', 'Risk Management', 'Regulatory compliance', 'Security auditing'],
    softSkills: ['Executive leadership', 'Risk evaluation', 'Crisis communication'],
    tools: ['Archer GRC', 'Excel', 'OneTrust', 'Jira'],
    education: 'Master degree, CS/IT degree, or extensive corporate security experience.',
    salary: { median: 210000, low: 140000, high: 320000, currency: 'USD' },
    futureScope: 'Strong growth as regulations require dedicated cybersecurity officers.',
    companies: ['JPMorgan Chase', 'UnitedHealth Group', 'General Electric', 'Nike'],
    difficulty: 'Hard',
    learningDuration: '36-60 Months',
    roadmap: [
      { step: 1, title: 'Gain Field Experience', description: 'Work in analyst, engineering, or security architect roles.' },
      { step: 2, title: 'Obtain CISSP Credential', description: 'Pass the CISSP certification exam.' },
      { step: 3, title: 'Learn Management & Law', description: 'Study corporate risk management, IT compliance, and budgets.' }
    ],
    learningResources: [
      { name: 'CISSP Official Study Guide', url: 'https://www.isc2.org', type: 'Documentation' }
    ],
    faqs: [
      { question: 'Is this an entry-level role?', answer: 'No, this is an executive leadership position requiring years of experience.' }
    ]
  },

  // 5. DevOps & SRE (5)
  {
    categoryKey: 'devops-sre',
    title: 'DevOps Engineer',
    overview: 'Optimize deployment pipelines, automate builds, and orchestrate environments.',
    responsibilities: ['Configure CI/CD release pipelines.', 'Write infrastructure-as-code scripts.', 'Maintain server configurations.'],
    technicalSkills: ['CI/CD pipelines', 'Docker', 'Kubernetes', 'Linux', 'AWS', 'Terraform'],
    softSkills: ['Collaboration', 'Process Optimization', 'Problem Solving'],
    tools: ['GitHub Actions', 'Jenkins', 'Terraform', 'Kubernetes', 'Ansible'],
    education: 'CS degree or engineering credentials, or backend developer transition path.',
    salary: { median: 130000, low: 92000, high: 185000, currency: 'USD' },
    futureScope: 'High request as companies migrate to automated cloud systems.',
    companies: ['HashiCorp', 'Red Hat', 'AWS', 'GitHub'],
    difficulty: 'Hard',
    learningDuration: '12-18 Months',
    roadmap: [
      { step: 1, title: 'Learn Systems & Scripting', description: 'Master bash scripting, Linux command controls, and networking.' },
      { step: 2, title: 'Learn Containerization', description: 'Build and deploy applications in Docker containers.' },
      { step: 3, title: 'Master CI/CD & IaC', description: 'Write pipelines in GitHub Actions and provision clouds using Terraform.' }
    ],
    learningResources: [
      { name: 'DevOps Roadmap Guide', url: 'https://roadmap.sh/devops', type: 'Documentation' }
    ],
    faqs: [
      { question: 'Is coding needed?', answer: 'Yes, DevOps engineers write automation scripts in Python, Bash, or Go.' }
    ]
  },
  {
    categoryKey: 'devops-sre',
    title: 'Site Reliability Engineer (SRE)',
    overview: 'Apply software engineering practices to database and system reliability.',
    responsibilities: ['Monitor system SLOs/SLAs.', 'Mitigate production server crashes.', 'Automate operational recovery.'],
    technicalSkills: ['System metrics', 'Go/Python scripting', 'Linux Kernel', 'Chaos Engineering'],
    softSkills: ['Under-pressure thinking', 'Logical analysis', 'Patience'],
    tools: ['Prometheus', 'Grafana', 'Datadog', 'Kubernetes'],
    education: 'Computer Science, Systems Engineering degree, or experience in systems operations.',
    salary: { median: 142000, low: 102000, high: 200000, currency: 'USD' },
    futureScope: 'High request driven by the need to maintain uptime for global scale services.',
    companies: ['Google', 'Meta', 'Amazon', 'Cloudflare'],
    difficulty: 'Hard',
    learningDuration: '12-24 Months',
    roadmap: [
      { step: 1, title: 'Study Systems Programming', description: 'Study Unix architecture, CPU registers, memory leaks, and scripting.' },
      { step: 2, title: 'Master Monitoring Systems', description: 'Set up logging metrics using Prometheus and dashboards in Grafana.' },
      { step: 3, title: 'Study Chaos Engineering', description: 'Design automated recovery scripts that maintain availability.' }
    ],
    learningResources: [
      { name: 'Google SRE Book', url: 'https://sre.google/sre-book/table-of-contents/', type: 'Book' }
    ],
    faqs: [
      { question: 'SRE vs DevOps: what is the difference?', answer: 'DevOps focuses on development pipelines; SRE focuses on production reliability.' }
    ]
  },
  {
    categoryKey: 'devops-sre',
    title: 'Platform Engineer',
    overview: 'Design internal developer portals to simplify product team deployment steps.',
    responsibilities: ['Build internal infrastructure systems.', 'Standardize developer toolchains.', 'Automate environment setups.'],
    technicalSkills: ['Cloud architecture', 'Infrastructure as Code', 'CLI development', 'API Gateway design'],
    softSkills: ['Developer empathy', 'System Architecting', 'Communication'],
    tools: ['Backstage', 'Terraform', 'AWS', 'Kubernetes', 'Helm'],
    education: 'CS degree or DevOps engineering experience.',
    salary: { median: 138000, low: 96000, high: 190000, currency: 'USD' },
    futureScope: 'Growing rapid adoption as corporations build developer platform portals.',
    companies: ['Spotify', 'Twilio', 'GitLab', 'Snyk'],
    difficulty: 'Hard',
    learningDuration: '12-18 Months',
    roadmap: [
      { step: 1, title: 'Master Kubernetes', description: 'Deploy, scale, and manage complex container clusters.' },
      { step: 2, title: 'Build CLI Tools', description: 'Create terminal commands in Go or Python to automate deployment steps.' },
      { step: 3, title: 'Build Developer Portals', description: 'Configure unified portals using frameworks like Spotify Backstage.' }
    ],
    learningResources: [
      { name: 'Platform Engineering Community', url: 'https://platformengineering.org', type: 'Documentation' }
    ],
    faqs: [
      { question: 'What is platform engineering?', answer: 'It is a practice focused on building internal developer tools to improve developer experience.' }
    ]
  },
  {
    categoryKey: 'devops-sre',
    title: 'Release Engineer',
    overview: 'Manage application compiling, testing, and production deployment cycles.',
    responsibilities: ['Manage Git branch integration workflows.', 'Audit packaging builds.', 'Coordinate software deployments.'],
    technicalSkills: ['Git', 'Maven/Gradle', 'Linux', 'Scripting', 'Artifact management'],
    softSkills: ['Attention to detail', 'Coordination', 'Communication'],
    tools: ['GitHub', 'Jfrog Artifactory', 'Gradle', 'Jenkins'],
    education: 'Degree in software, CS, or IT configuration systems.',
    salary: { median: 110000, low: 78000, high: 155000, currency: 'USD' },
    futureScope: 'Stable demand supporting large-scale enterprise release cycles.',
    companies: ['Apple', 'Microsoft', 'Salesforce', 'Intel'],
    difficulty: 'Medium',
    learningDuration: '6-9 Months',
    roadmap: [
      { step: 1, title: 'Master Git Workflows', description: 'Learn branching strategies, cherry-picking, rebasing, and merge conflicts.' },
      { step: 2, title: 'Learn Packaging Utilities', description: 'Build dependencies pipelines using Gradle, Maven, or Webpack.' },
      { step: 3, title: 'Manage Artifact Warehouses', description: 'Publish packages and container images to Artifactory or Docker Hub.' }
    ],
    learningResources: [
      { name: 'Git branching game', url: 'https://learngitbranching.js.org', type: 'Course' }
    ],
    faqs: [
      { question: 'Is this distinct from DevOps?', answer: 'Yes, Release Engineers focus specifically on Git integration and packaging.' }
    ]
  },
  {
    categoryKey: 'devops-sre',
    title: 'Build Engineer',
    overview: 'Optimize compile pipelines and configure compiler settings for large projects.',
    responsibilities: ['Speed up compile pipelines.', 'Audit dependency vulnerabilities.', 'Configure build setups.'],
    technicalSkills: ['Make/CMake', 'Gradle', 'Bazel', 'Compiler optimizations', 'C++/Java'],
    softSkills: ['Methodical debugging', 'Problem Solving', 'Detail Focused'],
    tools: ['Bazel', 'CMake', 'Jenkins', 'Docker'],
    education: 'CS degree or engineering background with deep understanding of compiling mechanics.',
    salary: { median: 118000, low: 85000, high: 165000, currency: 'USD' },
    futureScope: 'High request in gaming, automotive, and large enterprise applications.',
    companies: ['Epic Games', 'Nvidia', 'BMW Group', 'Google'],
    difficulty: 'Hard',
    learningDuration: '9-12 Months',
    roadmap: [
      { step: 1, title: 'Study Compiler Mechanics', description: 'Understand linkers, compiler flags, and static analysis.' },
      { step: 2, title: 'Learn Advanced Build Tools', description: 'Master monorepo compilation build systems like Google Bazel.' },
      { step: 3, title: 'Optimize Build Pipelines', description: 'Implement compiler caching, task parallelization, and parallel testing.' }
    ],
    learningResources: [
      { name: 'Bazel Documentation', url: 'https://bazel.build', type: 'Documentation' }
    ],
    faqs: [
      { question: 'Is this needed for small web apps?', answer: 'No, this is typically needed for large monorepos (like Google or game engines).' }
    ]
  },

  // 6. Cloud Infrastructure (5)
  {
    categoryKey: 'cloud-infrastructure',
    title: 'Cloud Architect',
    overview: 'Design multi-cloud network topologies, compute clusters, and database layouts.',
    responsibilities: ['Design cloud migration plans.', 'Audit infrastructure costs.', 'Design high-availability models.'],
    technicalSkills: ['AWS', 'Azure', 'Networking', 'Terraform', 'System Design'],
    softSkills: ['System Architecting', 'Negotiation', 'Communication'],
    tools: ['CloudFormation', 'Terraform', 'AWS Console', 'Lucidchart'],
    education: 'Bachelor degree in CS/Engineering and professional cloud certifications.',
    salary: { median: 155000, low: 110000, high: 220000, currency: 'USD' },
    futureScope: 'High demand as enterprise databases migrate to cloud-native platforms.',
    companies: ['Amazon Web Services', 'Microsoft Azure', 'Google Cloud', 'Accenture'],
    difficulty: 'Hard',
    learningDuration: '12-24 Months',
    roadmap: [
      { step: 1, title: 'Learn Networking & SysAdmin', description: 'Understand subnets, VPN gateways, DNS configurations, and Linux administration.' },
      { step: 2, title: 'Master Cloud Platforms', description: 'Learn AWS EC2, S3, RDS, IAM, and VPC configs.' },
      { step: 3, title: 'Earn Professional Architect Cert', description: 'Pass AWS Solutions Architect Professional exam.' }
    ],
    learningResources: [
      { name: 'AWS Skill Builder', url: 'https://skillbuilder.aws', type: 'Course' }
    ],
    faqs: [
      { question: 'Is coding needed?', answer: 'Yes, Cloud Architects write Infrastructure-as-Code configurations (like Terraform).' }
    ]
  },
  {
    categoryKey: 'cloud-infrastructure',
    title: 'Cloud Engineer',
    overview: 'Deploy and maintain compute nodes and load balancers on cloud platforms.',
    responsibilities: ['Configure cloud servers.', 'Deploy cloud-native security groups.', 'Monitor service resource utilization.'],
    technicalSkills: ['AWS/Azure', 'Linux', 'Docker', 'IaC basics', 'IP Networking'],
    softSkills: ['Problem Solving', 'Communication', 'Attention to detail'],
    tools: ['AWS CLI', 'Terraform', 'Docker', 'Bash'],
    education: 'CS degree or cloud training certifications (e.g., AWS Associate).',
    salary: { median: 115000, low: 80000, high: 160000, currency: 'USD' },
    futureScope: 'Strong growth as companies look for engineers to manage cloud resources.',
    companies: ['Oracle Cloud', 'DigitalOcean', 'IBM Cloud', 'General Motors'],
    difficulty: 'Medium',
    learningDuration: '9-12 Months',
    roadmap: [
      { step: 1, title: 'Learn Linux & Networks', description: 'Understand basic IP configurations, subnets, and terminal navigation.' },
      { step: 2, title: 'Learn AWS Essentials', description: 'Learn AWS EC2 instances, S3 storage buckets, and IAM roles.' },
      { step: 3, title: 'Understand Infrastructure as Code', description: 'Learn to deploy infrastructure configurations using Terraform.' }
    ],
    learningResources: [
      { name: 'AWS Associate Learning Path', url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/', type: 'Course' }
    ],
    faqs: [
      { question: 'Which cloud provider should I learn first?', answer: 'AWS holds the largest market share and is recommended first.' }
    ]
  },
  {
    categoryKey: 'cloud-infrastructure',
    title: 'Cloud Security Engineer',
    overview: 'Configure security groups, encryption keys, and identity access rules on cloud systems.',
    responsibilities: ['Configure cloud IAM rules.', 'Manage database encryption keys.', 'Monitor cloud networks for threats.'],
    technicalSkills: ['Cloud IAM', 'KMS encryption', 'VPC network security', 'Compliance frameworks'],
    softSkills: ['Auditing focus', 'Detail Oriented', 'Communication'],
    tools: ['AWS IAM', 'HashiCorp Vault', 'CloudTrail', 'Checkov'],
    education: 'Cybersecurity or CS degree with cloud-first specialization.',
    salary: { median: 135000, low: 95000, high: 190000, currency: 'USD' },
    futureScope: 'High request driven by the need to prevent cloud database leaks.',
    companies: ['Palo Alto Networks', 'Capital One', 'AWS Security', 'Accenture'],
    difficulty: 'Hard',
    learningDuration: '12-18 Months',
    roadmap: [
      { step: 1, title: 'Understand Cloud Foundations', description: 'Study AWS basic storage and compute node access setups.' },
      { step: 2, title: 'Master IAM Policy Logic', description: 'Learn the principle of least privilege, JSON policies, and cross-account access rules.' },
      { step: 3, title: 'Implement Encryption & Audits', description: 'Manage encryption keys in KMS and track audit logs in CloudTrail.' }
    ],
    learningResources: [
      { name: 'AWS Certified Security Study Path', url: 'https://aws.amazon.com/certification/certified-security-specialty/', type: 'Course' }
    ],
    faqs: [
      { question: 'Is this similar to regular security?', answer: 'Yes, but it focuses on cloud-specific APIs, identity access policies, and virtual networks.' }
    ]
  },
  {
    categoryKey: 'cloud-infrastructure',
    title: 'Solutions Architect',
    overview: 'Design cloud integrations and present migration systems to enterprise clients.',
    responsibilities: ['Assess client database requirements.', 'Design cloud solution blueprints.', 'Estimate migration budgets.'],
    technicalSkills: ['Cloud architectures', 'System Design', 'Enterprise Software', 'Cost optimization'],
    softSkills: ['Presentation', 'Technical sales', 'Client consulting'],
    tools: ['AWS Pricing Calculator', 'Draw.io', 'PowerPoint'],
    education: 'Business IT or CS degree, or cloud consulting experience.',
    salary: { median: 140000, low: 100000, high: 195000, currency: 'USD' },
    futureScope: 'Consistent demand as businesses seek cloud consultants to design migrations.',
    companies: ['Microsoft Solutions', 'Google Cloud Consulting', 'Red Hat', 'Deloitte'],
    difficulty: 'Medium',
    learningDuration: '12-18 Months',
    roadmap: [
      { step: 1, title: 'Master Cloud Platforms', description: 'Study database migrations, load balancers, and subnet ranges.' },
      { step: 2, title: 'Understand Pricing Models', description: 'Learn to design cost-effective cloud architectures.' },
      { step: 3, title: 'Develop Presentation Skills', description: 'Learn to present complex technical designs to business executives.' }
    ],
    learningResources: [
      { name: 'AWS Architecture Center', url: 'https://aws.amazon.com/architecture/', type: 'Documentation' }
    ],
    faqs: [
      { question: 'Is this client facing?', answer: 'Yes, Solutions Architects spend time consulting directly with clients.' }
    ]
  },
  {
    categoryKey: 'cloud-infrastructure',
    title: 'Cloud Consultant',
    overview: 'Audit business database pipelines and help plan transition paths to cloud networks.',
    responsibilities: ['Audit local legacy servers.', 'Recommend SaaS/PaaS alternatives.', 'Provide staff training guides.'],
    technicalSkills: ['Hybrid cloud', 'Migrating models', 'Project management', 'System audits'],
    softSkills: ['Staff training', 'Communication', 'Clear reporting'],
    tools: ['AWS Migration Evaluator', 'Confluence', 'Visio'],
    education: 'Technical consulting background or IT systems management degree.',
    salary: { median: 108000, low: 75000, high: 150000, currency: 'USD' },
    futureScope: 'Stable demand driven by digital transformation initiatives.',
    companies: ['PwC', 'EY', 'Capgemini', 'Cognizant'],
    difficulty: 'Medium',
    learningDuration: '6-12 Months',
    roadmap: [
      { step: 1, title: 'Learn Systems Management', description: 'Understand basic database models, networks, and email servers.' },
      { step: 2, title: 'Understand Cloud Migrations', description: 'Study database lift-and-shift methods vs refactoring.' },
      { step: 3, title: 'Practice Project Management', description: 'Learn to lead project timelines and coordinate migrations.' }
    ],
    learningResources: [
      { name: 'Google Cloud Training Paths', url: 'https://cloud.google.com/training', type: 'Course' }
    ],
    faqs: [
      { question: 'Do I need to be a senior developer?', answer: 'No, but you must understand system architectures to advise clients.' }
    ]
  },

  // 7. Product Management (5)
  {
    categoryKey: 'product-management',
    title: 'Technical Product Manager',
    overview: 'Bridge engineering and product design teams to lead product technical cycles.',
    responsibilities: ['Translate technical requirements.', 'Prioritize database tasks.', 'Collaborate with engineering leads.'],
    technicalSkills: ['System Design basics', 'Agile methodologies', 'Data Analytics', 'API design concepts'],
    softSkills: ['Technical Alignment', 'Stakeholder Management', 'Roadmapping'],
    tools: ['Jira', 'Confluence', 'Amplitude', 'Figma'],
    education: 'CS degree background, or software developer transitioning to business roles.',
    salary: { median: 148000, low: 105000, high: 200000, currency: 'USD' },
    futureScope: 'High growth as software products require deeper technical coordination.',
    companies: ['Stripe', 'Atlassian', 'Uber', 'Datadog'],
    difficulty: 'Medium',
    learningDuration: '12-18 Months',
    roadmap: [
      { step: 1, title: 'Gain Software Context', description: 'Study system architectures, APIs, and cloud hosting.' },
      { step: 2, title: 'Master Agile Frameworks', description: 'Learn scrum processes, backlog grooming, and user story mapping.' },
      { step: 3, title: 'Learn Data Analytics', description: 'Measure user events using tools like Amplitude.' }
    ],
    learningResources: [
      { name: 'Product School Guides', url: 'https://productschool.com', type: 'Course' }
    ],
    faqs: [
      { question: 'Do I need to code?', answer: 'No, but you must be able to discuss API architectures with software leads.' }
    ]
  },
  {
    categoryKey: 'product-management',
    title: 'Product Manager',
    overview: 'Lead the strategy, roadmap, and feature definitions of software products.',
    responsibilities: ['Define feature requirements.', 'Perform market analysis.', 'Coordinate software launch timelines.'],
    technicalSkills: ['Market Analysis', 'Agile methodologies', 'Product Roadmapping', 'UX fundamentals'],
    softSkills: ['Leadership', 'Strategic thinking', 'Communication'],
    tools: ['Productboard', 'Miro', 'Jira', 'Google Analytics'],
    education: 'Business, CS, or communications degree, or MBA credentials.',
    salary: { median: 120000, low: 85000, high: 165000, currency: 'USD' },
    futureScope: 'Strong demand as businesses focus on product-led growth.',
    companies: ['Slack', 'HubSpot', 'Salesforce', 'LinkedIn'],
    difficulty: 'Easy',
    learningDuration: '6-12 Months',
    roadmap: [
      { step: 1, title: 'Study Product Cycles', description: 'Understand idea validation, user research, wireframes, and launch cycles.' },
      { step: 2, title: 'Master Backlog Prioritization', description: 'Learn to use frameworks like RICE or MoSCoW.' },
      { step: 3, title: 'Learn Launch Strategies', description: 'Coordinate with marketing and sales to launch software.' }
    ],
    learningResources: [
      { name: 'Mind the Product Blog', url: 'https://www.mindtheproduct.com', type: 'Documentation' }
    ],
    faqs: [
      { question: 'Is a technical background required?', answer: 'Not strictly, but it is helpful for software products.' }
    ]
  },
  {
    categoryKey: 'product-management',
    title: 'Product Owner',
    overview: 'Manage the development backlog and prioritize engineering sprints.',
    responsibilities: ['Write user stories.', 'Prioritize developer backlogs.', 'Review sprint deliverables.'],
    technicalSkills: ['Scrum frameworks', 'Requirement gathering', 'User Story writing', 'QA testing basics'],
    softSkills: ['Prioritization', 'Clear communication', 'Conflict resolution'],
    tools: ['Jira Software', 'Trello', 'Confluence', 'Azure DevOps'],
    education: 'Scrum certifications (CSPO) and related project management training.',
    salary: { median: 105000, low: 75000, high: 145000, currency: 'USD' },
    futureScope: 'Stable demand supporting Agile engineering organizations.',
    companies: ['Nike', 'Target', 'Siemens', 'Bose'],
    difficulty: 'Easy',
    learningDuration: '3-6 Months',
    roadmap: [
      { step: 1, title: 'Learn Scrum Foundations', description: 'Understand agile values, standups, retro logs, and planning cycles.' },
      { step: 2, title: 'Earn CSPO Certification', description: 'Complete a Certified Scrum Product Owner course.' },
      { step: 3, title: 'Master Backlog Management', description: 'Learn to prioritize engineering tasks in Jira.' }
    ],
    learningResources: [
      { name: 'Scrum Alliance Guide', url: 'https://www.scrumalliance.org', type: 'Documentation' }
    ],
    faqs: [
      { question: 'What is the difference between PM and Product Owner?', answer: 'PMs focus on long-term strategy; Product Owners focus on short-term developer task planning.' }
    ]
  },
  {
    categoryKey: 'product-management',
    title: 'Growth Product Manager',
    overview: 'Optimize user acquisition, conversion rates, and retention loops.',
    responsibilities: ['Design A/B testing scenarios.', 'Analyze user activation funnels.', 'Optimize onboarding flows.'],
    technicalSkills: ['A/B Testing', 'Growth hacking', 'Data analytics', 'UX optimization'],
    softSkills: ['Data-driven thinking', 'Rapid iteration', 'Creativity'],
    tools: ['Amplitude', 'Optimizely', 'Mixpanel', 'Hotjar'],
    education: 'Marketing analytics, finance, or CS background.',
    salary: { median: 130000, low: 90000, high: 180000, currency: 'USD' },
    futureScope: 'Growing demand as SaaS firms focus on self-serve user growth.',
    companies: ['Dropbox', 'Duolingo', 'Canva', 'Zoom'],
    difficulty: 'Medium',
    learningDuration: '6-9 Months',
    roadmap: [
      { step: 1, title: 'Study Analytics Systems', description: 'Learn to track user event actions in Mixpanel.' },
      { step: 2, title: 'Learn A/B Testing Math', description: 'Study statistical significance and sample sizing.' },
      { step: 3, title: 'Optimize Growth Funnels', description: 'Improve onboarding flows to drive user activation.' }
    ],
    learningResources: [
      { name: 'Reforge Growth Course', url: 'https://www.reforge.com', type: 'Course' }
    ],
    faqs: [
      { question: 'Is this role marketing focused?', answer: 'It is a hybrid of marketing, UX design, and data analytics.' }
    ]
  },
  {
    categoryKey: 'product-management',
    title: 'Associate Product Manager',
    overview: 'Entry-level product role supporting requirements gathering and backlog triage.',
    responsibilities: ['Gather feature request details.', 'Perform competitive research.', 'Support engineering sprint planning.'],
    technicalSkills: ['Agile basics', 'User Research', 'Product design concepts', 'Excel/Data analysis'],
    softSkills: ['Eagerness to learn', 'Active listening', 'Clear writing'],
    tools: ['Jira', 'Miro', 'Google Sheets', 'Slack'],
    education: 'University graduate program, or coding bootcamp transition training.',
    salary: { median: 85000, low: 60000, high: 115000, currency: 'USD' },
    futureScope: 'Great career path leading to senior PM leadership.',
    companies: ['Google (APM Program)', 'Facebook (RPM Program)', 'Salesforce', 'Yahoo'],
    difficulty: 'Easy',
    learningDuration: '3-6 Months',
    roadmap: [
      { step: 1, title: 'Understand PM Roles', description: 'Study product lifecycle fundamentals and user research methods.' },
      { step: 2, title: 'Practice Wireframing', description: 'Create basic design prototypes using Figma or Balsamiq.' },
      { step: 3, title: 'Apply for APM Programs', description: 'Target structured new-grad APM programs.' }
    ],
    learningResources: [
      { name: 'APM Association Guide', url: 'https://www.apmlist.com', type: 'Documentation' }
    ],
    faqs: [
      { question: 'Do APM programs take non-CS grads?', answer: 'Yes, many programs accept business, design, and humanities majors.' }
    ]
  },

  // 8. Design & UX/UI (5)
  {
    categoryKey: 'design-ui-ux',
    title: 'UX Designer',
    overview: 'Design intuitive workflows, wireframes, and prototypes for applications.',
    responsibilities: ['Create user wireframes and journey maps.', 'Design interactive prototypes.', 'Perform user testing sessions.'],
    technicalSkills: ['Wireframing', 'User journeys', 'Information architecture', 'Prototyping'],
    softSkills: ['Empathy', 'Creative problem solving', 'Communication'],
    tools: ['Figma', 'Sketch', 'InVision', 'Miro'],
    education: 'Graphic Design, Human-Computer Interaction (HCI) degree, or bootcamp.',
    salary: { median: 102000, low: 68000, high: 145000, currency: 'USD' },
    futureScope: 'High request driven by customer-first product design expectations.',
    companies: ['Adobe', 'Airbnb', 'Pinterest', 'Apple'],
    difficulty: 'Easy',
    learningDuration: '6-9 Months',
    roadmap: [
      { step: 1, title: 'Study Design Principles', description: 'Learn color theory, layout grids, spacing, and typography.' },
      { step: 2, title: 'Master Prototyping Tools', description: 'Learn components, auto-layout, and interactive states in Figma.' },
      { step: 3, title: 'Conduct User Research', description: 'Conduct usability tests and iterate designs based on feedback.' }
    ],
    learningResources: [
      { name: 'Interaction Design Foundation', url: 'https://www.interaction-design.org', type: 'Course' }
    ],
    faqs: [
      { question: 'Do I need to code?', answer: 'No, but understanding HTML/CSS makes communicating with developers much easier.' }
    ]
  },
  {
    categoryKey: 'design-ui-ux',
    title: 'UI Designer',
    overview: 'Design visual screens, layouts, and brand systems for applications.',
    responsibilities: ['Create high-fidelity screen designs.', 'Design interface icons and assets.', 'Maintain UI component systems.'],
    technicalSkills: ['Visual design', 'Typography', 'Color schemes', 'Design systems'],
    softSkills: ['Aesthetic sense', 'Detail focused', 'Adaptability'],
    tools: ['Figma', 'Illustrator', 'Photoshop', 'Zeplin'],
    education: 'Visual Arts, Graphic Design, or equivalent portfolio training.',
    salary: { median: 95000, low: 60000, high: 135000, currency: 'USD' },
    futureScope: 'Stable demand as products require polished, modern visual designs.',
    companies: ['Nike', 'Figma', 'Spotify', 'Medium'],
    difficulty: 'Easy',
    learningDuration: '6-9 Months',
    roadmap: [
      { step: 1, title: 'Learn Visual Arts Basics', description: 'Study layouts, gradients, vector illustrations, and brand identities.' },
      { step: 2, title: 'Master Figma Vector tools', description: 'Design detailed interface components and icons in Figma.' },
      { step: 3, title: 'Build UI Libraries', description: 'Learn to design scalable component libraries.' }
    ],
    learningResources: [
      { name: 'Refactoring UI Book', url: 'https://www.refactoringui.com', type: 'Book' }
    ],
    faqs: [
      { question: 'UI vs UX: what is the difference?', answer: 'UI focuses on look and style; UX focuses on usability and user journeys.' }
    ]
  },
  {
    categoryKey: 'design-ui-ux',
    title: 'Product Designer',
    overview: 'Take ownership of complete visual designs, user experiences, and product strategy.',
    responsibilities: ['Align designs with business goals.', 'Deliver user journeys and high-fidelity screens.', 'Collaborate with engineering leads.'],
    technicalSkills: ['UX wireframes', 'UI visuals', 'User research', 'Business logic alignment'],
    softSkills: ['Strategic planning', 'Presentation', 'Stakeholder management'],
    tools: ['Figma', 'Amplitude', 'Jira', 'Usertesting.com'],
    education: 'HCI, Design, or CS degree with strong visual portfolio.',
    salary: { median: 118000, low: 78000, high: 165000, currency: 'USD' },
    futureScope: 'High growth as companies consolidate UX/UI design roles.',
    companies: ['Stripe', 'Airbnb', 'Uber', 'Instagram'],
    difficulty: 'Medium',
    learningDuration: '9-12 Months',
    roadmap: [
      { step: 1, title: 'Master UI and UX Basics', description: 'Learn both visual design principles and user testing methodologies.' },
      { step: 2, title: 'Understand Business Metrics', description: 'Learn how design impact metrics like conversion and retention.' },
      { step: 3, title: 'Lead Product Launches', description: 'Coordinate designs from initial concepts to final developer handoff.' }
    ],
    learningResources: [
      { name: 'UX Collective Guide', url: 'https://uxdesign.cc', type: 'Documentation' }
    ],
    faqs: [
      { question: 'Is a portfolio required?', answer: 'Yes, a strong portfolio is the single most important asset to get hired.' }
    ]
  },
  {
    categoryKey: 'design-ui-ux',
    title: 'UX Researcher',
    overview: 'Perform user interviews, analyze testing logs, and deliver usability reports.',
    responsibilities: ['Conduct user interviews.', 'Deliver usability reports.', 'Analyze user behavior data.'],
    technicalSkills: ['Qualitative research', 'Quantitative analytics', 'Usability testing', 'A/B testing basics'],
    softSkills: ['Empathy', 'Analytical thinking', 'Reporting Clarity'],
    tools: ['UserTesting.com', 'Qualtrics', 'Miro', 'Excel'],
    education: 'Psychology, Sociology, HCI, or Anthropology degree.',
    salary: { median: 105000, low: 72000, high: 148000, currency: 'USD' },
    futureScope: 'Stable demand in mature product engineering organizations.',
    companies: ['Google Research', 'Facebook Research', 'Microsoft', 'Netflix'],
    difficulty: 'Medium',
    learningDuration: '6-9 Months',
    roadmap: [
      { step: 1, title: 'Study Research Methods', description: 'Learn about user interviews, surveys, card sorting, and field studies.' },
      { step: 2, title: 'Conduct Usability Tests', description: 'Draft user test scripts, record sessions, and synthesize findings.' },
      { step: 3, title: 'Deliver Research Reports', description: 'Present findings and design recommendations to product teams.' }
    ],
    learningResources: [
      { name: 'Nielsen Norman Group Articles', url: 'https://www.nngroup.com', type: 'Documentation' }
    ],
    faqs: [
      { question: 'Is this a coding role?', answer: 'No, it focuses on psychology, user research, and data analysis.' }
    ]
  },
  {
    categoryKey: 'design-ui-ux',
    title: 'Interaction Designer',
    overview: 'Design micro-animations, button transitions, and motion systems for interfaces.',
    responsibilities: ['Create interface animations.', 'Map screen transition flows.', 'Collaborate on UI styling systems.'],
    technicalSkills: ['Motion Design', 'Micro-interactions', 'HTML/CSS transition logic', 'Vector animation'],
    softSkills: ['Aesthetic timing', 'Technical alignment', 'Detail Focused'],
    tools: ['Figma Smart Animate', 'After Effects', 'Lottie', 'Framer'],
    education: 'Digital Arts, Animation, or Graphic Design degree.',
    salary: { median: 108000, low: 70000, high: 152000, currency: 'USD' },
    futureScope: 'High request as interfaces adopt rich, dynamic micro-animations.',
    companies: ['Apple', 'Nvidia', 'Meta', 'Epic Games'],
    difficulty: 'Medium',
    learningDuration: '6-12 Months',
    roadmap: [
      { step: 1, title: 'Master Graphic Design', description: 'Learn visual layouts, vector tools, and typography.' },
      { step: 2, title: 'Study Animation Curves', description: 'Learn easing curves, timing, and motion principles.' },
      { step: 3, title: 'Master Framer & Lottie', description: 'Build interactive prototypes and export animations for web devs.' }
    ],
    learningResources: [
      { name: 'LottieFiles Tutorials', url: 'https://lottiefiles.com', type: 'Course' }
    ],
    faqs: [
      { question: 'Do I need to learn JavaScript?', answer: 'Yes, basic JS is helpful to configure animations in web applications.' }
    ]
  },

  // 9. Mobile App Development (5)
  {
    categoryKey: 'mobile-dev',
    title: 'iOS Developer',
    overview: 'Build native iOS applications using Swift and Apple frameworks.',
    responsibilities: ['Develop Swift applications.', 'Optimize layouts in SwiftUI.', 'Publish applications to Apple Store.'],
    technicalSkills: ['Swift', 'SwiftUI', 'UIKit', 'Apple SDKs', 'Core Data'],
    softSkills: ['Platform Empathy', 'Attention to Detail', 'Problem Solving'],
    tools: ['Xcode', 'TestFlight', 'Git', 'Cocoapods/SPM'],
    education: 'CS degree or equivalent app portfolio training.',
    salary: { median: 122000, low: 85000, high: 175000, currency: 'USD' },
    futureScope: 'Strong growth supporting Apple devices and services ecosystem.',
    companies: ['Apple', 'Uber', 'Robinhood', 'Snapchat'],
    difficulty: 'Medium',
    learningDuration: '6-12 Months',
    roadmap: [
      { step: 1, title: 'Learn Swift Programming', description: 'Learn Swift programming syntax, optional types, and OOP design.' },
      { step: 2, title: 'Master SwiftUI', description: 'Build responsive views and manage state using SwiftUI.' },
      { step: 3, title: 'Publish an iOS App', description: 'Register as developer, configure assets, and publish to App Store.' }
    ],
    learningResources: [
      { name: '100 Days of SwiftUI', url: 'https://www.hackingwithswift.com/100/swiftui', type: 'Course' }
    ],
    faqs: [
      { question: 'Is a Mac computer required?', answer: 'Yes, Xcode requires a macOS computer to compile Swift applications.' }
    ]
  },
  {
    categoryKey: 'mobile-dev',
    title: 'Android Developer',
    overview: 'Build native Android applications using Kotlin and Jetpack Compose.',
    responsibilities: ['Develop Android app features.', 'Optimize layouts in Jetpack Compose.', 'Publish applications to Google Play Store.'],
    technicalSkills: ['Kotlin', 'Java', 'Jetpack Compose', 'Android SDKs', 'Retrofit'],
    softSkills: ['Problem Solving', 'Detail Focused', 'Collaboration'],
    tools: ['Android Studio', 'Gradle', 'Git', 'Firebase'],
    education: 'CS degree or equivalent app portfolio training.',
    salary: { median: 118000, low: 80000, high: 168000, currency: 'USD' },
    futureScope: 'High request driven by the global market share of Android devices.',
    companies: ['Google', 'Samsung', 'Spotify', 'Square'],
    difficulty: 'Medium',
    learningDuration: '6-12 Months',
    roadmap: [
      { step: 1, title: 'Learn Kotlin Programming', description: 'Learn Kotlin syntax, coroutines, and OOP design.' },
      { step: 2, title: 'Master Jetpack Compose', description: 'Build responsive views and manage state using Jetpack Compose.' },
      { step: 3, title: 'Publish an Android App', description: 'Configure package assets and publish to Google Play Store.' }
    ],
    learningResources: [
      { name: 'Android Developer Guides', url: 'https://developer.android.com', type: 'Documentation' }
    ],
    faqs: [
      { question: 'Should I learn Kotlin or Java?', answer: 'Kotlin is the officially recommended language for Android development.' }
    ]
  },
  {
    categoryKey: 'mobile-dev',
    title: 'React Native Developer',
    overview: 'Build cross-platform mobile apps for iOS and Android using React and JavaScript.',
    responsibilities: ['Develop cross-platform app views.', 'Optimize native bridge performance.', 'Submit apps to both App Stores.'],
    technicalSkills: ['JavaScript/TypeScript', 'React', 'React Native', 'Mobile APIs', 'Redux'],
    softSkills: ['Adaptability', 'Speedy delivery', 'Communication'],
    tools: ['VS Code', 'Xcode', 'Android Studio', 'Expo CLI'],
    education: 'Frontend developers transitioning to mobile development, or CS degree.',
    salary: { median: 112000, low: 78000, high: 158000, currency: 'USD' },
    futureScope: 'High demand as companies look to ship features across both platforms from a single codebase.',
    companies: ['Meta', 'Shopify', 'Coinbase', 'Discord'],
    difficulty: 'Medium',
    learningDuration: '6-9 Months',
    roadmap: [
      { step: 1, title: 'Learn React Web Basics', description: 'Master React state hooks, props, context, and JavaScript/TypeScript.' },
      { step: 2, title: 'Learn React Native', description: 'Build mobile screens using View, Text, ScrollView, and FlatList.' },
      { step: 3, title: 'Master Native Integrations', description: 'Configure native iOS/Android modules and build with Expo.' }
    ],
    learningResources: [
      { name: 'React Native Docs', url: 'https://reactnative.dev', type: 'Documentation' }
    ],
    faqs: [
      { question: 'Is React Native performance good?', answer: 'Yes, it compiles to native views and is suitable for most apps.' }
    ]
  },
  {
    categoryKey: 'mobile-dev',
    title: 'Flutter Developer',
    overview: 'Build cross-platform mobile applications using Dart and Google Flutter SDK.',
    responsibilities: ['Develop Flutter widgets.', 'Manage app state in Bloc/Provider.', 'Publish to Play Store and App Store.'],
    technicalSkills: ['Dart language', 'Flutter SDK', 'State management', 'REST integrations'],
    softSkills: ['Logical thinking', 'Design appreciation', 'Adaptability'],
    tools: ['VS Code', 'Android Studio', 'Flutter CLI', 'Git'],
    education: 'Tech degree, self-taught path, or cross-platform training.',
    salary: { median: 110000, low: 75000, high: 155000, currency: 'USD' },
    futureScope: 'Strong growth as Flutter expands into desktop and web compilation target platforms.',
    companies: ['Google', 'BMW', 'Tencent', 'ByteDance'],
    difficulty: 'Medium',
    learningDuration: '6-9 Months',
    roadmap: [
      { step: 1, title: 'Learn Dart programming', description: 'Master Dart loops, async functions, objects, and types.' },
      { step: 2, title: 'Master Flutter Widgets', description: 'Build screens using stateless and stateful widgets.' },
      { step: 3, title: 'Understand State Managers', description: 'Implement Providers, Riverpod, or Bloc for state management.' }
    ],
    learningResources: [
      { name: 'Flutter Dev Documentation', url: 'https://docs.flutter.dev', type: 'Documentation' }
    ],
    faqs: [
      { question: 'What is Dart?', answer: 'Dart is the object-oriented, class-based programming language used by Flutter.' }
    ]
  },
  {
    categoryKey: 'mobile-dev',
    title: 'Mobile Architect',
    overview: 'Design cross-platform deployment schemes, memory management, and offline cache systems.',
    responsibilities: ['Design enterprise mobile systems.', 'Establish secure offline data caches.', 'Select app toolchains.'],
    technicalSkills: ['System Design', 'Native platforms APIs', 'Memory management', 'Mobile security'],
    softSkills: ['Leadership', 'Strategic engineering design', 'Communication'],
    tools: ['Xcode', 'Android Studio', 'Fastlane', 'SonarQube'],
    education: 'Senior mobile developer background with years of shipping commercial apps.',
    salary: { median: 160000, low: 115000, high: 230000, currency: 'USD' },
    futureScope: 'High request in companies maintaining large-scale consumer applications.',
    companies: ['Uber', 'Lyft', 'Capital One', 'Salesforce'],
    difficulty: 'Hard',
    learningDuration: '24-36 Months',
    roadmap: [
      { step: 1, title: 'Master iOS & Android platforms', description: 'Build and deploy complex native apps on both iOS and Android.' },
      { step: 2, title: 'Design Offline Architectures', description: 'Implement database sync layers and secure storage models.' },
      { step: 3, title: 'Automate Release Pipelines', description: 'Configure automated testing and deployment pipelines using Fastlane.' }
    ],
    learningResources: [
      { name: 'Google Android Architecture Guide', url: 'https://developer.android.com/topic/architecture', type: 'Documentation' }
    ],
    faqs: [
      { question: 'Is this an entry-level position?', answer: 'No, this role requires years of experience shipping production mobile apps.' }
    ]
  },

  // 10. Blockchain & Web3 (5)
  {
    categoryKey: 'web3-blockchain',
    title: 'Smart Contract Engineer',
    overview: 'Write and audit immutable protocols compiled onto ledger networks like Ethereum.',
    responsibilities: ['Write Solidity smart contracts.', 'Perform gas optimizations.', 'Implement secure token models.'],
    technicalSkills: ['Solidity', 'Ethereum virtual machine (EVM)', 'Smart contracts testing', 'Web3 libraries'],
    softSkills: ['Security Mindset', 'Mathematical rigor', 'Logical testing'],
    tools: ['Hardhat', 'Foundry', 'Remix IDE', 'Metamask'],
    education: 'CS degree or equivalent software background with deep training in solidity.',
    salary: { median: 150000, low: 105000, high: 220000, currency: 'USD' },
    futureScope: 'Volatile but high-paying role driven by DeFi and decentralized applications.',
    companies: ['Uniswap Labs', 'ConsenSys', 'Chainlink Labs', 'Polygon'],
    difficulty: 'Hard',
    learningDuration: '9-12 Months',
    roadmap: [
      { step: 1, title: 'Learn Javascript & Web3', description: 'Learn JavaScript syntax, callbacks, and how blockchain ledgers function.' },
      { step: 2, title: 'Learn Solidity Programming', description: 'Write Solidity contracts and deploy them on test networks.' },
      { step: 3, title: 'Master Testing in Foundry', description: 'Write security unit tests and optimize gas costs.' }
    ],
    learningResources: [
      { name: 'CryptoZombies Tutorial', url: 'https://cryptozombies.io', type: 'Course' }
    ],
    faqs: [
      { question: 'Why is security so important?', answer: 'Smart contracts are immutable and often hold millions of dollars; bugs can result in permanent loss.' }
    ]
  },
  {
    categoryKey: 'web3-blockchain',
    title: 'Blockchain Developer',
    overview: 'Build core network clients, consensus engine protocols, and ledger databases.',
    responsibilities: ['Develop blockchain node clients.', 'Implement consensus algorithms.', 'Optimize peer-to-peer messaging networks.'],
    technicalSkills: ['Go', 'Rust', 'Cryptography', 'P2P Networking', 'Distributed systems'],
    softSkills: ['Algorithmic Rigor', 'Analytical research', 'Problem Solving'],
    tools: ['Geth (Go-Ethereum)', 'Rust Cargo', 'Wireshark', 'GitHub'],
    education: 'Computer Science, Cryptography, or Mathematics degree.',
    salary: { median: 155000, low: 110000, high: 225000, currency: 'USD' },
    futureScope: 'High request supporting infrastructure layers (L1/L2 networks).',
    companies: ['Ava Labs', 'Solana Foundation', 'ConsenSys', 'Parity Technologies'],
    difficulty: 'Hard',
    learningDuration: '12-24 Months',
    roadmap: [
      { step: 1, title: 'Master Go or Rust', description: 'Learn memory-safe, high-concurrency systems programming languages.' },
      { step: 2, title: 'Study Cryptography basics', description: 'Learn elliptic curves, hashing, public keys, and signatures.' },
      { step: 3, title: 'Build Ledger Nodes', description: 'Deploy peer-to-peer clients and customize consensus parameters.' }
    ],
    learningResources: [
      { name: 'Solana Developer Portal', url: 'https://solana.com/developers', type: 'Documentation' }
    ],
    faqs: [
      { question: 'Is this web development?', answer: 'No, this is systems engineering focused on networks and consensus protocols.' }
    ]
  },
  {
    categoryKey: 'web3-blockchain',
    title: 'Web3 Frontend Developer',
    overview: 'Integrate client-side web interfaces with smart contract ledger protocols.',
    responsibilities: ['Develop responsive web interfaces.', 'Integrate MetaMask wallet connections.', 'Call smart contract methods.'],
    technicalSkills: ['React', 'TypeScript', 'Ethers.js', 'Viem', 'Wagmi'],
    softSkills: ['Detail Oriented', 'UX Appreciation', 'Communication'],
    tools: ['VS Code', 'Metamask', 'RainbowKit', 'Foundry'],
    education: 'Frontend developer background with web3 libraries specialization.',
    salary: { median: 118000, low: 80000, high: 165000, currency: 'USD' },
    futureScope: 'High request driven by user interface needs for DeFi and NFTs.',
    companies: ['OpenSea', 'Uniswap', 'Lido', 'Aave'],
    difficulty: 'Medium',
    learningDuration: '6-9 Months',
    roadmap: [
      { step: 1, title: 'Master React & TypeScript', description: 'Build responsive interfaces using React hooks and TypeScript typings.' },
      { step: 2, title: 'Understand Blockchain basics', description: 'Learn about wallets, transactions, signatures, and RPC endpoints.' },
      { step: 3, title: 'Learn Wagmi & Viem', description: 'Connect wallets and call smart contract methods.' }
    ],
    learningResources: [
      { name: 'Speedrun Ethereum', url: 'https://speedrunethereum.com', type: 'Course' }
    ],
    faqs: [
      { question: 'Do I need to learn Solidity?', answer: 'No, but you must know how to read ABI interfaces to communicate with contracts.' }
    ]
  },
  {
    categoryKey: 'web3-blockchain',
    title: 'Cryptography Engineer',
    overview: 'Implement zero-knowledge proof protocols and secure signing schemes.',
    responsibilities: ['Design zero-knowledge circuits.', 'Implement signature algorithms.', 'Audit cryptographic code.'],
    technicalSkills: ['Zero Knowledge Proofs (ZKP)', 'Mathematical Cryptography', 'Rust', 'zk-SNARKs'],
    softSkills: ['Mathematical Rigor', 'Precision', 'Analytical thinking'],
    tools: ['Circom', 'Rust Cargo', 'Arkworks', 'Halo2'],
    education: 'PhD or Master in Cryptography, Mathematics, or Theoretical Computer Science.',
    salary: { median: 180000, low: 130000, high: 270000, currency: 'USD' },
    futureScope: 'High growth driven by scaling solutions (L2 rollups) and privacy technologies.',
    companies: ['StarkWare', 'zkSync', 'Mina Foundation', 'OpenZeppelin'],
    difficulty: 'Hard',
    learningDuration: '24-48 Months',
    roadmap: [
      { step: 1, title: 'Master Abstract Algebra', description: 'Study finite fields, group theory, and elliptic curve math.' },
      { step: 2, title: 'Learn Zero-Knowledge Math', description: 'Study polynomial commitments, snarks, and circuit design.' },
      { step: 3, title: 'Write ZK Circuits', description: 'Write zero-knowledge circuits using Circom or Halo2.' }
    ],
    learningResources: [
      { name: 'ZK Whiteboard Sessions', url: 'https://zkhack.dev/whiteboard/', type: 'Course' }
    ],
    faqs: [
      { question: 'Is Rust required?', answer: 'Rust is currently the industry standard for cryptographic engineering.' }
    ]
  },
  {
    categoryKey: 'web3-blockchain',
    title: 'Solidity Auditor',
    overview: 'Audit smart contract codebases for vulnerabilities, overflows, and flash loan attack vectors.',
    responsibilities: ['Review smart contract code.', 'Detect vulnerability vectors.', 'Deliver detailed audit reports.'],
    technicalSkills: ['Solidity', 'EVM mechanics', 'DeFi architectures', 'Formal verification'],
    softSkills: ['Security mindset', 'Precision', 'Clear reporting'],
    tools: ['Slither', 'Mythril', 'Foundry', 'Certora'],
    education: 'Senior smart contract engineer background with deep security audit expertise.',
    salary: { median: 170000, low: 120000, high: 260000, currency: 'USD' },
    futureScope: 'High request driven by the need to prevent smart contract hacks.',
    companies: ['Trail of Bits', 'OpenZeppelin', 'ConsenSys Diligence', 'Sherlock'],
    difficulty: 'Hard',
    learningDuration: '12-24 Months',
    roadmap: [
      { step: 1, title: 'Master Smart Contract Development', description: 'Write and deploy complex DeFi protocols.' },
      { step: 2, title: 'Study Historical Exploits', description: 'Understand reentrancy, flash loan attacks, and arithmetic overflows.' },
      { step: 3, title: 'Learn Static Analysis tools', description: 'Run audits using Slither, Mythril, and write formal specs.' }
    ],
    learningResources: [
      { name: 'Secureum Smart Contract Security', url: 'https://secureum.substack.com', type: 'Course' }
    ],
    faqs: [
      { question: 'How do I start auditing?', answer: 'Participate in audit contests on platforms like Code4rena or Sherlock to build a track record.' }
    ]
  }
];

const seedData = async () => {
  try {
    console.log('Connecting to database...');
    await connectDB();

    console.log('Clearing existing careers data...');
    await Career.deleteMany({});
    console.log('Clearing existing categories data...');
    await Category.deleteMany({});

    console.log('Seeding categories...');
    const insertedCategories = await Category.insertMany(categoriesData);
    console.log(`${insertedCategories.length} categories seeded successfully!`);

    // Build category map (key -> _id)
    const categoryMap = {};
    insertedCategories.forEach((cat) => {
      // We find the matching key from the raw array
      const rawCat = categoriesData.find(c => c.name === cat.name);
      if (rawCat) {
        categoryMap[rawCat.key] = cat._id;
      }
    });

    console.log('Mapping categories to career records...');
    const mappedCareers = careersData.map((career) => {
      const categoryId = categoryMap[career.categoryKey];
      if (!categoryId) {
        throw new Error(`Category key "${career.categoryKey}" not found during mapping.`);
      }
      
      const { categoryKey, salary, ...careerDetails } = career;
      const formattedSalary = {
        min: salary.min || salary.low || 50000,
        max: salary.max || salary.high || 150000,
        median: salary.median || 100000,
        currency: salary.currency || 'USD',
      };

      return {
        ...careerDetails,
        category: categoryId,
        salary: formattedSalary,
      };
    });

    console.log('Seeding careers...');
    const insertedCareers = await Career.insertMany(mappedCareers);
    console.log(`${insertedCareers.length} careers seeded successfully!`);

    console.log('Seeding default admin user...');
    const adminEmail = 'admin@careerscope.com';
    const adminExists = await User.findOne({ email: adminEmail });
    if (!adminExists) {
      await User.create({
        name: 'System Admin',
        email: adminEmail,
        password: 'adminpassword123',
        role: 'admin',
      });
      console.log(`Admin user (${adminEmail}) created successfully!`);
    } else {
      console.log(`Admin user (${adminEmail}) already exists.`);
    }

    console.log('Database seeding process completed successfully!');
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
