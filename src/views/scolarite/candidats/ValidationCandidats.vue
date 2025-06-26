<template>
  <div class="validation-candidats">
    <h2>Validation des candidats au concours</h2>

    <!-- Filtre par filière pour les candidats à valider -->
    <div class="form-group filtre-candidats">
      <label for="filtre-filiere">Filtrer candidats par filière :</label>
      <select id="filtre-filiere" v-model="filiereFiltre">
        <option value="">-- Toutes les filières --</option>
        <option v-for="(filiere, index) in filieresDisponibles" :key="index" :value="filiere">
          {{ filiere }}
        </option>
      </select>
    </div>

    <!-- Table des candidats à valider -->
    <table class="table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Sexe</th>
          <th>Âge</th>
          <th>Filière</th>
          <th>Admis ?</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(c, index) in candidatsFiltres" :key="index" :class="{ admis: estAdmis(c) }">
          <td>{{ c.nom }}</td>
          <td>{{ c.prenom }}</td>
          <td>{{ c.sexe?.charAt(0).toUpperCase() }}</td>
          <td>{{ c.age }}</td>
          <td>{{ c.filiere }}</td>
          <td>
            <input
              type="checkbox"
              :disabled="estAdmis(c)"
              v-model="selectionCandidats"
              :value="c"
            />
          </td>
        </tr>
        <tr v-if="candidatsFiltres.length === 0">
          <td colspan="6" style="text-align: center; font-style: italic">
            Aucun candidat trouvé pour ce filtre.
          </td>
        </tr>
      </tbody>
    </table>

    <button
      class="btn-valider"
      :disabled="selectionCandidats.length === 0"
      @click="validerSelection"
    >
      Valider la sélection
    </button>

    <hr style="margin: 2rem 0" />

    <!-- Liste des admis filtrée par filière -->
    <div class="liste-admis">
      <h3>✅ Liste des candidats admis</h3>

      <div class="form-group filtre-admis">
        <label for="filtre-admis">Filtrer par filière :</label>
        <select id="filtre-admis" v-model="filiereAffichage">
          <option value="">-- Toutes les filières --</option>
          <option v-for="(filiere, index) in filieresDisponibles" :key="index" :value="filiere">
            {{ filiere }}
          </option>
        </select>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Sexe</th>
            <th>Âge</th>
            <th>Filière</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="candidat in admisPage" :key="candidat.id || candidat.nom + candidat.prenom">
            <td>{{ candidat.nom }}</td>
            <td>{{ candidat.prenom }}</td>
            <td>{{ candidat.sexe?.charAt(0).toUpperCase() }}</td>
            <td>{{ candidat.age }}</td>
            <td>{{ candidat.filiere }}</td>
          </tr>
          <tr v-if="admisFiltres.length === 0">
            <td colspan="5" style="text-align: center; font-style: italic">
              Aucun candidat admis trouvé.
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div v-if="admisFiltres.length > pageSize" class="pagination">
        <button :disabled="pageCourante === 1" @click="pageCourante--">Précédent</button>
        <span>Page {{ pageCourante }} / {{ totalPages }}</span>
        <button :disabled="pageCourante === totalPages" @click="pageCourante++">Suivant</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const candidats = ref([]);
const admis = ref([]);

const selectionCandidats = ref([]);

const filiereFiltre = ref('');
const filiereAffichage = ref('');

const pageCourante = ref(1);
const pageSize = 15;

// Charger candidats depuis localStorage
onMounted(() => {
  const savedCandidats = localStorage.getItem('candidats');
  if (savedCandidats) candidats.value = JSON.parse(savedCandidats);

  const savedAdmis = localStorage.getItem('admis');
  if (savedAdmis) admis.value = JSON.parse(savedAdmis);
});

// Sauvegarder admis à chaque changement
watch(
  admis,
  (nv) => {
    localStorage.setItem('admis', JSON.stringify(nv));
  },
  { deep: true }
);

// Liste unique des filières à partir des candidats (pour filtre)
const filieresDisponibles = computed(() => {
  const noms = candidats.value.map((c) => c.filiere);
  return [...new Set(noms)].filter((f) => f); // filtre valeurs vides
});

// Candidats filtrés pour validation (filtre par filière)
const candidatsFiltres = computed(() => {
  if (!filiereFiltre.value) return candidats.value.filter((c) => !estAdmis(c));
  return candidats.value.filter((c) => c.filiere === filiereFiltre.value && !estAdmis(c));
});

// Vérifie si candidat est admis (dans la liste admis)
function estAdmis(candidat) {
  return admis.value.some((a) => a.nom === candidat.nom && a.prenom === candidat.prenom);
}

// Valider les candidats sélectionnés
function validerSelection() {
  selectionCandidats.value.forEach((c) => {
    if (!estAdmis(c)) {
      admis.value.push(c);
    }
  });
  selectionCandidats.value = [];
}

// Filtrer la liste des admis
const admisFiltres = computed(() => {
  if (!filiereAffichage.value) return admis.value;
  return admis.value.filter((c) => c.filiere === filiereAffichage.value);
});

// Pagination sur admis filtrés
const totalPages = computed(() => Math.ceil(admisFiltres.value.length / pageSize));
const admisPage = computed(() => {
  const start = (pageCourante.value - 1) * pageSize;
  return admisFiltres.value.slice(start, start + pageSize);
});

// Si on change le filtre ou la page, reset la page à 1 si nécessaire
watch([filiereAffichage, admisFiltres], () => {
  pageCourante.value = 1;
});
</script>

<style scoped>
.validation-candidats {
  max-width: 1100px;
  margin: auto;
  padding: 1rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

h2 {
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  font-weight: 500;
  margin-right: 0.5rem;
}

select {
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  min-width: 160px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.table thead {
  background-color: #f0f0f0;
}

.table th,
.table td {
  padding: 0.6rem 0.8rem;
  border: 1px solid #ddd;
  text-align: left;
  vertical-align: middle;
}

.table td {
  background-color: #fafafa;
}

.admis {
  color: green;
  font-weight: 600;
}

.btn-valider {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 2rem;
}

.btn-valider:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.pagination button {
  padding: 0.3rem 0.8rem;
  background-color: #007bff;
  color: white;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
