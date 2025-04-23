import serviceApi from "../config/serviceApi";

// API pour gérer les notes
export const getNotes = () => serviceApi.get('/notes');
export const getNoteById = (id) => serviceApi.get(`/notes/${id}`);
export const createNote = (data) => serviceApi.post('/notes', data);
export const updateNote = (id, data) => serviceApi.put(`/notes/${id}`, data);
export const deleteNote = (id) => serviceApi.delete(`/notes/${id}`);

// API pour récupérer les notes par étudiant
export const getNotesByEtudiant = (etudiantId) => serviceApi.get(`/etudiant/${etudiantId}/notes`);

// API pour récupérer les notes par classe
export const getNotesByClasse = (classeId) => serviceApi.get(`/classe/${classeId}/notes`);

// API pour récupérer les notes par examen
export const getNotesByExamen = (examenId) => serviceApi.get(`/examens/${examenId}/notes`);
