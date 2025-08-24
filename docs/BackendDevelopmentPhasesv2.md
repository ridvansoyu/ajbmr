# Akademik Journal System - Backend Development Phases

## 1. Project Overview

This platform is designed for managing the complete lifecycle of academic manuscripts — from initial submission by authors, through editorial checks and peer review, to final publication. It supports multiple user roles with clearly defined responsibilities.

This is not just a submission site — it is a complete academic publishing management system combining editorial oversight, peer review management, and digital publishing capabilities in one integrated platform.

## 2. Progress and Phase

### 1. General Progress: %0 Completed
- **Phase 1**: %0 completed (0/X görev) 
- **Phase 2**: %0 completed (0/X görev) 
- **Phase 3**: %0 completed (0/X görev) 
- **Phase 4**: %0 completed (0/X görev)

### 2. Critical Issues Identified
Use this section for implementation issues which are critical or must be later implemented due to changes.
**Backend controllers and services are implemented but routes are NOT registered in the main server!**
- Auth routes exist but not accessible from frontend
- User management routes exist but not registered
- This explains why login doesn't work - the endpoints aren't available

### 3. Completed Tasks:

Here, the all tasks. The tasks which are completed must start with ✅, if not implemented , if tried to implement but fail: 
Here are examples
✅ Backend proje yapısı oluşturuldu  
✅ Temel dosyalar (package.json, tsconfig.json, env.example) oluşturuldu  
✅ Prisma schema tanımlandı  
✅ Core middleware'ler (errorHandler, notFound, rateLimiter, validateRequest) oluşturuldu  
✅ Auth controller ve service oluşturuldu  
✅ Temel route yapısı oluşturuldu  
✅ Utility dosyaları (logger, database, redis, validators) oluşturuldu  
✅ File upload middleware oluşturuldu  
✅ Email service oluşturuldu  
✅ Submission controller ve service oluşturuldu  
✅ Auth middleware (JWT verification) oluşturuldu  
✅ Role-based access control middleware oluşturuldu  
✅ Review controller ve service oluşturuldu  
✅ User management controller ve service oluşturuldu  
✅ Review ve user validators eklendi  
✅ Status tracking service ve controller oluşturuldu  
✅ Workflow management sistemi oluşturuldu  
✅ Dashboard ve analytics service oluşturuldu  
✅ Status ve dashboard routes oluşturuldu  

### 4. Next Tasks (Priority Order):
🚨 **PHASE 2 - URGENT (Frontend Integration):**
1. Register auth routes in main server (backend/src/index.ts)
2. Register user management routes 
3. Register submission routes
4. Register review routes
5. Test all API endpoints with frontend
6. Create public article browsing APIs
7. Implement search/filter functionality
8. Add user profile management endpoints

🔄 **PHASE 3 - Remaining:**
- Version control system for manuscripts
- Advanced email templates

🔄 **PHASE 4 - Future:**
- Publication workflow
- DOI integration
- Advanced analytics
- Multi-journal support  

### 5. Phase 1: Core Features (2-3 weeks)
[X] - User authentication & authorization
[X] - Basic submission management
[X] - File upload system
[X] - Email notifications

**Priority Features:**
[X] - Kullanıcı kayıt/giriş sistemi
[X] - Rol tabanlı erişim kontrolü
[X] - Makale gönderme formu
[X] - Dosya yükleme (PDF)
[X] - Temel email bildirimleri

**Technical Tasks:**
[X] - JWT authentication setup
[X] - Prisma database schema
[X] - File upload middleware
[X] - Basic email service
[X] - Role-based route protection

### 6. Phase 2: Frontend Integration & API Completion (2-3 hafta)
**🚨 CRITICAL: Backend-Frontend Connection**

[ ] - **Route Registration** (URGENT - Routes exist but not registered)
[ ] - **Frontend Authentication Integration**
[ ] - **User Profile Management APIs**
[ ] - **Public Article Browsing APIs**
[ ] - **Search & Filtering APIs**

**Öncelikli Özellikler:**
[ ] - Frontend login/logout functionality
[ ] - User profile update/management
[ ] - Public article browsing (no auth required)
[ ] - Search and filtering system
[ ] - File download endpoints
[ ] - User dashboard API integration

**Teknik Görevler:**
[ ] - Register auth routes in main server (auth.ts → index.ts)
[ ] - Register user management routes (userRoutes.ts → index.ts)
[ ] - Register submission routes (submissions.ts → index.ts)
[ ] - Register review routes (reviewRoutes.ts → index.ts)
[ ] - Create public API endpoints (no authentication)
[ ] - Implement search/filter APIs
[ ] - Add user profile update endpoints
[ ] - Add password change functionality
[ ] - Create file download/preview endpoints

### 7. Phase 3: Advanced Features & Workflow Management (3-4 hafta)
[X] - Review assignment
[X] - Review submission
[X] - Decision management
[X] - Revision handling
        [X] - **Non-linear workflow engine**
        [X] - **Status tracking system**

**Öncelikli Özellikler:**
[X] - Editör paneli
[X] - Hakem atama sistemi
[X] - Review formu
[X] - Karar verme sistemi
[X] - Revizyon yönetimi
        [X] - **Süreç takip ekranı (Status Dashboard)**
        [ ] - **Versiyon yönetimi**
        [X] - **Döngülü review sistemi**

**Teknik Görevler:**
[X] - Review workflow engine (state machine)
[X] - Assignment algorithms
[X] - Decision tracking
[X] - Revision history
[ ] - Advanced email templates
        [X] - **Status tracking & notifications**
        [ ] - **Version control system**
        [X] - **Workflow state management**

