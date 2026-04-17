# System Architecture Document
**Let's Tour Zimbabwe Platform**

## Architecture Overview

### System Vision
Design a scalable, secure, and reliable cloud-based platform that supports Zimbabwe's educational tourism ecosystem through a monolith-first Next.js architecture with managed PostgreSQL and Redis, enabling rapid MVP delivery and a clear path to future decomposition.

### Architecture Principles
1. **Scalability**: Handle growth from 50 to 10,000+ users seamlessly
2. **Reliability**: 99.5% uptime with fault tolerance and disaster recovery
3. **Security**: Multi-layered security protecting sensitive educational and financial data
4. **Performance**: Sub-2-second response times across all user interactions
5. **Maintainability**: Modular design enabling rapid feature development and updates

## High-Level Architecture

### System Architecture Pattern
**Monolith-first on Next.js (Vercel)** with clear domain boundaries
- Fastest MVP with a single deployable application
- Supports multiple client applications (web now, mobile later) via shared API routes
- Establishes modular domains for future service extraction
- Leverages serverless scaling and Vercel’s global edge network

### Deployment Architecture
**Vercel Serverless + Managed Data Services**
- Primary region: `cpt1` (Cape Town)
- Optional secondary region: `fra1` for failover/analytics
- Database: Managed PostgreSQL (Supabase/Neon/Railway)
- Cache & Rate limiting: Upstash Redis (global REST)
- Static assets & CDN: Vercel Edge Network

## Core System Components

### 1. Full-Stack Next.js Application

#### 1.1 Next.js Web Platform
- **Technology**: Next.js 14.x (latest stable) with TypeScript and App Router
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: Zustand for client state, React Query for server state
- **Authentication**: NextAuth.js with multiple providers
- **Database**: Prisma ORM with PostgreSQL (Supabase/Neon)
- **Deployment**: Vercel Functions (Node runtime); Edge selectively for non-DB workloads

#### 1.2 Mobile-First Responsive Design
- **Approach**: Progressive Web App (PWA) with mobile-first design
- **Technology**: Next.js with responsive Tailwind CSS
- **Native Features**: PWA capabilities for offline access and push notifications
- **Future**: React Native app using shared API endpoints
- **Performance**: Optimized for Zimbabwe's mobile internet conditions

#### 1.3 Integrated Admin Dashboard
- **Technology**: Next.js admin routes with role-based access
- **Authentication**: NextAuth.js with admin role permissions
- **Analytics**: Recharts/Chart.js with real-time data
- **Features**: User management, booking oversight, provider verification

### 2. Next.js API Routes Layer

#### 2.1 Built-in API Routes
- **Technology**: Next.js API Routes with TypeScript
- **Features**:
  - RESTful endpoints for all platform functionality
  - Built-in request/response handling
  - Middleware for authentication and validation
  - Automatic API documentation with OpenAPI
  - Node runtime for Prisma-powered endpoints (Edge reserved for stateless tasks)
  - Rate limiting with Upstash Redis

#### 2.2 Edge Functions (Selective)
- **Technology**: Vercel Edge Functions
- **Use Cases**:
  - Stateless logic for geo/feature flags/personalization
  - Geographic routing and caching for non-DB endpoints
  - Offload compute that does not require Prisma/PostgreSQL

### 3. Integrated Application Services

#### 3.1 User Management (API Routes)
- **Technology**: Next.js API routes with NextAuth.js
- **Database**: Prisma with PostgreSQL
- **Features**:
  - OAuth and credential-based authentication
  - Role-based access control (RBAC)
  - Profile management and verification
  - Password reset and account recovery
- **Security**: NextAuth.js security, bcrypt hashing, CSRF protection

#### 3.2 Tour Planning (API Routes)
- **Technology**: Next.js API routes with TypeScript
- **Database**: Prisma with PostgreSQL, Upstash Redis for caching
- **Features**:
  - Destination and activity management
  - Dynamic itinerary building algorithms
  - Real-time budget calculation
  - Availability checking and optimization
