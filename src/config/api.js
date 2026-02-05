// En desarrollo: URLs relativas (Vite las proxea)
// En producción: URLs absolutas (Cloudflare las redirige)

const isDev = import.meta.env.DEV

const BASE = isDev ? '' : 'https://basededatosmardify.onrender.com'

export const API_ENDPOINTS = {
  login: `${BASE}/login`,
  register: `${BASE}/register`,
  search: (username) => `${BASE}/search/api/user/${encodeURIComponent(username)}`,
}
