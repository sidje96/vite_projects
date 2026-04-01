const envUrl = import.meta.env.VITE_API_URL
const localUrl = `http://${window.location.hostname}:3000`

export const API_URL = envUrl || localUrl

export const CLOUDINARY_CLOUD_NAME = "dtvwwzmzg" 
export const CLOUDINARY_PRESET = "unsigned"

export const UPLOAD_URL =
  `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