- **External APIs**: Google Maps, OpenWeather, currency conversion APIs

#### 3.3 Service Provider Management (API Routes)
- **Technology**: Next.js API routes with full-text search
- **Database**: Prisma with PostgreSQL full-text search
- **Features**:
  - Provider profile and portfolio management
  - Certification workflows and verification
  - Calendar integration and availability
  - Performance analytics and reporting
- **Search**: PostgreSQL full-text search with ranking algorithms

#### 3.4 Booking and Payment (API Routes)
- **Technology**: Next.js API routes with Stripe integration
- **Database**: Prisma with PostgreSQL for ACID transactions
- **Features**:
  - Dynamic quote generation and management
  - Booking lifecycle and state management
  - Stripe payment processing and webhooks
  - Automated invoice and receipt generation
- **Payment Integration**: Stripe for international, local gateway APIs
- **Security**: Stripe's PCI compliance, webhook signature verification

#### 3.5 Communication (API Routes + Real-time)
- **Technology**: Next.js API routes + Pusher/Ably for real-time
- **Database**: Prisma with PostgreSQL for message persistence
- **Features**:
  - Real-time messaging via WebSocket service
  - File upload with Vercel Blob storage
  - Email notifications with Resend/SendGrid
  - SMS integration with Twilio
- **Real-time**: Pusher Channels or Ably for WebSocket functionality

#### 3.6 Review and Rating (API Routes)
- **Technology**: Next.js API routes with analytics
- **Database**: Prisma with PostgreSQL and computed fields
- **Features**:
  - Multi-criteria rating system
  - Review moderation and content filtering
  - Aggregate rating calculations with caching
  - Provider response management
- **Analytics**: Vercel Analytics for user behavior insights

### 3.7 AI Strategy

- **Data Sourcing**:
  - **Curriculum Alignment**: Collaboration with Ministry of Education, educational content providers, and verified school curriculum data.
  - **Pricing & Availability**: Real-time data from certified service providers via API integrations and manual input.
  - **Historical Tour Data**: Anonymized data from completed tours to refine recommendations.
- **Bias Mitigation**:
  - **Diverse Data Sets**: Ensure training data represents a wide range of schools, destinations, and service providers to minimize bias.
  - **Fairness Metrics**: Implement and monitor fairness metrics to detect and address biases in recommendations (e.g., ensuring diverse service provider suggestions, fair pricing across regions).
  - **Human Oversight**: Implement a human-in-the-loop system for reviewing AI-generated itineraries and pricing, especially during initial phases, to catch and correct biases.
- **Cold-Start Strategy**:
  - **Rule-Based Hybrid**: For new regions or providers with limited data, start with rule-based recommendations guided by expert input and gradually transition to AI as data accumulates.
  - **Curated Content**: Leverage carefully curated educational content and pre-vetted service provider profiles to provide initial value.
- **Transparency & Explainability**:
  - **Recommendation Rationale**: Provide users with clear explanations for AI-generated recommendations (e.g., "This itinerary was chosen for its alignment with science curriculum objectives and cost-effectiveness").
  - **Auditable Algorithms**: Ensure the commission distribution and pricing algorithms are auditable and transparent to all stakeholders.
  - **Ethical AI**: Adhere to ethical AI principles, focusing on fairness, accountability, and user privacy in the design and deployment of all AI components.

### 4. Data Layer

#### 4.1 Primary Database
- **Technology**: PostgreSQL 15+ with read replicas
- **Features**:
  - ACID compliance for financial transactions
  - Full-text search capabilities
  - JSON support for flexible schemas
  - Automated backups and point-in-time recovery
- **Scaling**: Master-slave replication with read replicas

- #### 4.2 Cache Layer
- **Technology**: Upstash Redis (serverless)
- **Use Cases**:
  - Session storage and user authentication
  - API response caching
  - Real-time data (availability, pricing)
  - Rate limiting counters