### 8. Phase 4: Publication & Advanced Features (3-4 hafta)
[ ] - Article publishing workflow
[ ] - DOI assignment integration
[ ] - Advanced search functionality
[ ] - Analytics and reporting
[ ] - Public API for external integrations

**Öncelikli Özellikler:**
[ ] - Makale yayınlama sistemi
[ ] - DOI atama ve CrossRef entegrasyonu
[ ] - Gelişmiş arama ve filtreleme
[ ] - Detaylı analitik raporlar
[ ] - Harici entegrasyonlar için Public API
[ ] - ORCID entegrasyonu
[ ] - Multi-journal support

**Teknik Görevler:**
[ ] - Publication workflow automation
[ ] - DOI registration with CrossRef
[ ] - Advanced search indexing (ElasticSearch)
[ ] - Analytics dashboard with charts
[ ] - REST API for external systems
[ ] - ORCID authentication integration
[ ] - Multi-tenant architecture for multiple journals
[ ] - Advanced email template system
[ ] - Automated backup and archiving
[ ] - Performance optimization

## 3. Proposed Tech Stack

### 1. Frontend Stack
├── Runtime: Node.js (v18+)  // Required for Next.js build & dev
├── Framework: Next.js
├── Language: TypeScript
├── Styling: Tailwind CSS + Headless UI / Radix UI
├── API Communication: Axios or Fetch API
├── State Management: React Query (preferred) / Redux Toolkit
├── Authentication: NextAuth.js (integrated with Django API + ORCID)

### 2. Backend Stack
├── Runtime: Python (3.12+)
├── Framework: Django + Django REST Framework (DRF)
├── Language: Python
├── Database: PostgreSQL
├── ORM: Django ORM
├── Authentication: JWT (djangorestframework-simplejwt) + ORCID via django-allauth
├── File Storage:
│     ├── Local storage on VPS (primary)
│     └── Google Drive API (daily backups)
├── Email: Django Email Backend (SMTP / SendGrid / Gmail)
├── Task Queue: Celery + Redis (for background jobs like sending notifications)

### 3. Infrastructure and Deployment Stack
├── Containerization: Docker
├── Orchestration: Optional Kubernetes (only if scaling needed)
├── Hosting:
│     ├── VPS (Hetzner, Contabo, or DigitalOcean) for Backend + PostgreSQL
│     └── Render (Free tier for Next.js frontend)
├── Backup: Automated Google Drive upload script
├── Version Control: GitHub (with GitHub Actions CI/CD)

### 4. Additional Services
├── PDF Processing: PyMuPDF (fitz) or pdfplumber  // For extracting & processing manuscript content
├── Search: PostgreSQL Full-Text Search (pg_trgm) + Optional Elasticsearch for advanced indexing
├── Caching: Redis  // Used by Django + Celery for caching queries & background jobs
├── Monitoring & Logging:
│     ├── Django: Sentry (error tracking), Python logging module
│     └── Next.js: Sentry SDK, browser console monitoring
└── API Documentation: drf-spectacular (Swagger/OpenAPI for Django REST Framework)

## 4. Backend Folder Structure

