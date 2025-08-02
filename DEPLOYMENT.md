# Deployment ke Vercel

## Masalah yang Diatasi

Masalah "not found" saat logout atau refresh halaman di Vercel disebabkan oleh:

1. **Client-side Routing**: React Router menggunakan client-side routing, tetapi server Vercel tidak tahu cara menangani route yang tidak ada di server
2. **Hard Redirect**: Penggunaan `window.location.href` menyebabkan hard redirect yang tidak bekerja dengan baik di SPA

## Solusi yang Diterapkan

### 1. File Konfigurasi Vercel

#### `vercel.json`
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "headers": {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

#### `_redirects` (di root project)
```
/*    /index.html   200
```

#### `_headers` (di root project)
```
/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/static/*
  Cache-Control: public, max-age=31536000, immutable
```

### 2. Perbaikan Auth Store

Mengubah `window.location.href` menjadi `window.location.replace()` untuk handling yang lebih baik:

```typescript
logout: () => {
  set({ user: null, isAuthenticated: false, message: '' })
  localStorage.removeItem('auth_token')
  // Use window.location.replace for better SPA handling
  window.location.replace('/login')
},
```

### 3. Perbaikan RoleRedirect

Menambahkan loading state dan auth check:

```typescript
export function RoleRedirect() {
  const { user, isAuthenticated, checkAuth, isLoading } = useAuthStore()

  useEffect(() => {
    // Check authentication status on mount
    checkAuth()
  }, [checkAuth])

  // Show loading while checking auth
  if (isLoading) {
    return <LoadingSpinner />
  }

  // Redirect logic...
}
```

## Langkah Deployment

1. **Build Project**:
   ```bash
   npm run build
   ```

2. **Deploy ke Vercel**:
   - Push ke repository Git
   - Connect repository ke Vercel
   - Vercel akan otomatis menggunakan file konfigurasi yang sudah dibuat

3. **Verifikasi**:
   - Test logout functionality
   - Test refresh halaman
   - Test direct URL access

## Troubleshooting

Jika masih mengalami masalah:

1. **Clear Cache**: Clear browser cache dan Vercel cache
2. **Check Build Logs**: Pastikan build berhasil tanpa error
3. **Verify Configuration**: Pastikan file `vercel.json` dan `_redirects` ada di root project
4. **Check Domain**: Pastikan domain dikonfigurasi dengan benar di Vercel dashboard

## Catatan Penting

- File `_redirects` dan `vercel.json` harus berada di root project (bukan di folder `public`)
- Pastikan semua route di React Router sudah terdaftar dengan benar
- Gunakan `window.location.replace()` untuk redirect yang lebih reliable di SPA 