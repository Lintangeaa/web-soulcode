# Environment Variables Setup

## 📁 File Locations

### 1. **Development Environment**
```bash
# Local development (not committed to git)
.env.local

# Example content:
VITE_API_BASE_URL=https://hono-soulcode-api.vercel.app/api
VITE_APP_NAME=SoulCode
VITE_ENABLE_DEBUG_MODE=true
```

### 2. **Production Environment**
```bash
# Production settings
.env.production

# Example content:
VITE_API_BASE_URL=https://hono-soulcode-api.vercel.app/api
VITE_APP_NAME=SoulCode
VITE_ENABLE_DEBUG_MODE=false
```

### 3. **Staging Environment**
```bash
# Staging settings
.env.staging

# Example content:
VITE_API_BASE_URL=https://staging-api.soulcode.com/api
VITE_APP_NAME=SoulCode (Staging)
VITE_ENABLE_DEBUG_MODE=true
```

## 🔧 Environment Variables

### **Required Variables**
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | API base URL | `https://hono-soulcode-api.vercel.app/api` |
| `VITE_APP_NAME` | Application name | `SoulCode` |

### **Optional Variables**
| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_JWT_SECRET` | JWT secret (optional) | - |
| `VITE_APP_VERSION` | App version | `1.0.0` |
| `VITE_ENABLE_ANALYTICS` | Enable analytics | `true` |
| `VITE_ENABLE_DEBUG_MODE` | Enable debug mode | `false` |

## 🚀 Setup Instructions

### 1. **Create Environment File**
```bash
# Copy example file
cp .env.example .env.local

# Edit with your values
nano .env.local
```

### 2. **Development**
```bash
# Start with local environment
npm run dev
# or
bun dev
```

### 3. **Production Build**
```bash
# Build with production environment
npm run build
# or
bun run build
```

## 🔒 Security Notes

### **Client-Side Variables**
- All `VITE_*` variables are exposed to the browser
- **Never** put secrets in client-side environment variables
- Use server-side environment variables for sensitive data

### **Safe Variables for Client**
✅ **Safe to expose:**
- API URLs (public endpoints)
- App configuration
- Feature flags
- Public keys

❌ **Never expose:**
- Database credentials
- API secrets
- Private keys
- Admin passwords

## 📝 Usage in Code

### **TypeScript Support**
```typescript
// Environment variables are typed
const apiUrl = import.meta.env.VITE_API_BASE_URL
const appName = import.meta.env.VITE_APP_NAME
const isDebug = import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true'
```

### **API Configuration**
```typescript
// src/api/config.ts
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
export const isDebugMode = import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true'
```

## 🌍 Environment Priority

Vite loads environment files in this order:
1. `.env.local` (highest priority)
2. `.env.development` (dev mode)
3. `.env.production` (prod mode)
4. `.env` (lowest priority)

## 🔄 Deployment

### **Vercel**
```bash
# Set environment variables in Vercel dashboard
VITE_API_BASE_URL=https://hono-soulcode-api.vercel.app/api
VITE_APP_NAME=SoulCode
```

### **Netlify**
```bash
# Set in Netlify dashboard or netlify.toml
[context.production.environment]
  VITE_API_BASE_URL = "https://hono-soulcode-api.vercel.app/api"
  VITE_APP_NAME = "SoulCode"
``` 