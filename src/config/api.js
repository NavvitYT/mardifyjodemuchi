// API Base URL - siempre usa el servidor externo

const BASE = 'https://basededatos.gokucomdohd.pro'

export const API_ENDPOINTS = {
  login: `${BASE}/api/login`,
  register: `${BASE}/api/register`,
  search: (username) => `${BASE}/search/api/user/${encodeURIComponent(username)}`,
}
