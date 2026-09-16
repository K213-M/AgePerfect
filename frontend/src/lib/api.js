const API_URL = '/api';

function getToken() {
  return localStorage.getItem('admin_token');
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...authHeaders(),
      ...options.headers,
    },
  });
  const data = await res.json().catch(() => ({ error: 'Request failed' }));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const api = {
  // Public
  getCourses: () => apiFetch('/courses'),
  getTeachers: () => apiFetch('/teachers'),
  getNews: () => apiFetch('/news'),
  getGallery: () => apiFetch('/gallery'),
  getTestimonials: () => apiFetch('/testimonials'),
  getAchievements: () => apiFetch('/achievements'),
  getSettings: () => apiFetch('/settings'),

  // Admission
  submitApplication: (formData) => apiFetch('/applications', { method: 'POST', body: formData }),
  checkStatus: (applicationId) => apiFetch(`/applications/status/${applicationId}`),

  // Auth
  login: (username, password) =>
    apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),

  // Admin applications
  getApplications: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/applications${query ? `?${query}` : ''}`);
  },
  getApplication: (id) => apiFetch(`/applications/${id}`),
  updateApplicationStatus: (id, status) =>
    apiFetch(`/applications/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  updateApplicationNotes: (id, notes) =>
    apiFetch(`/applications/${id}/notes`, { method: 'PATCH', body: JSON.stringify({ notes }) }),
  exportApplicationsCSV: async () => {
    const res = await fetch(`${API_URL}/applications/export/csv`, { headers: authHeaders() });
    if (!res.ok) throw new Error('Export failed');
    return res.text();
  },

  // Admin courses
  createCourse: (data) => apiFetch('/courses', { method: 'POST', body: JSON.stringify(data) }),
  updateCourse: (id, data) => apiFetch(`/courses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCourse: (id) => apiFetch(`/courses/${id}`, { method: 'DELETE' }),

  // Admin teachers
  createTeacher: (formData) => apiFetch('/teachers', { method: 'POST', body: formData }),
  updateTeacher: (id, formData) => apiFetch(`/teachers/${id}`, { method: 'PUT', body: formData }),
  deleteTeacher: (id) => apiFetch(`/teachers/${id}`, { method: 'DELETE' }),

  // Admin news
  createNews: (formData) => apiFetch('/news', { method: 'POST', body: formData }),
  updateNews: (id, formData) => apiFetch(`/news/${id}`, { method: 'PUT', body: formData }),
  deleteNews: (id) => apiFetch(`/news/${id}`, { method: 'DELETE' }),

  // Admin gallery
  createGalleryItem: (formData) => apiFetch('/gallery', { method: 'POST', body: formData }),
  deleteGalleryItem: (id) => apiFetch(`/gallery/${id}`, { method: 'DELETE' }),

  // Admin testimonials
  createTestimonial: (data) => apiFetch('/testimonials', { method: 'POST', body: JSON.stringify(data) }),
  updateTestimonial: (id, data) => apiFetch(`/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTestimonial: (id) => apiFetch(`/testimonials/${id}`, { method: 'DELETE' }),

  // Admin achievements
  createAchievement: (data) => apiFetch('/achievements', { method: 'POST', body: JSON.stringify(data) }),
  updateAchievement: (id, data) => apiFetch(`/achievements/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteAchievement: (id) => apiFetch(`/achievements/${id}`, { method: 'DELETE' }),

  // Admin settings
  updateSettings: (data) => apiFetch('/settings', { method: 'PUT', body: JSON.stringify(data) }),
};
