# Role-Based Access Control (RBAC) Sistemi

## 🎯 Genel Yaklaşım

Kullanıcı giriş yaptıktan sonra, sistem kullanıcının rollerini ve bu rollerin sahip olduğu izinleri kontrol eder. Bu sayede:

- **Güvenlik**: Sadece yetkili kullanıcılar belirli sayfalara/özelliklere erişebilir
- **Esneklik**: Bir kullanıcı birden fazla role sahip olabilir
- **Yönetilebilirlik**: Roller ve izinler merkezi olarak yönetilir

## 🏗️ Sistem Mimarisi

### 1. Veritabanı Yapısı

```sql
-- Kullanıcılar tablosu
users (
  id, email, password_hash, created_at, updated_at
)

-- Roller tablosu
roles (
  id, name, description, created_at
)

-- İzinler tablosu
permissions (
  id, name, description, resource, action, created_at
)

-- Rol-İzin ilişkisi (many-to-many)
role_permissions (
  role_id, permission_id, created_at
)

-- Kullanıcı-Rol ilişkisi (many-to-many)
user_roles (
  user_id, role_id, created_at
)
```

### 2. Örnek Veriler

```sql
-- Roller
INSERT INTO roles (name, description) VALUES
('admin', 'Sistem yöneticisi'),
('author', 'Makale yazarı'),
('editor', 'Editör'),
('reviewer', 'Hakem'),
('publisher', 'Yayıncı');

-- İzinler
INSERT INTO permissions (name, description, resource, action) VALUES
('user:read', 'Kullanıcıları görüntüleme', 'user', 'read'),
('user:write', 'Kullanıcı oluşturma/düzenleme', 'user', 'write'),
('submission:read', 'Makale gönderilerini görüntüleme', 'submission', 'read'),
('submission:write', 'Makale gönderme', 'submission', 'write'),
('submission:review', 'Makale inceleme', 'submission', 'review'),
('submission:publish', 'Makale yayınlama', 'submission', 'publish'),
('review:assign', 'Hakem atama', 'review', 'assign'),
('review:submit', 'Hakemlik raporu gönderme', 'review', 'submit');

-- Rol-İzin ilişkileri
INSERT INTO role_permissions (role_id, permission_id) VALUES
-- Admin tüm izinlere sahip
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8),
-- Author sadece makale gönderme
(2, 4),
-- Editor makale inceleme ve hakem atama
(3, 3), (3, 5), (3, 7),
-- Reviewer sadece hakemlik raporu
(4, 8),
-- Publisher yayınlama
(5, 6);
```

## 🔐 Backend Implementasyonu

### 1. JWT Token Yapısı

```typescript
// JWT payload yapısı
interface JWTPayload {
  userId: string;
  email: string;
  roles: string[];
  permissions: string[];
  iat: number;
  exp: number;
}
```

### 2. Authentication Middleware

```typescript
// src/middleware/auth.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    roles: string[];
    permissions: string[];
  };
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token gerekli' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      roles: decoded.roles,
      permissions: decoded.permissions
    };
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Geçersiz token' });
  }
};
```

### 3. Authorization Middleware

```typescript
// src/middleware/authorization.ts
import { Request, Response, NextFunction } from 'express';

// Belirli bir izne sahip olma kontrolü
export const requirePermission = (permission: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Kimlik doğrulama gerekli' });
    }

    if (!req.user.permissions.includes(permission)) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    next();
  };
};

// Belirli bir role sahip olma kontrolü
export const requireRole = (role: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Kimlik doğrulama gerekli' });
    }

    if (!req.user.roles.includes(role)) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    next();
  };
};

// Birden fazla rolden birine sahip olma kontrolü
export const requireAnyRole = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Kimlik doğrulama gerekli' });
    }

    const hasRole = req.user.roles.some(role => roles.includes(role));
    if (!hasRole) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    next();
  };
};
```

### 4. Route Kullanımı

```typescript
// src/routes/submissions.ts
import express from 'express';
import { authenticateToken, requirePermission, requireRole } from '../middleware';

const router = express.Router();

// Makale gönderme - Author rolü gerekli
router.post('/submissions', 
  authenticateToken, 
  requireRole('author'),
  submissionController.createSubmission
);

// Makale listesi - Editor ve Admin görebilir
router.get('/submissions', 
  authenticateToken, 
  requireAnyRole(['editor', 'admin']),
  submissionController.getSubmissions
);

// Makale inceleme - Editor rolü gerekli
router.post('/submissions/:id/review', 
  authenticateToken, 
  requirePermission('submission:review'),
  submissionController.reviewSubmission
);

// Makale yayınlama - Publisher rolü gerekli
router.post('/submissions/:id/publish', 
  authenticateToken, 
  requirePermission('submission:publish'),
  submissionController.publishSubmission
);
```

## 🎨 Frontend Implementasyonu

### 1. Auth Context Güncellemesi

