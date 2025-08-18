# Akademik Dergi Sistemi - Backend Geliştirme Fazları

## 📊 İlerleme Durumu

### Genel İlerleme: %65 Tamamlandı
- **Phase 1**: %100 tamamlandı (15/15 görev) ✅
- **Phase 2**: %0 tamamlandı (0/9 görev) 🚨 **URGENT - Frontend Integration**
- **Phase 3**: %85 tamamlandı (11/13 görev) ✅
- **Phase 4**: %0 tamamlandı (0/10 görev) 📋

### 🚨 **Critical Issue Identified:**
**Backend controllers and services are implemented but routes are NOT registered in the main server!**
- Auth routes exist but not accessible from frontend
- User management routes exist but not registered
- This explains why login doesn't work - the endpoints aren't available

### Tamamlanan Görevler:
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

### Sıradaki Görevler (Priority Order):
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

---

## 📋 Proje Özeti

Bu site akademik makalelerin yayınlanacağı, editörler tarafından inceleneceği, yazarlar tarafından yükleme yapılacağı ve belki düzenleme yapılacağı, adminler tarafından yayına alınacağı bir site. Kısaca özetledim ancak bu tarzda olacak ve tabi daha fazla şey olacak.

## 🏗️ Önerilen Mimari: Monolitik + Event-Driven Hybrid

Bu tür sistemler için en uygun yaklaşım:

```
backend/
├── src/
│   ├── controllers/     # HTTP endpoints
│   ├── services/        # Business logic
│   ├── events/          # Domain events
│   ├── handlers/        # Event handlers
│   ├── repositories/    # Data access
│   ├── middleware/      # Auth, validation
│   ├── utils/           # Helpers
│   └── types/           # TypeScript types
├── prisma/              # Database schema
├── tests/               # Unit & integration
└── docs/                # API documentation
```

## 🎯 Neden Bu Mimari?

### 1. Monolitik Avantajları:
- **Hızlı Geliştirme**: Akademik dergiler için kritik
- **Kolay Yönetim**: Tek codebase, tek deployment
- **Düşük Maliyet**: Başlangıç için ideal
- **Basit Debugging**: Tüm işlemler tek yerde

### 2. Event-Driven Eklenmesi:
- **Makale Durumu Değişiklikleri**: Draft → Submitted → Under Review → Accepted/Rejected
- **Bildirimler**: Email notifications
- **Audit Trail**: Tüm değişikliklerin kaydı
- **Asenkron İşlemler**: PDF processing, indexing

## 🎓 Akademik Dergi İçin Özel Gereksinimler

### 1. Workflow Management:
```
Makale Süreci (Non-Linear):
Draft → Submit → Editor Review → Peer Review → [Revision Request] → Author Revision → Re-Review → [Multiple Cycles] → Final Decision → Publish

Olası Döngüler:
- Peer Review → Revision Request → Author Revision → Re-Review (tekrar)
- Editor Review → Reject → Author Resubmit → Editor Review (tekrar)
- Final Decision → Minor Revisions → Author Revision → Final Approval
- Final Decision → Major Revisions → Author Revision → Peer Review (tekrar)
```

### 2. Role-Based Access Control:
```
Role-based Access Control:

Visitor / Reader — Browse and read published articles
Author — Submit and manage manuscripts, track review status
Reviewer — Review assigned manuscripts and submit feedback
Editor-in-Chief — Manage all submissions, assign editors/reviewers, make final decisions
Section Editor — Assign reviewers, recommend decisions
Managing Editor — Oversee editorial workflow
Guest Editor — Manage special issues
Copyeditor / Proofreader — Edit accepted manuscripts
Production Editor — Finalize publication formats (PDF/HTML/XML)
Administrator — Manage users, roles, and settings
Technical Admin — Infrastructure, backups, and security
```

### 3. File Management:
```
Dosya Türleri:
- PDF makaleler
- Cover letters
- Review reports
- Supplementary materials
```

## 🛠️ Önerilen Teknoloji Stack

### Core Stack:
```
// Frontend Stack
├── Runtime: Node.js (v18+)  // Required for Next.js build & dev
├── Framework: Next.js
├── Language: TypeScript
├── Styling: Tailwind CSS + Headless UI / Radix UI
├── API Communication: Axios or Fetch API
├── State Management: React Query (preferred) / Redux Toolkit
├── Authentication: NextAuth.js (integrated with Django API + ORCID)

// Backend Stack
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

// Infrastructure and Deployment Stack
├── Containerization: Docker
├── Orchestration: Optional Kubernetes (only if scaling needed)
├── Hosting:
│     ├── VPS (Hetzner, Contabo, or DigitalOcean) for Backend + PostgreSQL
│     └── Render (Free tier for Next.js frontend)
├── Backup: Automated Google Drive upload script
├── Version Control: GitHub (with GitHub Actions CI/CD)

// Additional Services
├── PDF Processing: PyMuPDF (fitz) or pdfplumber  // For extracting & processing manuscript content
├── Search: PostgreSQL Full-Text Search (pg_trgm) + Optional Elasticsearch for advanced indexing
├── Caching: Redis  // Used by Django + Celery for caching queries & background jobs
├── Monitoring & Logging:
│     ├── Django: Sentry (error tracking), Python logging module
│     └── Next.js: Sentry SDK, browser console monitoring
└── API Documentation: drf-spectacular (Swagger/OpenAPI for Django REST Framework)
```