backend/
│
├── core/                        # Core
│   ├── admin.py
│   ├── constants.py             # Global constants
│   ├── urls.py
│   ├── middleware/              # Logging, authentication, role enforcement, caching
│   │   └── __init__.py
│   ├── exceptions/              # Custom exceptions for workflow & API errors
│   │   └── __init__.py
│   ├── utils/                   # Shared helpers (file handling, validation, email, deadlines)
│   │   ├── __init__.py
│   │   └── utils.py
│   ├── settings/                # Django settings, environment configs
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── base.py
│   │   ├── dev.py
│   │   ├── prod.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── base_models/             # (empty placeholder for base abstract models)
│   └── validators/              # (empty placeholder)
│
├── apps/
│   ├── configuration/           # Configurable settings (journals, fees, workflows)
│   │   ├── apps.py
│   │   ├── handlers.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── services.py
│   │   └── views.py
│   │
│   ├── files/                   # File management & attachments
│   │   ├── __init__.py
│   │   ├── apps.py
│   │   ├── models.py            # File, FileCategory, ManuscriptFile
│   │   └── urls.py
│   │
│   ├── manuscripts/             # Paper submission & workflow
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── handlers.py          # Event-driven actions (notify reviewer, editor)
│   │   ├── models.py            # Manuscript, version, deadlines
│   │   ├── repositories.py      # Optional complex DB queries
│   │   ├── serializers.py
│   │   ├── services.py          # Business logic (deadline checks, versioning)
│   │   ├── types.py             # Manuscript statuses, workflow states
│   │   ├── urls.py
│   │   ├── views.py             # Controllers (submit, update, get status)
│   │   └── workflows.py         # Defines workflow helpers
│   │
│   ├── notifications/           # System notifications
│   │   ├── __init__.py
│   │   ├── apps.py
│   │   ├── handlers.py          # Trigger notifications from events
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── services.py          # Send email, push, or in-app notifications
│   │   └── views.py
│   │
│   ├── payments/                # Payment system
│   │   ├── __init__.py
│   │   ├── apps.py
│   │   ├── handlers.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── services.py
│   │   └── views.py
│   │
│   ├── publishing/              # Editor & publisher tasks
│   │   ├── __init__.py
│   │   ├── apps.py
│   │   ├── handlers.py
│   │   ├── models.py            # Publication records, final formats
│   │   ├── serializers.py
│   │   ├── services.py
│   │   ├── types.py             # Publication states, formats
│   │   └── views.py
│   │
│   ├── reviews/                 # Peer review system
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── handlers.py          # Notify author, update manuscript status
│   │   ├── models.py            # Review, reviewer assignments
│   │   ├── serializers.py
│   │   ├── services.py
│   │   ├── types.py             # Review statuses
│   │   ├── urls.py
│   │   └── views.py
│   │
│   ├── security/                # Security & system auditing
│   │   ├── __init__.py
│   │   ├── apps.py
│   │   └── models.py            # AuditLog, SecurityEvent, Tokens, Settings (planned)
│   │
│   ├── users/                   # User management & authentication
│   │   ├── models.py            # User, roles, permissions
│   │   ├── serializers.py
│   │   ├── views.py             # Controllers (HTTP endpoints)
│   │   ├── services.py          # Business logic (create user, assign roles)
│   │   ├── handlers.py          # Event handlers (e.g., on new user registration)
│   │   ├── repositories.py      # Optional complex queries (e.g., role lookups)
│   │   ├── types.py             # Enums: roles, statuses
│   │   ├── permissions.py       # DRF permissions based on roles
│   │   ├── urls.py
│   │   └── views.py
│   │
│   ├── workflow/                # Workflow configuration/state machine
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py            # WorkflowState, WorkflowTransition
│   │   └── urls.py
│   │
│   ├── files/                   # File management & attachments
│   │   ├── models.py            # File, FileCategory, ManuscriptFile
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── services.py          # File storage helpers, validators
│   │   └── handlers.py          # Event-driven file hooks
│   │
│   ├── security/                # Security & system auditing
│   │   ├── models.py            # AuditLog, SecurityEvent, Tokens, Settings
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── services.py          # Audit writing, token mgmt
│   │   └── handlers.py          # Security event hooks
│   │
│   ├── workflow/                # Workflow configuration/state machine
│   │   ├── models.py            # WorkflowState, WorkflowTransition
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── services.py          # Transition guards, rules
│   │   └── handlers.py          # Workflow event hooks
│
├── uploads/                      # Stored files
│   ├── manuscripts/              # PDF, DOCX, TeX versions
│   ├── cover_letters/            # PDF, DOCX
│   ├── reviews/                  # Reviewer reports & annotated manuscripts
│   ├── guidelines/               # Author & reviewer instructions
│   ├── templates/                # DOCX, TeX templates
│   └── payments/                 # Payment receipts, invoices
│
├── scripts/                      # Cron jobs, backups, PDF processing
│
└── tests/                        # Unit, integration, and workflow tests


## 5. Workflow Management:

[ Draft ]  <-- Author edits until submission deadline
    |
    | Submit Manuscript
    v
[ Submitted ]  -- System locks editing, notifies Editor-in-Chief / Section Editor
    |
    | Initial Editor Check (Editor-in-Chief / Section Editor)
    |---> Reject Manuscript -----------------> [ Rejected ] (End)
    |---> Minor Revision Requested -----------> [ Draft ] (Author revises)
    |---> Assign to Reviewers ----------------> [ Assigned to Reviewers ]

[ Assigned to Reviewers ]  -- Editor assigns reviewers
    |
    v
[ Peer Review ]  -- Reviewer(s) evaluate manuscript
    |---> Accept -----------------------------> [ Final Editor Decision ]
    |---> Minor Revision Requested -----------> [ Author Revision ]
    |---> Major Revision Requested -----------> [ Author Revision ]

[ Author Revision ]  -- Author revises manuscript, deadline enforced
    |
    | Submit Revision
    v
[ Re-review ]  -- Reviewer(s) re-evaluate revised manuscript
    |---> Accept -----------------------------> [ Final Editor Decision ]
    |---> Minor Revision Requested -----------> [ Author Revision ]
    |---> Major Revision Requested -----------> [ Author Revision ]
    |---> Loop N times until max revisions

[ Final Editor Decision ]  -- Editor-in-Chief / Section Editor
    |---> Accept -----------------------------> [ Copyediting / Proofreading ]
    |---> Minor Revision Requested -----------> [ Author Revision ]
    |---> Reject -----------------------------> [ Rejected ]

[ Copyediting / Proofreading ]  -- Copyeditor / Proofreader
    |
    v
[ Production ]  -- Production Editor finalizes formats (PDF/HTML/XML), assigns DOI
    |
    v
[ Published ]  -- Manuscript publicly available, notifications to readers

### 1. Manuscript Submission Workflow:

// Event-driven workflow (Non-Linear)
submission.created → 
  notifications.email_to_author → 
  editor_in_chief.assigned_section_editor → 
  section_editor.assign_reviewers → 
  review.requested → 
  review.completed → 
  editor_in_chief.evaluate_all_reviews → 
  [revision.requested] || [final.decision] → 
  if(final.decision == "accept") → publishing.workflow.start

Notes:
-editor_in_chief.evaluate_all_reviews is mandatory before final decision.
-Event triggers are handled in notifications and core apps.
-If accepted, publishing includes DOI assignment and final file preparation.

### 2. Review Process (Cyclic):

review.assigned → 
  reviewer.notified → 
  review.submitted → 
  editor.notified → 
  [revision.requested] → 
  author.notified → 
  author.revision.submitted → 
  [re.review.assigned] || 
  [decision.updated]

Notes:
Even if all reviewers agree, Editor-in-Chief makes the final call.
Revision requests trigger the revision cycle.