```typescript
// src/context/AuthContext.tsx
interface AuthContextType {
  user: User | null;
  userRoles: string[];
  userPermissions: string[];
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  // ... diğer metodlar
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [userPermissions, setUserPermissions] = useState<string[]>([]);

  const hasPermission = (permission: string): boolean => {
    return userPermissions.includes(permission);
  };

  const hasRole = (role: string): boolean => {
    return userRoles.includes(role);
  };

  const hasAnyRole = (roles: string[]): boolean => {
    return userRoles.some(role => roles.includes(role));
  };

  // Login işlemi sırasında roller ve izinler de alınır
  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      const { user, roles, permissions } = response.data;
      
      setUser(user);
      setUserRoles(roles);
      setUserPermissions(permissions);
      
      // JWT token'ı localStorage'a kaydet
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      userRoles,
      userPermissions,
      hasPermission,
      hasRole,
      hasAnyRole,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 2. Protected Route Component

```typescript
// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
  requiredRole?: string;
  requiredRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermission,
  requiredRole,
  requiredRoles
}) => {
  const { user, hasPermission, hasRole, hasAnyRole } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // İzin kontrolü
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Rol kontrolü
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Birden fazla rolden biri kontrolü
  if (requiredRoles && !hasAnyRole(requiredRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
```

### 3. Route Kullanımı

```typescript
// src/routes/AppRoutes.tsx
import { ProtectedRoute } from '../components/ProtectedRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
      
      {/* Role-based routes */}
      <Route path="/submit" element={
        <ProtectedRoute requiredRole="author">
          <SubmitPage />
        </ProtectedRoute>
      } />
      
      <Route path="/editor/submissions" element={
        <ProtectedRoute requiredRole="editor">
          <EditorSubmissionsPage />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/users" element={
        <ProtectedRoute requiredPermission="user:read">
          <UserManagementPage />
        </ProtectedRoute>
      } />
      
      <Route path="/publisher/articles" element={
        <ProtectedRoute requiredAnyRole={['publisher', 'admin']}>
          <PublisherArticlesPage />
        </ProtectedRoute>
      } />
    </Routes>
  );
};
```

### 4. Conditional Rendering

```typescript
// src/components/Header.tsx
import { useAuth } from '../context/AuthContext';

export const Header = () => {
  const { user, hasRole, hasPermission } = useAuth();

  return (
    <nav>
      <Link to="/">Ana Sayfa</Link>
      
      {user && (
        <>
          <Link to="/dashboard">Dashboard</Link>
          
          {/* Author menüsü */}
          {hasRole('author') && (
            <Link to="/submit">Makale Gönder</Link>
          )}
          
          {/* Editor menüsü */}
          {hasRole('editor') && (
            <Link to="/editor/submissions">Editör Paneli</Link>
          )}
          
          {/* Admin menüsü */}
          {hasPermission('user:read') && (
            <Link to="/admin/users">Kullanıcı Yönetimi</Link>
          )}
          
          {/* Publisher menüsü */}
          {hasRole('publisher') && (
            <Link to="/publisher/articles">Yayın Yönetimi</Link>
          )}
        </>
      )}
    </nav>
  );
};
```

## 🔄 Login Süreci

### 1. Backend Login Endpoint

```typescript
// src/controllers/authController.ts
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Kullanıcı doğrulama
    const user = await userService.authenticateUser(email, password);
    
    // Kullanıcının rollerini ve izinlerini al
    const userRoles = await roleService.getUserRoles(user.id);
    const userPermissions = await permissionService.getUserPermissions(user.id);
    
    // JWT token oluştur
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        roles: userRoles.map(role => role.name),
        permissions: userPermissions.map(permission => permission.name)
      },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );
    
    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        },
        roles: userRoles.map(role => role.name),
        permissions: userPermissions.map(permission => permission.name),
        token
      }
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Geçersiz email veya şifre'
    });
  }
};
```

### 2. Frontend Login İşlemi

```typescript
// src/services/authService.ts
export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  
  // Token'ı axios interceptor'a ekle
  api.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`;
  
  return response.data;
};
```

## 🛡️ Güvenlik Önlemleri

### 1. Token Refresh

```typescript
// Otomatik token yenileme
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await api.post('/auth/refresh', { refreshToken });
          localStorage.setItem('token', response.data.token);
          api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
          return api.request(error.config);
        } catch (refreshError) {
          // Refresh token da geçersizse logout
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);
```

### 2. Rate Limiting

```typescript
// src/middleware/rateLimit.ts
import rateLimit from 'express-rate-limit';

export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 5, // 5 deneme
  message: 'Çok fazla giriş denemesi. Lütfen 15 dakika sonra tekrar deneyin.'
});
```

## 📊 Monitoring ve Logging

### 1. Access Logging

```typescript
// src/middleware/accessLog.ts
export const logAccess = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const logData = {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
    userId: req.user?.id,
    userRoles: req.user?.roles,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  };
  
  console.log('Access Log:', logData);
  next();
};
```

Bu sistem sayesinde:

1. **Güvenlik**: Kullanıcılar sadece yetkili oldukları sayfalara erişebilir
2. **Esneklik**: Bir kullanıcı birden fazla role sahip olabilir
3. **Yönetilebilirlik**: Roller ve izinler merkezi olarak yönetilir
4. **Audit Trail**: Tüm erişimler loglanır
5. **Scalability**: Yeni roller ve izinler kolayca eklenebilir

Bu yapıyı projenize entegre etmek ister misiniz? 