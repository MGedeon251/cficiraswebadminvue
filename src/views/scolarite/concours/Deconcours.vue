<template>
  <div class="concours-page">
    <h1>Gestion des concours</h1>

    <div class="actions">
      <router-link to="/scolarite/concours/inscription">
        <button>Inscription au concours</button>
      </router-link>

      <router-link to="/scolarite/concours/validation">
        <button>Validation des candidats</button>
      </router-link>

      <router-link to="/scolarite/concours/resultats">
        <button>Liste des admis</button>
      </router-link>
    </div>

    <div class="info">
      <p>Bienvenue dans l'espace de gestion des concours.</p>
      <ul>
        <li>Ajouter ou gérer les inscriptions des candidats</li>
        <li>Valider les candidats après concours</li>
        <li>Consulter la liste des admis, par filière</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// Tu peux importer ici des composants ou données si nécessaire
</script>

<style scoped>
.concours-page {
  max-width: 900px;
  margin: auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px #ccc;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #007bff;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.actions button {
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  color: white;
  background-color: #007bff;
  transition: background-color 0.3s ease;
}

.actions button:hover {
  background-color: #0056b3;
}

.info {
  text-align: center;
  font-size: 1rem;
}

ul {
  text-align: left;
  margin-top: 1rem;
}
</style>