### 3. Revision Cycle (Looping until final decision)

revision.requested → 
  author.notified → 
  author.revision.submitted → 
  section_editor.review_revisions → 
  editor_in_chief.confirm → 
  [re.review.assigned] || [final.decision]

Notes:
-Multiple revision loops allowed.
-Section Editor can recommend, but Editor-in-Chief confirms.

### 4. Publishing Workflow (Post-Acceptance):

final.decision.accept → 
  production_editor.prepare_final_files → 
  payments.verify_invoice → 
  publishing.assign_DOI → 
  publishing.publish_article → 
  notifications.publication_notice

Notes:
-Payments verification is optional (depends on journal policy).
-DOI assignment handled in publishing app.

## 6. Role-Based Access Control:

Visitor / Reader — Browse and read published articles.
Author — Submit manuscripts, upload revisions, cover letters, supplementary materials, track review status.
Reviewer — Review assigned manuscripts, submit feedback, annotated manuscripts, and optional revision instructions.
Editor-in-Chief — Oversee all submissions, review reviewers’ decisions, make final acceptance/rejection decisions.
Section Editor — Assign reviewers, recommend decisions to Editor-in-Chief.
Managing Editor — Oversee editorial workflow, ensure deadlines and guidelines are followed.
Guest Editor — Manage special issues or themed sections.
Copyeditor / Proofreader — Edit accepted manuscripts, ensure formatting and language standards.
Production Editor — Prepare publication-ready files (PDF, EPUB), manage final formatting.
Administrator — Manage users, roles, permissions, workflow configuration.
Technical Admin — Handle infrastructure, backups, security, server settings.
Finance / Payment Manager (new, if you integrate payments) — Manage invoices, payment confirmations, subscription records.

## 7. File Management:

### 1. Manuscripts & Drafts
Purpose,File Types,Notes
Author submits manuscript,.pdf;.docx;.tex,PDF is standard; docx/tex if allowed for formatting convenience
Author revisions,.pdf;.docx,Versioning important, each revision stored
Supplementary material,.zip;.csv;.xlsx;.pdf,Optional, e.g., data sets, charts

### 2. Cover Letters
Purpose,File Types,Notes
Author submits cover letter,.pdf;.docx,Usually short letter explaining manuscript importance
Editor or journal comments,.pdf,Optional, if editors annotate letter


### 3. Peer Review Documents
Purpose,File Types,Notes
Reviewer reports,.pdf;.docx,Reviewers submit comments and recommendations
Annotated manuscripts,.pdf,Reviewer can highlight changes/comments directly in PDF
Revision instructions,.pdf,Optional, if reviewer sends a separate instruction file

### 4. Guidelines & Templates
Purpose,File Types,Notes
Author guidelines,.pdf;.docx,Standard formatting and submission rules
Reviewer guidelines,.pdf,Instructions for reviewing manuscripts
Templates,.docx;.tex,Optional, authors can download pre-formatted templates

### 5. Administrative & Publishing
Purpose,File Types,Notes
Publication-ready files,.pdf;.epub,Final published version
Invoices / Payments,.pdf,For payment tracking (if you integrate payment system)
License agreements,.pdf,Copyright or publishing license forms

### 6. Summary:

Manuscripts: .pdf, .docx, .tex
Revisions: .pdf, .docx
Supplementary: .zip, .csv, .xlsx, .pdf
Cover letters: .pdf, .docx
Reviewer reports: .pdf, .docx
Annotated manuscripts: .pdf
Revision instructions: .pdf
Guidelines: .pdf, .docx
Templates: .docx, .tex
Publication-ready files: .pdf, .epub
Invoices / license agreements: .pdf

- Must use unique filenames or UUIDs to prevent collisions.
- Must store metadata in database (uploader, upload date, file type, version, related manuscript/review).
- Each file should have versioning if needed.
- Optional files flagged in DB.
- Storage structure must support easy retrieval by type and user.
- Max size, storage (local vs S3 / cloud), naming conventions.
- Access control per role for each folder.

## 8. Manuscript States

DRAFT – Author is creating/editing before submission.
SUBMITTED – Locked for editing, sent for initial editorial compliance check.
WITH_SECTION_EDITOR - Section Editor checks compliance with guidelines, completeness, scope match and decides whether to send for peer review.
UNDER_PEER_REVIEW – Reviewers evaluating manuscript.
MINOR_REVISION_REQUESTED – Small changes requested by reviewers/editors.
MAJOR_REVISION_REQUESTED – Substantial changes requested.
REVISION_SUBMITTED – Author has submitted the revised manuscript.
RE_REVIEW_ASSIGNED – Reviewers re-check the revised manuscript (can loop multiple times).
WITH_EDITOR_IN_CHIEF – Editor-in-Chief makes final decision: Accept, Reject, or Request further revision.
ACCEPTED – Manuscript approved for publishing.
COPYEDITING – Grammar/style/formatting improvements by copyeditor.
PRODUCTION – Final formats prepared (PDF/HTML/XML), DOI assigned.
PUBLISHED – Publicly available.
REJECTED – Workflow ends; manuscript not accepted.
ARCHIVED – Stored for record; not active.
ON_HOLD – Temporarily paused due to issues (e.g., payment, ethics).
WITHDRAWN – Author retracts manuscript.


## 9. Security Considerations

### 1. Authentication and Authorization

JWT Token Rotation:

Password Security:
-Use strong hashing algorithms (PBKDF2, Argon2).
-Use Django’s built-in make_password and check_password.