- **Configuration**: Global REST API with TTL-based caching

#### 4.3 Search and Discovery
- **Technology**: PostgreSQL full-text search (MVP)
- **Use Cases**:
  - Service provider discovery and filtering
  - Destination and activity search
  - Review and content search
- **Future**: External search service can be introduced when scale demands

#### 4.4 File Storage
- **Technology**: AWS S3 or compatible object storage
- **Use Cases**:
  - User profile images and documents
  - Service provider portfolios and galleries
  - Tour itinerary documents and media
  - System backups and logs
- **Features**: CDN integration, automatic compression, lifecycle policies

### 5. External Integrations

#### 5.1 Government Systems Integration Strategy

**Phase 1: Partnership Development (Months 1-6)**
- **ZTA Engagement**: Initiate formal partnership discussions and MOU development
- **Ministry Outreach**: Establish relationships with Ministry of Education technology team
- **Requirements Gathering**: Document exact API requirements and compliance standards
- **Legal Framework**: Develop data sharing agreements and compliance frameworks

**Phase 2: Technical Integration (Months 7-12)**
- **ZTA Integration**: API connections for provider verification and compliance
  - Provider registration verification
  - Compliance status checking
  - Automated reporting workflows
- **Ministry of Education**: Integration for tour approval workflows
  - Tour approval submission APIs
  - Compliance document generation
  - Real-time approval status tracking
- **Implementation**: RESTful APIs with OAuth 2.0 authentication

**Phase 3: Compliance Automation (Months 13-18)**
- **Automated Compliance Checking**: Real-time validation of tour requirements
- **Document Generation**: Automated creation of required regulatory documents
- **Monitoring & Reporting**: Continuous compliance monitoring and automated reporting

**CRITICAL DEPENDENCIES**:
- Regulatory partnerships must be secured before technical development
- API specifications depend on government system capabilities
- Fallback manual processes required if API integration is delayed

#### 5.2 Payment Gateways
- **International**: Stripe, PayPal for international transactions
- **Local**: EcoCash, OneMoney, local bank APIs for Zimbabwean payments
- **Features**: Multi-currency support, fraud detection, recurring payments

#### 5.3 Third-Party Services
- **Maps and Location**: Google Maps API for routing and location services
- **Weather**: OpenWeatherMap API for destination weather information
- **Currency**: Exchange rate APIs for multi-currency support
- **Communication**: Email (SendGrid), SMS (Twilio), Push (Firebase)

## Security Architecture

### 1. Authentication and Authorization
- **Authentication**: JWT tokens with refresh token rotation
- **Authorization**: Role-based access control (RBAC) with fine-grained permissions
- **Multi-Factor Authentication**: TOTP and SMS-based 2FA for admin accounts
- **Session Management**: Secure session handling with automatic timeout

### 2. Data Protection
- **Encryption at Rest**: AES-256 encryption for sensitive data
- **Encryption in Transit**: TLS 1.3 for all communications
- **Key Management**: AWS KMS or HashiCorp Vault for key rotation
- **Data Anonymization**: PII anonymization for analytics and testing

### 3. Network Security
- **Firewall**: Web Application Firewall (WAF) with custom rules
- **DDoS Protection**: CloudFlare or AWS Shield for attack mitigation
- **VPN Access**: Secure admin access through VPN tunnels
- **Network Segmentation**: Isolated subnets for different service tiers

### 4. Application Security
- **Input Validation**: Comprehensive input sanitization and validation
- **SQL Injection Prevention**: Parameterized queries and ORM usage
- **XSS Protection**: Content Security Policy (CSP) and output encoding
- **CSRF Protection**: Anti-CSRF tokens for state-changing operations

## Performance and Scalability

### 1. Scaling Strategy (MVP)
- **Serverless Compute**: Automatic scaling via Vercel Functions
- **Static Delivery**: Vercel Edge Network for static assets
- **Database Scaling**: Connection pooling, read replicas as needed
- **Caching**: Upstash Redis for hot paths and rate limiting

