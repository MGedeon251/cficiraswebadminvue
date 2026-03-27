// /composables/useErrorMessage.js

export function extractErrorMessage(error, fallback = 'Une erreur est survenue.') {
  if (!error) return fallback;

  // Axios : erreur avec réponse du serveur
  if (error.response) {
    const data = error.response.data;

    // Réponse texte brute
    if (typeof data === 'string') return data;

    // ✅ Priorité à 'error' (détail technique), sinon 'message' (message général)
    if (data?.error && data?.message) {
      return `${data.message} : ${data.error}`;
    }
    if (data?.error) return data.error;
    if (data?.message) return data.message;

    if (data?.errors) {
      const first = Object.values(data.errors)[0];
      return Array.isArray(first) ? first[0] : first;
    }

    return `Erreur ${error.response.status}`;
  }

  // Axios : requête envoyée mais pas de réponse (timeout, réseau)
  if (error.request) {
    return 'Impossible de se connecter au serveur.';
  }

  // Erreur JavaScript native
  if (error.message) return error.message;

  return fallback;
}