Role-Based Access Control (RBAC):
-Map every user role (Author, Reviewer, Editor-in-Chief, etc.) to a set of permissions.
-Avoid hardcoding permissions per endpoint; use Django’s @permission_classes or django-guardian for object-level access.

### 2. Input & Output Validation

File Upload Validation:
-Only allow specific MIME types: .pdf, .docx, .tex, .zip, .csv, .xlsx.
-Limit file size to prevent DoS attacks.
-Scan files for malware (optional, can integrate antivirus).
-Rename files to avoid path injection attacks.

Data Validation:
-Validate all input (titles, abstracts, comments) to prevent XSS.
-Use serializers (DRF) or Django forms with strict validation.
-Output Escaping:
-Always escape user-generated content when rendering to HTML (prevent XSS).

### 3. Network Security

CORS:
-Only allow frontend origins you control.
-Django: django-cors-headers.

CSRF Protection:
-Enabled by default in Django for forms.
-Use CSRF tokens for API requests if not using JWT.

HTTPS Everywhere:
-Enforce TLS (HTTPS) for all communication.
-HSTS headers recommended.

Rate Limiting:
-Prevent brute force attacks on login and endpoints.
-Django: django-ratelimit or DRF throttling.

API Security:
-Secure sensitive endpoints (payment, publishing) with additional authentication.
-Consider IP whitelisting for admin endpoints.

### 4. Logging & Monitoring

Audit Logging:
-Log critical actions (submission, review decisions, publishing, login attempts).
-Include user ID, timestamp, and IP.
-Ensure logs are tamper-proof (append-only or write to external service).

Error Logging:
-Capture exceptions in Sentry or similar monitoring tools.
-Do not leak sensitive info in error messages.

### 5. Sensitive Data Protection

Passwords:
-Never store in plain text, always hash.

Payment Information:
-Do not store full credit card numbers; integrate with PCI-compliant payment processors (Stripe, PayPal).
-Encrypt sensitive fields in DB using field-level encryption.

Environment Variables: Keep secrets (JWT secret keys, DB passwords) in environment variables or secret manager, not in code.

### 6. File & System Security

-Save uploaded files in safe directories; do not trust filenames from users.
-Remove temporary files and old revisions if not needed to reduce attack surface.
-Content Security Policy (CSP): Protect frontend from malicious scripts injection (if rendering HTML content).

### 7. Backup & Disaster Recovery

Database Backups:
Encrypt and store offsite.
Test restore procedures periodically.

File Backups: Backup uploaded manuscripts, supplementary files, templates.

### 8. Optional Advanced Protections (Implement Later)

Two-Factor Authentication (2FA):
Recommended for editors, admins.

Session Management:
Invalidate all sessions if password changes.
Limit concurrent logins if needed.

Security Headers:
HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy.

## 10. Database & Migrations

### 1. Steps Before Designing the DB
Before touching diagrams, you should:

1.Identify core entities → Manuscript, User, Review, Role, Permissions, Comments, Files, Issues/Volumes, etc.
2.Define relationships → Who owns what, who can edit what, many-to-many links (e.g., manuscripts can have multiple authors).
3.Plan for RBAC → Permissions will be in DB, not hardcoded.
4.Think about states → Manuscripts have workflow states (Draft, Submitted, Under Review, etc.).
5.Decide on soft-delete vs hard-delete → Important for audit trails.
6.Plan audit logging → Keep history of status changes, reviewer comments, etc.
7.Consider file storage strategy → Database should store only file metadata, not the actual file (unless very small).

### 2. Recommended DB Design

#### 1. User & Role Management

Table Name	Purpose
users   Core user accounts (authors, reviewers, editors, admins).
roles	Defines system roles (Author, Reviewer, Editor-in-Chief, etc.).
permissions	List of all available permissions in the system.
role_permissions	Many-to-many table mapping roles to permissions.
user_roles	Many-to-many table mapping users to roles.
user_profiles	Extended user info (affiliation, bio, ORCID, etc.).
audit_logs	Tracks all user actions for accountability.

#### 2. Manuscript Workflow

Table Name	Purpose
manuscripts (legacy submissions)	Stores all manuscript submissions with metadata.
manuscript_versions (legacy submission_versions)	Stores each uploaded version of a manuscript.
manuscript_status_history (legacy submission_status_history)	Tracks changes in manuscript states over time.
review_rounds	Tracks each review round for a manuscript.
workflow_states	Defines all allowed states in the workflow.
workflow_transitions	Defines allowed moves between states.
review_assignments	Links reviewers to specific manuscripts/review rounds.
reviews	Stores reviewer feedback & recommendations.
editor_assignments	Links manuscripts to assigned editors (section or chief).
decisions	Records editorial decisions (Accept, Reject, Revise).

#### 3. Files & Attachments

Table Name	Purpose
files	Stores uploaded files with metadata (path, type, size).
file_categories	Categorizes files (Manuscript, Supplementary, Cover Letter, etc.).
manuscript_files	Links files to specific manuscripts and versions.

#### 4. Publishing & Metadata

Table Name	Purpose
published_articles (legacy articles)	Final published works with DOI, issue info.
issues	Journal issue/volume tracking.
doi_requests	Tracks DOI assignments.
license_agreements	Stores publishing licenses.
templates	Stores formatting templates for authors/reviewers.
guidelines	Stores author/reviewer/editor guidelines.

#### 5. Payments (Optional)

Table Name	Purpose
invoices	Stores invoice details for APCs (Article Processing Charges).
payments	Stores payment transactions.