### 2. Caching Strategy
- **Application Cache**: Redis for frequently accessed data
- **CDN**: Global content delivery network for static assets
- **Browser Cache**: Optimized cache headers for client-side caching
- **Database Cache**: Query result caching and materialized views

### 3. Performance Optimization
- **Code Splitting**: Lazy loading of application modules
- **Image Optimization**: Automatic compression and format conversion
- **Database Optimization**: Query optimization and indexing strategies
- **Monitoring**: Real-time performance monitoring and alerting

## Monitoring and Observability

### 1. Application Monitoring
- **Error Tracking**: Sentry for comprehensive error reporting, performance monitoring, and distributed tracing. Configure Sentry to capture detailed stack traces and context for both client and server-side errors.
- **Logging**: Centralized structured logging for all application events and API requests. Utilize Vercel's integrated logging with request IDs, and expand to a dedicated managed log service (e.g., Datadog, ELK stack) for advanced querying and long-term retention. Logs will include severity levels, timestamps, and relevant contextual information.
- **Metrics**: Vercel Analytics for core web vitals and user behavior. Implement custom events for key business actions (e.g., tour generation, booking completion) and integrate with a business intelligence platform for deeper analysis.
- **Alerting**: Configure Sentry alerts for critical errors (e.g., high error rates, unhandled exceptions) and custom metric alerts for deviations from normal behavior. Define clear escalation paths to on-call teams or relevant stakeholders.

### 2. Infrastructure Monitoring
- **Serverless Function Monitoring**: Detailed monitoring of Vercel Functions performance, invocations, cold starts, and resource utilization.
- **Database Monitoring**: Comprehensive monitoring of PostgreSQL performance metrics including query execution times, active connections, slow queries, and replication status. Leverage features from managed database providers.
- **Cache Monitoring**: Monitor Redis cache hit/miss rates, latency, memory usage, and key eviction policies to ensure optimal caching performance.
- **Network Monitoring**: Continuous monitoring of network latency, throughput, and error rates across all integration points and external services.
- **Security Monitoring**: Implement intrusion detection systems, audit logging for administrative actions, and continuous vulnerability scanning to identify and respond to security threats.

### 3. Tracing
Implement distributed tracing to visualize and understand the flow of requests across the Next.js application, API routes, and external services. This will help in identifying performance bottlenecks and debugging complex interactions.
- **OpenTelemetry Integration**: Integrate OpenTelemetry or similar tracing tools to generate and collect traces across the entire system.
- **Trace Context Propagation**: Ensure trace context is propagated correctly across all service calls, including API routes, database queries, and external API calls.
- **Visualization**: Utilize tools like Jaeger or custom dashboards to visualize traces and analyze latency at each step of a request.

### 4. Business Metrics
- **User Analytics**: Google Analytics and custom event tracking
- **Conversion Tracking**: Booking funnel analysis and optimization
- **Financial Metrics**: Revenue tracking and commission calculations
- **Quality Metrics**: Service provider ratings and user satisfaction

## Disaster Recovery and Business Continuity

### 1. Backup Strategy
- **Database Backups**: Automated daily backups with point-in-time recovery
- **File Backups**: Incremental backups of user-generated content
- **Configuration Backups**: Infrastructure as Code (IaC) with version control
- **Cross-Region Replication**: Automated replication to secondary region

### 2. Failover Procedures
- **Automatic Failover**: Database and service failover with minimal downtime
- **Manual Failover**: Documented procedures for complex failure scenarios
- **Health Checks**: Continuous monitoring with automatic recovery
- **Communication Plan**: Stakeholder notification during outages

### 3. Recovery Objectives
- **Recovery Time Objective (RTO)**: 4 hours for full service restoration
- **Recovery Point Objective (RPO)**: 1 hour maximum data loss
- **Availability Target**: 99.5% uptime during business hours
- **Testing Schedule**: Quarterly disaster recovery testing

