# Tehreem Irfan Portfolio - PRD

## Original Problem Statement
Build a premium 3D animated portfolio website for Tehreem Irfan (AI Engineer | Computer Vision | Agentic AI) inspired by juanmora.co with smooth cinematic animations.

**Personal Info:**
- Email: tehreemirfan786@gmail.com
- Phone: +92 337 3307786
- LinkedIn: https://www.linkedin.com/in/tehreem-irfan-8a3504274/
- GitHub: https://github.com/Tehreemirfan123

## User Choices
- Hero Section: AI-themed cinematic background (replaced with animated gradient orbs due to URL issues)
- Project Visuals: Architecture diagrams showing workflows
- Animation Libraries: Three.js/Framer Motion/GSAP (Framer Motion implemented)
- GitHub Integration: Dynamic fetching via GitHub API
- Contact Form: Functional form that sends emails (mock mode without SMTP credentials)

## User Personas
- **Primary**: Tech recruiters / potential employers looking for AI engineering talent
- **Secondary**: Collaborators / fellow developers exploring AI projects

## Architecture
- **Frontend**: React + Framer Motion + Tailwind CSS
- **Backend**: FastAPI + MongoDB
- **External**: GitHub API for dynamic projects, SMTP for contact form

## Implemented Features (June 2026)
### Frontend Components:
- Navigation.jsx - Sticky nav with smooth scroll
- HeroSection.jsx - 3-state animated headline with professional photo
- AboutSection.jsx - Bio with 3 highlight cards
- SkillsSection.jsx - 4 categorized skill groups
- ProjectsSection.jsx - GitHub API integration + resume projects (filters out React-Optimization-Bootcamp, Codsoft)
- ExperienceSection.jsx - Professional Experience only (Education removed per user request)
- ContactSection.jsx - Functional form with backend integration
- Footer.jsx - Copyright and brand

### Backend Endpoints:
- GET /api/github/projects - Fetches real GitHub repos from Tehreemirfan123
- POST /api/contact/send - Saves to MongoDB + sends email (when SMTP configured)
- GET /api/ - Health check

### Design Features:
- Cyan-to-blue gradient theme
- Animated gradient orb backgrounds
- Glass-morphism effects
- Smooth scroll behavior
- Professional photo with gradient ring border and theme color overlay
- Responsive design

## Backlog (P1)
- Add SMTP credentials for actual email delivery
- Add more project preview images/architecture diagrams
- Add scroll-linked parallax effects to projects
- Mobile responsiveness fine-tuning

## Backlog (P2)
- Add blog section
- Add testimonials
- Multi-language support
- Dark/light theme toggle

## Next Tasks
- Optional: Configure SMTP_USER and SMTP_PASSWORD in /app/backend/.env to enable real email sending
- Optional: Replace placeholder URLs with actual project screenshots/diagrams