#### 6. Security & System

Table Name	Purpose
api_tokens	Stores API keys for integrations.
token_blacklist	Tracks invalidated JWT refresh tokens.
security_events	Stores login attempts, rate limit triggers, suspicious actions.
system_settings	Stores system-wide configuration (CORS, limits, etc.).
backup_logs	Logs of database backups.

### 3. ERD Diagram

[users] 
    ├─< user_roles >─┐
    │                │
[roles]         [permissions]
    │                │
    └─< role_permissions >─┘

[users] 1--1 [user_profiles]

[manuscripts] 1--* [manuscript_versions]
[manuscripts] 1--* [manuscript_status_history]
[manuscripts] 1--* [review_rounds]
[manuscripts] 1--* [manuscript_files]
[manuscripts] 1--* [editor_assignments]
[manuscripts] 1--* [decisions]
[manuscripts] 1--* [published_articles]

[review_rounds] 1--* [review_assignments]
[review_assignments] 1--1 [reviews]

[workflow_states] 1--* [workflow_transitions] (self-referential from_state -> to_state)

[files] 1--* [manuscript_files]
[file_categories] 1--* [files]

[issues] 1--* [published_articles]
[doi_requests] 1--1 [published_articles]
[license_agreements] 1--* [published_articles]

[invoices] 1--* [payments]

[users] 1--* [audit_logs]
[users] 1--* [security_events]

[system_settings] (singleton table)
[backup_logs] (system events)
[api_tokens]
[token_blacklist]

### 4. Django Models (Codes)

--------------------
#### 1. User & Roles
--------------------
class User(AbstractUser):
    pass

class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)

class Permission(models.Model):
    code = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)

class RolePermission(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE)

class UserRole(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    affiliation = models.CharField(max_length=255, blank=True)
    orcid = models.CharField(max_length=19, blank=True)
    bio = models.TextField(blank=True)


--------------------
#### 2. Workflow & Manuscripts
--------------------
class WorkflowState(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)

class WorkflowTransition(models.Model):
    from_state = models.ForeignKey(WorkflowState, related_name='from_transitions', on_delete=models.CASCADE)
    to_state = models.ForeignKey(WorkflowState, related_name='to_transitions', on_delete=models.CASCADE)

class Manuscript(models.Model):
    title = models.CharField(max_length=255)
    abstract = models.TextField()
    corresponding_author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='corresponding_manuscripts')
    current_state = models.ForeignKey(WorkflowState, on_delete=models.SET_NULL, null=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

class ManuscriptVersion(models.Model):
    manuscript = models.ForeignKey(Manuscript, on_delete=models.CASCADE)
    version_number = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

class ManuscriptStatusHistory(models.Model):
    manuscript = models.ForeignKey(Manuscript, on_delete=models.CASCADE)
    state = models.ForeignKey(WorkflowState, on_delete=models.CASCADE)
    changed_at = models.DateTimeField(auto_now_add=True)
    changed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

class ReviewRound(models.Model):
    manuscript = models.ForeignKey(Manuscript, on_delete=models.CASCADE)
    round_number = models.PositiveIntegerField()
    started_at = models.DateTimeField(auto_now_add=True)

class ReviewAssignment(models.Model):
    review_round = models.ForeignKey(ReviewRound, on_delete=models.CASCADE)
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE)

class Review(models.Model):
    assignment = models.OneToOneField(ReviewAssignment, on_delete=models.CASCADE)
    recommendation = models.CharField(max_length=50)  # Accept, Reject, Minor Revision
    comments = models.TextField()

class EditorAssignment(models.Model):
    manuscript = models.ForeignKey(Manuscript, on_delete=models.CASCADE)
    editor = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=50)  # Section Editor, Editor-in-Chief

class Decision(models.Model):
    manuscript = models.ForeignKey(Manuscript, on_delete=models.CASCADE)
    decision = models.CharField(max_length=50)  # Accept, Reject, etc.
    decided_by = models.ForeignKey(User, on_delete=models.CASCADE)
    decided_at = models.DateTimeField(auto_now_add=True)

--------------------
#### 3. Files & Attachments
--------------------
class FileCategory(models.Model):
    name = models.CharField(max_length=50)

class File(models.Model):
    file = models.FileField(upload_to='uploads/')
    category = models.ForeignKey(FileCategory, on_delete=models.SET_NULL, null=True)
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    uploaded_at = models.DateTimeField(auto_now_add=True)

class ManuscriptFile(models.Model):
    manuscript = models.ForeignKey(Manuscript, on_delete=models.CASCADE)
    file = models.ForeignKey(File, on_delete=models.CASCADE)
    version = models.ForeignKey(ManuscriptVersion, on_delete=models.CASCADE, null=True, blank=True)

--------------------
#### 4.  Publishing
--------------------
class Issue(models.Model):
    volume = models.IntegerField()
    number = models.IntegerField()
    year = models.IntegerField()

class PublishedArticle(models.Model):
    manuscript = models.OneToOneField(Manuscript, on_delete=models.CASCADE)
    issue = models.ForeignKey(Issue, on_delete=models.SET_NULL, null=True)
    doi = models.CharField(max_length=255, blank=True)

class DOIRequest(models.Model):
    article = models.OneToOneField(PublishedArticle, on_delete=models.CASCADE)
    requested_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50)

class LicenseAgreement(models.Model):
    article = models.ForeignKey(PublishedArticle, on_delete=models.CASCADE)
    signed_at = models.DateTimeField(auto_now_add=True)