### 4. Contingency Planning
- **Regulatory/Partnership Delays**: Develop a tiered launch strategy where core platform functionality can operate independently while pursuing full regulatory endorsements. Engage with a wider range of educational and tourism bodies.
- **AI Model Performance Issues**: Implement robust human-in-the-loop review for AI-generated itineraries/pricing during initial phases. Develop fallback rule-based or template-driven itinerary generation in case of AI failures or poor performance.
- **Service Provider Recruitment Challenges**: Diversify recruitment channels and offer enhanced initial incentives. Focus on high-quality, high-impact providers first, then scale. Explore partnerships with existing touring associations.
- **Unforeseen Technical Challenges**: Maintain flexibility in the development roadmap to allocate resources to unforeseen technical issues. Prioritize stability and security over new features if critical bugs arise. Implement strong version control and rollback strategies.

## Architectural Evolution Roadmap

### 1. Bounded Contexts for Future Decomposition
The current monolith-first architecture is designed with clear logical boundaries that can be extracted into independent services as the platform scales and specific needs arise. Key potential bounded contexts include:
- **User & Authentication Service**: Managing user profiles, roles, authentication, and authorization.
- **Tour Management Service**: Handling destination data, itinerary creation, and tour lifecycle management.
- **Service Provider & Marketplace Service**: Managing provider profiles, certifications, ratings, and service listings.
- **Booking & Payment Service**: Orchestrating booking workflows, payment processing, and financial transactions.
- **Communication Service**: Managing in-app messaging, notifications (email, SMS, push).
- **Compliance & Reporting Service**: Handling regulatory compliance checks, document generation, and analytics reporting.

### 2. Specific Scalability Metrics and Decomposition Triggers

**Performance-Based Triggers**:
- **Response Time**: API endpoints consistently exceeding 2-second response times under normal load
- **Database Load**: PostgreSQL connection pool utilization exceeding 80% for more than 10 minutes
- **Memory Usage**: Vercel Function memory usage consistently above 80% of allocated limits
- **Error Rate**: Service error rates exceeding 1% for any 5-minute period
- **Concurrent Users**: Platform struggling to handle more than 500 concurrent users

**Business-Based Triggers**:
- **User Volume**: More than 1,000 active schools using the platform monthly
- **Transaction Volume**: Processing more than 10,000 tour bookings per month
- **Data Volume**: Database size exceeding 100GB or query performance degradation
- **Team Size**: Development team growing beyond 8-10 developers
- **Revenue Scale**: Monthly recurring revenue exceeding $50,000

**Technical Debt Triggers**:
- **Deployment Time**: Full application deployment taking more than 10 minutes
- **Development Velocity**: Feature development cycles extending beyond 2 weeks due to complexity
- **Testing Complexity**: End-to-end test suite taking more than 30 minutes to complete
- **Code Complexity**: Individual API routes exceeding 500 lines of code

**Decomposition Decision Matrix**:
- **Low Priority** (0-2 triggers): Continue with monolith, optimize existing architecture
- **Medium Priority** (3-4 triggers): Begin planning service extraction for specific domains
- **High Priority** (5+ triggers): Immediate decomposition required for affected services

### 3. Phased Decomposition Roadmap with Specific Timelines

**Phase 1: Performance Optimization (Months 6-12)**
*Triggered by*: Response time or concurrent user limits
- **Priority Services**: Real-time Communication, Search, AI Processing
- **Expected Timeline**: 2-3 months per service extraction
- **Success Metrics**: 50% improvement in response times, support for 1,000+ concurrent users

**Phase 2: Business Logic Separation (Months 12-18)**
*Triggered by*: Transaction volume or team scaling needs
- **Priority Services**: Booking & Payment, Service Provider Management
- **Expected Timeline**: 3-4 months per service extraction
- **Success Metrics**: Independent deployment cycles, 99.9% payment processing uptime