## 📁 Detaylı Klasör Yapısı

```
backend/
├── src/
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── submissionController.ts
│   │   ├── reviewController.ts
│   │   ├── articleController.ts
│   │   ├── userController.ts
│   │   ├── statusController.ts
│   │   ├── workflowController.ts
│   │   ├── dashboardController.ts
│   │   └── analyticsController.ts
│   ├── services/
│   │   ├── authService.ts
│   │   ├── submissionService.ts
│   │   ├── reviewService.ts
│   │   ├── notificationService.ts
│   │   ├── fileService.ts
│   │   ├── workflowService.ts
│   │   ├── statusService.ts
│   │   ├── versionService.ts
│   │   ├── workflowEngineService.ts
│   │   ├── dashboardService.ts
│   │   ├── analyticsService.ts
│   │   └── widgetService.ts
│   ├── events/
│   │   ├── submissionEvents.ts
│   │   ├── reviewEvents.ts
│   │   ├── revisionEvents.ts
│   │   └── publicationEvents.ts
│   ├── handlers/
│   │   ├── emailHandlers.ts
│   │   ├── notificationHandlers.ts
│   │   ├── auditHandlers.ts
│   │   └── statusHandlers.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── roleCheck.ts
│   │   ├── fileUpload.ts
│   │   └── validation.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── submissions.ts
│   │   ├── reviews.ts
│   │   ├── articles.ts
│   │   ├── users.ts
│   │   ├── status.ts
│   │   ├── workflow.ts
│   │   ├── dashboard.ts
│   │   └── analytics.ts
│   ├── utils/
│   │   ├── pdfProcessor.ts
│   │   ├── emailTemplates.ts
│   │   ├── validators.ts
│   │   ├── workflowEngine.ts
│   │   ├── stateMachine.ts
│   │   ├── widgetRenderer.ts
│   │   └── analyticsProcessor.ts
│   └── types/
│       ├── submission.ts
│       ├── review.ts
│       ├── user.ts
│       ├── workflow.ts
│       ├── status.ts
│       ├── dashboard.ts
│       ├── widget.ts
│       └── analytics.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── uploads/
│   ├── submissions/
│   ├── reviews/
│   └── articles/
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/
```

## 🔄 Workflow Örnekleri

### 1. Makale Gönderme Süreci:
```typescript
// Event-driven workflow (Non-Linear)
submission.created → 
  email.notification → 
  editor.assigned → 
  review.requested → 
  review.completed → 
  [decision.analysis] → 
  [revision.requested] || [decision.made]
```

### 2. Review Süreci (Döngülü):
```typescript
review.assigned → 
  reviewer.notified → 
  review.submitted → 
  editor.notified → 
  [revision.requested] → 
  author.notified → 
  author.revision.submitted → 
  [re.review.assigned] || 
  [decision.updated]
```

### 3. Revision Döngüsü:
```typescript
revision.requested → 
  author.notified → 
  author.revision.submitted → 
  editor.review → 
  [re.review.assigned] || 
  [decision.final]
```

## 🚀 Başlangıç İçin Adımlar

### Phase 1: Core Features (2-3 hafta)
[X] - User authentication & authorization
[X] - Basic submission management
[X] - File upload system
[X] - Email notifications

**Öncelikli Özellikler:**
[X] - Kullanıcı kayıt/giriş sistemi
[X] - Rol tabanlı erişim kontrolü
[X] - Makale gönderme formu
[X] - Dosya yükleme (PDF)
[X] - Temel email bildirimleri

**Teknik Görevler:**
[X] - JWT authentication setup
[X] - Prisma database schema
[X] - File upload middleware
[X] - Basic email service
[X] - Role-based route protection

### Phase 2: Frontend Integration & API Completion (2-3 hafta)
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

### Phase 3: Advanced Features & Workflow Management (3-4 hafta)
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

### Phase 4: Publication & Advanced Features (3-4 hafta)
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

## 💡 Özel Öneriler

### 1. Database Design:
```sql
-- Ana tablolar
submissions (makale gönderileri)
submission_versions (makale versiyonları)
submission_status_history (durum geçmişi)
reviews (hakem değerlendirmeleri)
review_rounds (hakemlik turu)
revisions (revizyon istekleri)
articles (yayınlanan makaleler)
users (kullanıcılar)
user_roles (kullanıcı rolleri)
workflow_states (süreç durumları)
workflow_transitions (durum geçişleri)

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
- DRAFT
- SUBMITTED
- UNDER_EDITOR_REVIEW
- UNDER_PEER_REVIEW
- REVISION_REQUESTED
- REVISION_SUBMITTED
- RE_REVIEW_ASSIGNED
- ACCEPTED
- REJECTED
- PUBLISHED
- ARCHIVED
- ON_HOLD
- WITHDRAWN

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

### 3. Security Considerations:
- JWT token rotation
- File upload validation
- Role-based access control
- Audit logging
- Rate limiting

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

Bu dokümantasyon, akademik dergi sisteminiz için kapsamlı bir backend geliştirme planı sunmaktadır. Her faz, önceki fazın üzerine inşa edilir ve sistemin kademeli olarak büyümesini sağlar. 