--------------------
#### 5. Payments & Billing
--------------------
class Invoice(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default="USD")
    status = models.CharField(max_length=50)  # Paid, Pending, Cancelled
    issued_at = models.DateTimeField(auto_now_add=True)

class Payment(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=50)
    transaction_id = models.CharField(max_length=255, blank=True)
    paid_at = models.DateTimeField(auto_now_add=True)

--------------------
#### 6. Security & System
--------------------
class AuditLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    action = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)

class SecurityEvent(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    event_type = models.CharField(max_length=255)
    ip_address = models.GenericIPAddressField()
    timestamp = models.DateTimeField(auto_now_add=True)

class APIToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

class TokenBlacklist(models.Model):
    token = models.CharField(max_length=255, unique=True)
    blacklisted_at = models.DateTimeField(auto_now_add=True)

class SystemSetting(models.Model):
    key = models.CharField(max_length=100, unique=True)
    value = models.TextField()

class BackupLog(models.Model):
    backup_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50)
    notes = models.TextField(blank=True)


### 5. Security Best Practices for Database

1.Use PostgreSQL (better JSON support & constraints than MySQL).
2.Always use UUIDs instead of auto-increment IDs for public-facing entities (prevents guessing).
3.Store only file metadata, actual files go to S3, MinIO, or Django FileField storage.
4.Use ENUM types for states to avoid typos.
5.Enable row-level security for sensitive data.
6.Create read replicas for analytics to keep main DB secure.
7.Backup DB daily, encrypt backups.


## 11. Configuration
## 12. Notifications
## 13. Error Handling & Logging
## 14. Testing
## 15. API Versioning & Documentation
## 16. Payments
## Optional


## 💡 Özel Öneriler

### 1. Database Design:

-- Workflow State Machine (Configurable)
workflow_states:
- id (primary key)
- name (unique identifier)
- display_name (user-friendly name)
- description
- color (for UI)
- icon (for UI)
- is_active (can be disabled)
- created_at
- updated_at

-- Default States (can be extended)
DRAFT – Author is creating/editing before submission.
SUBMITTED – Locked for editing, sent for initial editorial compliance check.
WITH_SECTION_EDITOR - Section Editor checks compliance with guidelines, completeness, scope match and decides whether to send for peer review.
UNDER_PEER_REVIEW – Reviewers evaluating manuscript.
MINOR_REVISION_REQUESTED – Small changes requested by reviewers/editors.
MAJOR_REVISION_REQUESTED – Substantial changes requested.
REVISION_SUBMITTED – Author has submitted the revised manuscript.
RE_REVIEW_ASSIGNED – Reviewers re-check the revised manuscript (can loop multiple times).
WITH_EDITOR_IN_CHIEF – Editor-in-Chief makes final decision: Accept, Reject, or Request further revision.
ACCEPTED – Manuscript approved for publishing.
COPYEDITING – Grammar/style/formatting improvements by copyeditor.
PRODUCTION – Final formats prepared (PDF/HTML/XML), DOI assigned.
PUBLISHED – Publicly available.
REJECTED – Workflow ends; manuscript not accepted.
ARCHIVED – Stored for record; not active.
ON_HOLD – Temporarily paused due to issues (e.g., payment, ethics).
WITHDRAWN – Author retracts manuscript.

-- Status Tracking (Extensible)
submission_status_history:
- id (primary key)
- submission_id
- from_status
- to_status
- changed_by
- changed_at
- comments
- notification_sent
- metadata (JSON for additional data)
- workflow_step (for complex workflows)
- estimated_completion_date
- actual_completion_date

-- Workflow Transitions (Configurable)
workflow_transitions:
- id (primary key)
- from_state_id
- to_state_id
- required_roles (JSON array)
- required_permissions (JSON array)
- conditions (JSON for business rules)
- auto_assign_roles (JSON array)
- notification_templates (JSON array)
- is_active
- created_at
- updated_at
```

### 2. File Management:
```typescript
// Dosya organizasyonu (Version Control)
uploads/
├── submissions/
│   ├── {submissionId}/
│   │   ├── versions/
│   │   │   ├── v1/
│   │   │   │   ├── manuscript.pdf
│   │   │   │   ├── cover-letter.pdf
│   │   │   │   └── supplementary/
│   │   │   ├── v2/
│   │   │   └── v3/
│   │   ├── reviews/
│   │   │   ├── round1/
│   │   │   ├── round2/
│   │   │   └── round3/
│   │   └── revisions/
│   │       ├── revision1/
│   │       └── revision2/
├── reviews/
│   └── {reviewId}/
└── articles/
    └── {articleId}/
```



### 4. Status Tracking & Dashboard:
```typescript
// Status Dashboard Özellikleri
- Real-time status updates
- Timeline view (submission history)
- Version comparison
- Review progress tracking
- Notification center
- Export status reports
- Filter by status, date, user
- Bulk status updates
```

### 5. Extensibility & Configuration:
```typescript
// Workflow Configuration
- Dynamic workflow states (admin can add/remove)
- Configurable state transitions
- Custom business rules per transition
- Role-based transition permissions
- Conditional workflow paths

// Dashboard Extensibility
- Plugin-based widget system
- Custom dashboard layouts
- Dynamic widget configuration
- User-defined dashboard templates
- Drag-and-drop dashboard builder

