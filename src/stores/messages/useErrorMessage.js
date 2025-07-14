// /composables/useErrorMessage.js

export function extractErrorMessage(error, fallback = 'Une erreur est survenue.') {
  if (!error) return fallback;

  // Axios : erreur avec réponse du serveur
  if (error.response) {
    const data = error.response.data;
    if (typeof data === 'string') return data;
    if (data?.message) return data.message;
    return `Erreur ${error.response.status}`;
  }

  // Axios : erreur de requête envoyée mais pas de réponse
  if (error.request) {
    return 'Impossible de se connecter au serveur.';
  }

  // Erreur JavaScript ou inconnue
  if (error.message) {
    return error.message;
  }
  // Fallback
  return fallback;
}
