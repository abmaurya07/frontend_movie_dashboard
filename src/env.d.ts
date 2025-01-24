/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_MOVIES_ENDPOINT: string
  readonly VITE_CHART_MOBILE_BREAKPOINT: string
  readonly VITE_CHART_TOP_RATED_LIMIT: string
  readonly VITE_CHART_TOP_VOTED_LIMIT: string
  readonly VITE_CHART_TOP_GROSS_LIMIT: string
  readonly VITE_CHART_ANIMATION_DURATION: string
  readonly VITE_CHART_ANIMATION_EASING: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 