// Analytics Extensibility
- Custom metric definitions
- Configurable performance indicators
- Predictive model integration
- Custom report generators
- Multi-dimensional analytics
```

## 🔐 Güvenlik Önlemleri

### Authentication & Authorization:
- JWT token tabanlı kimlik doğrulama
- Refresh token mekanizması
- Role-based access control (RBAC)
- Permission-based authorization

### File Security:
- Dosya türü validasyonu
- Virus tarama
- Dosya boyutu limitleri
- Güvenli dosya yolları

### API Security:
- Rate limiting
- Input validation
- SQL injection koruması
- XSS koruması
- CORS konfigürasyonu

## 📊 Monitoring & Logging

### Application Monitoring:
- Winston logger
- Error tracking (Sentry)
- Performance monitoring
- Health checks

### Business Metrics:
- Makale gönderim sayıları
- Review süreleri
- Kullanıcı aktiviteleri
- Sistem performansı

## 📈 Status Tracking & Dashboard

### Status Dashboard Özellikleri (Extensible):
- **Real-time Updates**: WebSocket ile anlık durum güncellemeleri
- **Timeline View**: Makale sürecinin tam geçmişi
- **Version Comparison**: Farklı versiyonlar arası karşılaştırma
- **Review Progress**: Hakemlik sürecinin ilerleme durumu
- **Notification Center**: Tüm bildirimlerin merkezi yönetimi
- **Export Reports**: Durum raporlarının dışa aktarımı
- **Advanced Filtering**: Durum, tarih, kullanıcı bazında filtreleme
- **Bulk Operations**: Toplu durum güncellemeleri
- **Custom Widgets**: Dinamik dashboard widget'ları
- **Workflow Designer**: Görsel workflow tasarım aracı
- **Status Templates**: Önceden tanımlanmış durum şablonları
- **Performance Metrics**: Süreç performans analizi
- **Predictive Analytics**: Tahminsel analiz araçları
- **Multi-language Support**: Çok dilli durum mesajları
- **Mobile Dashboard**: Mobil uyumlu dashboard

### Status Tracking API (Extensible):
```typescript
// Status endpoints
GET /api/status/submissions - Tüm makalelerin durumu
GET /api/status/submissions/:id - Belirli makalenin durumu
GET /api/status/submissions/:id/history - Durum geçmişi
GET /api/status/submissions/:id/timeline - Zaman çizelgesi
PUT /api/status/submissions/:id/status - Durum güncelleme
POST /api/status/submissions/:id/comment - Yorum ekleme

// Workflow Management API
GET /api/workflow/states - Tüm workflow durumları
POST /api/workflow/states - Yeni durum ekleme
PUT /api/workflow/states/:id - Durum güncelleme
DELETE /api/workflow/states/:id - Durum silme
GET /api/workflow/transitions - Durum geçişleri
POST /api/workflow/transitions - Yeni geçiş ekleme

// Dashboard Configuration API
GET /api/dashboard/widgets - Dashboard widget'ları
POST /api/dashboard/widgets - Yeni widget ekleme
PUT /api/dashboard/widgets/:id - Widget güncelleme
GET /api/dashboard/templates - Dashboard şablonları
POST /api/dashboard/templates - Yeni şablon ekleme

// Analytics API
GET /api/analytics/workflow-performance - Workflow performans analizi
GET /api/analytics/predictive-metrics - Tahminsel metrikler
GET /api/analytics/custom-reports - Özel raporlar
```

### Dashboard Components (Extensible):
```typescript
// Core Frontend components
- StatusDashboard.tsx - Ana durum paneli
- SubmissionTimeline.tsx - Zaman çizelgesi
- StatusFilter.tsx - Filtreleme bileşeni
- VersionComparison.tsx - Versiyon karşılaştırma
- NotificationCenter.tsx - Bildirim merkezi
- StatusExport.tsx - Rapor dışa aktarma

// Extensible Components
- WorkflowDesigner.tsx - Görsel workflow tasarım aracı
- CustomWidget.tsx - Dinamik widget bileşeni
- WidgetLibrary.tsx - Widget kütüphanesi
- DashboardBuilder.tsx - Dashboard oluşturma aracı
- AnalyticsChart.tsx - Analiz grafikleri
- PredictiveMetrics.tsx - Tahminsel metrikler
- MobileDashboard.tsx - Mobil dashboard
- MultiLanguageStatus.tsx - Çok dilli durum mesajları
```

## 🧪 Testing Strategy

### Unit Tests:
- Service layer testing
- Utility function testing
- Mock database operations

### Integration Tests:
- API endpoint testing
- Database integration
- File upload testing

### E2E Tests:
- Complete workflow testing
- User journey testing
- Cross-browser testing

## 📚 API Documentation

### Swagger/OpenAPI:
- Interactive API documentation
- Request/response examples
- Authentication documentation
- Error code documentation

### Postman Collections:
- Pre-configured API requests
- Environment variables
- Test scenarios

## 🚀 Deployment Strategy

### Development:
- Local PostgreSQL
- File storage (local)
- Hot reload

### Staging:
- Docker containers
- Staging database
- File storage (S3)

### Production:
- Load balancer
- Database clustering
- CDN for files
- Monitoring & alerting

## 📈 Scalability Considerations

### Database:
- Connection pooling
- Query optimization
- Indexing strategy
- Read replicas

### Application:
- Horizontal scaling
- Caching strategy
- Background jobs
- Microservices migration path

## 🔄 Maintenance Plan

### Regular Tasks:
- Database backups
- Log rotation
- Security updates
- Performance monitoring

### Emergency Procedures:
- Rollback procedures
- Data recovery
- Incident response
- Communication plan

---
