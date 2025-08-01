/// <reference types="vite/client" />

// Environment Variables
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_JWT_SECRET?: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_ENABLE_DEBUG_MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
