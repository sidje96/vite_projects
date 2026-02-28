const envUrl = import.meta.env.VITE_API_URL
const localUrl = `http://${window.location.hostname}:3000`

export const API_URL = envUrl || localUrl