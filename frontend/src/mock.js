// Mock data for Tehreem Irfan's Portfolio

export const personalInfo = {
  name: "Tehreem Irfan",
  role: "AI Engineer | Computer Vision | Agentic AI",
  email: "tehreemirfan786@gmail.com",
  phone: "+92 337 3307786",
  linkedin: "https://www.linkedin.com/in/tehreem-irfan-8a3504274/",
  github: "https://github.com/Tehreemirfan123",
  resumeUrl: "https://customer-assets.emergentagent.com/job_ae8a9041-4f07-46a4-829c-c2d7adac6710/artifacts/3u9foxbt_AI_ML_Engineer_Resume.pdf",
  profileImage: "" // Replace with your professional photo URL
};

export const heroStates = [
  {
    headline: "AI Engineer",
    supportingText: "Building intelligent systems that solve real-world problems through machine learning, computer vision, and modern AI infrastructure."
  },
  {
    headline: "Computer Vision Systems",
    supportingText: "Developing production-grade vision solutions powered by deep learning, object detection, tracking, and edge deployment."
  },
  {
    headline: "Agentic AI & LLM Applications",
    supportingText: "Creating autonomous AI workflows using LLMs, RAG pipelines, tool calling, multi-agent systems, and intelligent automation."
  }
];

export const aboutText = `AI Engineer with production experience building LLM-powered agentic systems, fine-tuning deep learning models on custom datasets, and deploying end-to-end ML pipelines. Shipped a 34,635-image computer vision system (mAP@50 = 0.9045) with FastAPI, Docker, and CPU-class edge inference via OpenVINO, and an LLM-based Sales Copilot on Relevance AI using RAG, tool calling, and prompt engineering. Proficient in Python, PyTorch, TensorFlow, Scikit-learn, LangChain, and REST API development.`;

export const projects = [
  {
    id: 1,
    title: "Real-Time PPE Compliance Monitoring System",
    description: "Production-grade computer vision system for real-time PPE compliance monitoring with multi-object tracking and identity resolution.",
    technologies: ["Python", "PyTorch", "YOLOv8", "YOLOv11", "FastAPI", "PostgreSQL", "pgvector", "ByteTrack", "OpenVINO", "Docker", "Streamlit"],
    achievements: [
      "34,635-image composite dataset across 16 classes",
      "mAP@50 = 0.9045 with YOLOv11m",
      "44 FPS inference with YOLOv8m",
      "FP16/INT8 quantization for CPU deployment",
      "30-40 FPS identity resolution with vector DB"
    ],
    githubUrl: "https://github.com/Tehreemirfan123",
    type: "computer-vision"
  },
  {
    id: 2,
    title: "Agentic AI Sales Copilot",
    description: "Multi-step autonomous AI workflow system with RAG pipeline, tool calling, and multi-agent orchestration for intelligent sales automation.",
    technologies: ["Relevance AI", "OpenAI API", "RAG", "Tool Calling", "Prompt Engineering", "Multi-agent Systems"],
    achievements: [
      "Built custom tool chain for company & prospect research",
      "Implemented RAG pipeline for context-grounded responses",
      "Designed multi-agent architecture with specialist sub-agents",
      "Automated pre-call report generation workflow"
    ],
    githubUrl: "https://github.com/Tehreemirfan123",
    type: "agentic-ai"
  },
  {
    id: 3,
    title: "Student Performance Classifier",
    description: "Multi-class classification system predicting student performance with interpretable ML outputs and intuitive GUI.",
    technologies: ["Python", "Scikit-learn", "Logistic Regression", "Flutter", "Google Colab", "AWS EC2", "AWS S3"],
    achievements: [
      "82% accuracy across 6 grade bands (A-F)",
      "18% error reduction vs baseline",
      "Deployed ML inference endpoint on AWS",
      "Flutter GUI with per-prediction metrics display"
    ],
    githubUrl: "https://github.com/Tehreemirfan123",
    type: "ml-classification"
  },
  {
    id: 4,
    title: "BizBuddy AI - National Hackathon",
    description: "ML-based business advisory platform for micro-entrepreneurs built during national-level hackathon sprint.",
    technologies: ["Python", "Scikit-learn", "Streamlit", "REST API", "Multi-class Classification"],
    achievements: [
      "Led 5-person team to victory",
      "78% advisory accuracy on 500+ scenarios",
      "Deployed working prototype in time-constrained sprint",
      "AI-powered business recommendations"
    ],
    githubUrl: "https://github.com/Tehreemirfan123",
    type: "hackathon"
  },
  {
    id: 5,
    title: "VisionEdge Studio",
    description: "Interactive computer vision web application for real-time edge detection algorithm experimentation and comparison.",
    technologies: ["Python", "Streamlit", "OpenCV", "Sobel", "Canny", "Laplacian"],
    achievements: [
      "3 edge-detection algorithms with real-time processing",
      "Adjustable parameters for experimentation",
      "Side-by-side algorithm comparison",
      "Used as ML teaching tool"
    ],
    githubUrl: "https://github.com/Tehreemirfan123",
    type: "computer-vision"
  }
];

export const skills = [
  {
    category: "AI & Machine Learning",
    items: [
      "LLM (Large Language Models)",
      "RAG (Retrieval-Augmented Generation)",
      "Agentic AI",
      "Multi-agent Systems",
      "Computer Vision",
      "Deep Learning",
      "Object Detection",
      "Model Fine-tuning",
      "Prompt Engineering"
    ]
  },
  {
    category: "Frameworks & Libraries",
    items: [
      "PyTorch",
      "TensorFlow",
      "YOLOv8/YOLOv11",
      "LangChain",
      "OpenAI API",
      "Scikit-learn",
      "OpenCV",
      "Hugging Face",
      "OpenVINO"
    ]
  },
  {
    category: "Development & Deployment",
    items: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Vector Databases (pgvector)",
      "Docker",
      "REST API",
      "Linux",
      "Git/GitHub"
    ]
  },
  {
    category: "Specialized Tools",
    items: [
      "Relevance AI",
      "ByteTrack",
      "ONNX",
      "Streamlit",
      "React JS",
      "Node.js",
      "AWS (EC2, S3)"
    ]
  }
];

export const experience = [
  {
    title: "DevOps Intern",
    company: "Punjab Information Technology Board (PITB)",
    location: "Lahore",
    duration: "Aug 2025 – Sep 2025",
    responsibilities: [
      "Automated 3+ recurring operational tasks via Bash scripting, reducing manual effort by 40%",
      "Enforced Git version control standards achieving 100% commit traceability",
      "Maintained Linux server infrastructure supporting ML data pipeline environments",
      "Configured user access controls and system health monitoring"
    ]
  }
];

export const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "Government College University, Lahore",
    duration: "2022 – 2026",
    type: "undergraduate"
  },
  {
    degree: "Higher Secondary Education (ICS)",
    institution: "Kinnaird College for Women University, Lahore",
    duration: "2020 – 2022",
    type: "secondary"
  }
];
