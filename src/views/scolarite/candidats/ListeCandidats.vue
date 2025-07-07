<template>
  <div class="liste-candidats">
    <h2>Liste des candidats inscrits</h2>

    <!-- Filtres -->
    <div class="filtres">
      <div class="filtre-item">
        <label>Filière :</label>
        <select v-model="filiereSelectionnee">
          <option value="">-- Toutes --</option>
          <option v-for="(f, i) in filieresDisponibles" :key="i" :value="f">{{ f }}</option>
        </select>
      </div>
      <div class="filtre-item">
        <label>Nom :</label>
        <input type="text" v-model="rechercheNom" placeholder="Nom..." />
      </div>
      <div class="filtre-item">
        <label>Prénom :</label>
        <input type="text" v-model="recherchePrenom" placeholder="Prénom..." />
      </div>
      <div class="filtre-item">
        <label>Année :</label>
        <select v-model="anneeSelectionnee">
          <option value="">-- Toutes --</option>
          <option v-for="(annee, i) in anneesDisponibles" :key="i" :value="annee">
            {{ annee }}
          </option>
        </select>
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Sexe</th>
          <th>Filière</th>
          <th>Année</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(c, index) in candidatsPaginés" :key="index">
          <td>{{ index + 1 + (page - 1) * parPage }}</td>
          <td>{{ c.nom }}</td>
          <td>{{ c.prenom }}</td>
          <td>{{ c.sexe?.substring(0, 1).toUpperCase() }}</td>
          <td>{{ c.filiere }}</td>
          <td>{{ c.concours }}</td>
          <td class="actions">
            <button class="btn-details" @click="voirDetails(c)">Détails</button>
            <button class="btn-edit" @click="supprimerCandidat(index + (page - 1) * parPage)">
              Supprimer
            </button>
          </td>
        </tr>
        <tr v-if="candidatsFiltres.length === 0">
          <td colspan="7" style="text-align: center; color: #999">Aucun candidat trouvé.</td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="pagination" v-if="totalPages > 1">
      <button @click="page--" :disabled="page === 1">Précédent</button>
      <span>Page {{ page }} / {{ totalPages }}</span>
      <button @click="page++" :disabled="page === totalPages">Suivant</button>
    </div>

    <!-- Détails du candidat (modal) -->
    <div v-if="candidatActuel" class="modal">
      <div class="modal-content">
        <span class="close" @click="candidatActuel = null">&times;</span>
        <h3>Détails du candidat</h3>
        <div class="details">
          <p><strong>Nom :</strong> {{ candidatActuel.nom }}</p>
          <p><strong>Prénom :</strong> {{ candidatActuel.prenom }}</p>
          <p><strong>Sexe :</strong> {{ candidatActuel.sexe }}</p>
          <p><strong>Âge :</strong> {{ candidatActuel.age }}</p>
          <p><strong>Date de naissance :</strong> {{ candidatActuel.dateNaissance }}</p>
          <p><strong>Lieu de naissance :</strong> {{ candidatActuel.lieuNaissance }}</p>
          <p><strong>Nationalité :</strong> {{ candidatActuel.nationalite }}</p>
          <p><strong>Adresse :</strong> {{ candidatActuel.adresse }}</p>
          <p><strong>Arrondissement :</strong> {{ candidatActuel.arrondissement }}</p>
          <p><strong>Série :</strong> {{ candidatActuel.serie }}</p>
          <p><strong>Catégorie :</strong> {{ candidatActuel.categorie }}</p>
          <p><strong>Email :</strong> {{ candidatActuel.email }}</p>
          <p><strong>Téléphone :</strong> {{ candidatActuel.numero }}</p>
          <p><strong>Nom du tuteur :</strong> {{ candidatActuel.tuteurNom }}</p>
          <p><strong>Téléphone tuteur :</strong> {{ candidatActuel.tuteurNumero }}</p>
          <p><strong>Filière :</strong> {{ candidatActuel.filiere }}</p>
          <p><strong>Année du concours :</strong> {{ candidatActuel.concours }}</p>
          <div v-if="candidatActuel.photo">
            <p><strong>Photo :</strong></p>
            <img
              :src="candidatActuel.photo"
              alt="Photo"
              style="width: 130px; height: 160px; object-fit: cover"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const candidats = ref([]);
const concours = ref([]);
const filiereSelectionnee = ref('');
const rechercheNom = ref('');
const recherchePrenom = ref('');
const anneeSelectionnee = ref('');
const page = ref(1);
const parPage = 5;
const candidatActuel = ref(null);

onMounted(() => {
  const savedCandidats = localStorage.getItem('candidats');
  if (savedCandidats) {
    candidats.value = JSON.parse(savedCandidats);
  }

  const savedConcours = localStorage.getItem('concours');
  if (savedConcours) {
    concours.value = JSON.parse(savedConcours);
  }
});

const filieresDisponibles = computed(() =>
  [...new Set(candidats.value.map((c) => c.filiere))].filter(Boolean).sort()
);

const anneesDisponibles = computed(() => concours.value.map((c) => c.annee).sort());

const candidatsFiltres = computed(() => {
  return candidats.value.filter((c) => {
    const matchFiliere = !filiereSelectionnee.value || c.filiere === filiereSelectionnee.value;
    const matchNom = c.nom?.toLowerCase().includes(rechercheNom.value.toLowerCase());
    const matchPrenom = c.prenom?.toLowerCase().includes(recherchePrenom.value.toLowerCase());
    const matchAnnee = !anneeSelectionnee.value || c.concours === anneeSelectionnee.value;
    return matchFiliere && matchNom && matchPrenom && matchAnnee;
  });
});

const totalPages = computed(() => Math.ceil(candidatsFiltres.value.length / parPage));

const candidatsPaginés = computed(() => {
  const start = (page.value - 1) * parPage;
  return candidatsFiltres.value.slice(start, start + parPage);
});

function supprimerCandidat(index) {
  if (confirm('Voulez-vous vraiment supprimer ce candidat ?')) {
    const tous = [...candidats.value];
    tous.splice(index, 1);
    candidats.value = tous;
    localStorage.setItem('candidats', JSON.stringify(tous));
  }
}

function voirDetails(candidat) {
  candidatActuel.value = candidat;
}
</script>

<style scoped>
.liste-candidats {
  padding: 1rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}
h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #333;
}
.filtres {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1rem;
  align-items: flex-end;
}
.filtre-item {
  display: flex;
  flex-direction: column;
}
.filtre-item select,
.filtre-item input {
  padding: 0.4rem;
  font-size: 0.9rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  min-width: 160px;
}
.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}
.table thead {
  background-color: #f0f0f0;
}
.table th,
.table td {
  padding: 0.6rem 0.8rem;
  border: 1px solid #ddd;
  text-align: left;
}
.table td {
  background-color: #fafafa;
}
.btn-edit {
  background-color: #007bff;
  color: white;
  padding: 0.35rem 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
}
.btn-edit:hover {
  background-color: #0056b3;
}

/* Pagination */
.pagination {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.pagination button {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}
.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.actions {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.btn-details {
  background-color: #28a745;
  color: white;
  padding: 0.3rem 0.6rem;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
}
.btn-details:hover {
  background-color: #218838;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  max-height: 90vh;
  overflow-y: auto;
  width: 400px;
  position: relative;
}
.modal-content .close {
  position: absolute;
  top: 0.5rem;
  right: 0.8rem;
  font-size: 1.5rem;
  cursor: pointer;
}
.details p {
  margin: 0.3rem 0;
}
</style>
