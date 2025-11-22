import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/api',
});

export interface PhotoMeta {
  photoId?: string;
  title: string;
  description?: string;
  tags?: string[];
  location?: string;
  shootDate?: string;
  s3Key: string;
  isPublic?: boolean;
}

export async function fetchPhotos(page = 1, limit = 12) {
  const res = await api.get('/photos', { params: { page, limit } });
  return res.data;
}

export async function fetchPhotoById(id: string) {
  const res = await api.get(`/photos/${id}`);
  return res.data;
}

export async function requestUploadUrl(fileName: string, fileType: string) {
  const res = await api.post('/photos/upload-url', { fileName, fileType });
  return res.data;
}

export async function savePhotoMeta(payload: PhotoMeta) {
  const res = await api.post('/photos', payload);
  return res.data;
}

export default api;