**Phase 3: Domain Optimization (Months 18-24)**
*Triggered by*: Technology diversity or compliance requirements
- **Priority Services**: Compliance & Reporting, Advanced Analytics
- **Expected Timeline**: 4-6 months per service extraction
- **Success Metrics**: Specialized technology stacks, enhanced compliance automation

**Migration Strategy per Service**:
1. **Preparation** (Month 1): API boundary definition, data migration planning
2. **Development** (Months 2-3): Service implementation, testing, integration
3. **Gradual Migration** (Month 4): Feature flags, gradual traffic shifting
4. **Full Cutover** (Month 5): Complete migration, monolith cleanup
5. **Optimization** (Month 6): Performance tuning, monitoring enhancement

## Development and Deployment

### 1. Development Environment
- **Version Control**: Git with trunk-based or lightweight GitFlow
- **Code Quality**: ESLint, Prettier, TypeScript strict mode
- **Testing**: Jest (unit) and Playwright (E2E)
- **Documentation**: OpenAPI (generated) for API documentation

### 2. CI/CD Pipeline
- **Continuous Integration**: GitHub Actions
- **Automated Testing**: Unit, integration, and end-to-end tests
- **Security Scanning**: Dependency scanning and SAST
- **Deployment**: Vercel preview deployments with instant rollbacks

### 3. Environment Management
- **Development**: Local Next.js with `.env` and managed Postgres (or Docker Postgres)
- **Staging**: Vercel project with separate Postgres/Redis instances
- **Production**: Vercel (cpt1) with managed Postgres and Upstash Redis
- **Configuration**: Environment-specific secrets via Vercel

## Technology Stack Summary

### Frontend
- **Web**: Next.js 15, React, TypeScript, Tailwind CSS, shadcn/ui
- **Mobile**: React Native (future), TypeScript
- **Admin**: Next.js admin routes, Recharts/Chart.js

### Backend
- **Runtime**: Next.js API Routes (Node.js 18+)
- **Language**: TypeScript for type safety
- **API**: RESTful APIs with OpenAPI documentation
- **Real-time**: Pusher/Ably for live features

### Data
- **Primary DB**: PostgreSQL 15+ with Prisma ORM
- **Cache**: Upstash Redis
- **Search**: PostgreSQL full-text (MVP)
- **Storage**: AWS S3 compatible object storage / Vercel Blob

### Infrastructure
- **Cloud**: Vercel for hosting and CDN
- **Containers**: Not required for MVP
- **CDN**: Vercel Edge Network
- **Monitoring**: Sentry, Vercel Analytics

### 5. PWA/Offline Strategy
To enhance user experience in areas with limited connectivity, a Progressive Web App (PWA) approach will be adopted for core functionalities. This strategy focuses on providing reliable performance and offline access where feasible.
- **Feature Prioritization**: Clearly define which core features *must* be available offline. Initial focus will be on read-only access to saved tour itineraries, destination information, and service provider details.
- **Service Worker Implementation**: Utilize Service Workers to cache static assets (HTML, CSS, JavaScript, images) and critical API responses. Implement a 'cache-first' or 'stale-while-revalidate' caching strategy for frequently accessed data.
- **Background Sync**: Explore the use of Background Sync API for deferring non-critical data synchronization (e.g., saving draft itineraries) until connectivity is restored.
- **Data Synchronization**: Implement a robust mechanism for synchronizing local data changes with the backend once online. This will include strategies for conflict resolution.
- **User Experience**: Design clear UI/UX indicators to inform users about their online/offline status and available functionality. Graceful degradation of features in offline mode.

---
**Document Version**: 2.0  
**Date**: September 10, 2025  
**Status**: Approved - Scalability Enhanced
**Next Review**: November 10, 2025
**Change Summary**: Standardized Next.js 14.x, added specific scalability metrics, enhanced compliance integration strategy
