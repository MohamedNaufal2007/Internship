# CivicVoice AI - Smart Public Grievance & Civic Management Platform

## Overview

CivicVoice AI is an enterprise-grade full-stack SaaS platform designed for municipalities, corporations, smart cities, universities, and government organizations to manage public grievances and civic issues efficiently.

## 🚀 Technology Stack

### Frontend
- **Next.js 15** - React framework for production
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **ShadCN UI** - High-quality component library
- **Framer Motion** - Advanced animations
- **React Query (TanStack)** - Server state management
- **Redux Toolkit** - Client state management
- **React Hook Form** - Efficient form handling
- **Zod** - Runtime type validation
- **Mapbox/Google Maps** - Location & mapping
- **Recharts** - Data visualization

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **GraphQL (Apollo Server)** - API query language
- **REST APIs** - Traditional endpoints
- **PostgreSQL** - Relational database
- **Prisma ORM** - Database abstraction
- **Redis** - Caching & session management
- **JWT** - Authentication tokens
- **Socket.IO** - Real-time WebSocket communication

### Cloud & DevOps
- **AWS S3** - File storage
- **Docker** - Containerization
- **GitHub Actions** - CI/CD pipeline
- **AWS EC2** - Deployment
- **Nginx** - Reverse proxy
- **CloudWatch** - Monitoring & logging

## 📋 User Roles

1. **Citizen** - Report and track civic issues
2. **Field Worker** - Handle on-ground resolution
3. **Department Officer** - Manage complaints & assign work
4. **City Administrator** - Monitor city-wide operations
5. **Super Admin** - System configuration & security

## ✨ Key Features

### Citizen Portal
- User registration & authentication
- Interactive complaint submission with geolocation
- Image/video uploads
- Voice complaint recording
- Real-time status tracking
- Chat with officials
- Emergency complaint reporting
- Community forum & upvoting
- Issue heatmap visualization

### Field Worker Portal
- Task dashboard with assignments
- Route navigation & GPS verification
- Before/after photo capture
- Real-time progress updates
- Attendance tracking

### Officer Portal
- Comprehensive complaint management
- Department assignment & routing
- Priority & escalation management
- SLA tracking
- Performance analytics
- Resource allocation

### Admin Portal
- Enterprise dashboard
- Complaint statistics & analytics
- Department & worker performance
- Budget monitoring
- Citizen satisfaction metrics
- Live activity monitoring

### Super Admin Portal
- User & department management
- System configuration
- Role management
- Audit logs
- Security monitoring
- API management

## 🤖 AI Features

- **Complaint Classification** - Auto-categorize issues
- **Priority Prediction** - ML-based priority assignment
- **Duplicate Detection** - Identify similar complaints
- **Sentiment Analysis** - Analyze citizen feedback
- **Smart Routing** - Auto-assign to departments
- **AI Chat Assistant** - Intelligent helpbot
- **Predictive Analytics** - Forecast trends

## 📁 Project Structure

```
CivicVoice-AI/
├── apps/
│   ├── web/                 # Next.js frontend
│   ├── api/                 # Express backend
│   └── mobile/              # React Native (future)
├── packages/
│   ├── shared/              # Shared types & utilities
│   ├── ui/                  # Shared UI components
│   └── config/              # Shared configuration
├── infra/
│   ├── docker/              # Docker configuration
│   ├── k8s/                 # Kubernetes (future)
│   └── terraform/           # Infrastructure as Code
├── docs/
│   ├── api/                 # API documentation
│   ├── architecture/        # Architecture decisions
│   └── deployment/          # Deployment guides
└── scripts/                 # Build & utility scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 7+
- Docker & Docker Compose
- AWS account (for S3 & deployment)

### Installation

\`\`\`bash
# Clone repository
git clone https://github.com/MohamedNaufal2007/CivicVoice-AI.git
cd CivicVoice-AI

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env.local

# Setup database
npx prisma migrate dev
npx prisma db seed

# Start development servers
npm run dev
\`\`\`

## 🔐 Security Features

- JWT-based authentication
- Role-Based Access Control (RBAC)
- Two-Factor Authentication (2FA)
- OAuth 2.0 integration (Google)
- OTP verification
- Password reset functionality
- Audit logging
- Rate limiting
- Input validation & sanitization
- CORS protection
- SQL injection prevention
- XSS protection

## 📊 Complaint Categories

- Roads & Infrastructure
- Water Supply
- Drainage Systems
- Street Lights
- Garbage Collection
- Public Transport
- Parks & Recreation
- Pollution
- Electricity
- Public Safety
- Other

## 🔔 Notification Channels

- Email notifications
- SMS notifications
- Push notifications
- In-app notifications
- WhatsApp integration

## 📱 Advanced Features

- Dark mode support
- Multi-language support (including Tamil)
- Accessibility features (WCAG 2.1)
- Offline PWA support
- QR code tracking
- Digital document verification
- Real-time collaboration

## 📈 Analytics & Reporting

- Daily, monthly, and custom reports
- Department performance metrics
- Resolution time tracking
- Citizen engagement analytics
- Predictive trend analysis
- Export to PDF/Excel

## 🤝 Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

## 📞 Support

For support, email support@civicvoiceai.com or visit our [help center](https://help.civicvoiceai.com).
