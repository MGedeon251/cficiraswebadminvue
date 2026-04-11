<template>
  <div class="row">
    <div class="col-12 grid-margin">
      <!-- Header -->
      <div class="mb-4">
        <h3>Inscription des étudiants</h3>
        <p class="text-muted">Gestion des inscriptions et réinscriptions par filière</p>
      </div>

      <!-- Filtres -->
      <div class="card mb-4">
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-4">
              <label class="form-label">Recherche</label>
              <input
                type="text"
                class="form-control"
                placeholder="Nom, prénom ou matricule..."
                v-model="searchQuery"
              />
            </div>

            <div class="col-md-4">
              <label class="form-label">Filière</label>
              <select class="form-select" v-model="selectedFiliere">
                <option value="">Toutes</option>
                <option v-for="filiere in filieres" :key="filiere">
                  {{ filiere }}
                </option>
              </select>
            </div>

            <div class="col-md-4">
              <label class="form-label">Statut</label>
              <select class="form-select" v-model="selectedStatut">
                <option value="">Tous</option>
                <option value="en attente">En attente</option>
                <option value="validée">Validée</option>
                <option value="annulée">Annulée</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="d-flex justify-content-end mb-3 gap-2">
        <InscriptionClasse />
        <AjouterTuteur />
      </div>

      <div class="table-responsive">
        <table class="table table-hover align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Matricule</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Classe</th>
              <th>Filière</th>
              <th>Statut</th>
              <th class="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(inscription, index) in paginatedInscriptions" :key="inscription.id">
              <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
              <td>{{ inscription.matricule }}</td>
              <td>{{ inscription.nom }}</td>
              <td>{{ inscription.prenom }}</td>
              <td>{{ inscription.classe_code }}</td>
              <td>{{ inscription.filiere_code }}</td>
              <td>
                <span class="badge" :class="statutClass(inscription.statut)">
                  {{ inscription.statut }}
                </span>
              </td>
              <td class="text-end">
                <div class="btn-group shadow-sm" role="group" aria-label="Actions de classe">
                  <button class="btn btn-sm btn-outline-secondary" @click="openModal(inscription)">
                    <i class="mdi mdi-information-outline"></i>
                  </button>
                  <button
                    class="btn btn-sm btn-outline-danger"
                    @click="store.removeInscription(inscription.id)"
                  >
                    <i class="mdi mdi-delete-outline"></i>
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="filteredInscriptions.length === 0">
              <td colspan="8" class="text-center py-4">
                <img src="/img/empty-box.svg" width="80" class="mb-2" />
                <div class="text-muted">Aucune inscription trouvée</div>
              </td>
            </tr>
          </tbody>
        </table>

        <InscriptionDetailModal v-model="showModal" :inscription="selectedInscription" />
      </div>

      <div class="d-flex justify-content-between align-items-center mt-4">
        <div class="text-muted small">
          Affichage de <b>{{ paginatedInscriptions.length }}</b> sur
          <b>{{ filteredInscriptions.length }}</b> inscriptions
        </div>
        <Pagination
          v-model="currentPage"
          :items-per-page="itemsPerPage"
          :total-items="filteredInscriptions.length"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import InscriptionDetailModal from '../modal/InscriptionDetails.vue';
import { useInscriptionStore } from '@/stores/academiqueStore/inscriptionStore';

const store = useInscriptionStore();

onMounted(() => {
  store.fetchInscriptions();
  const savedFilieres = localStorage.getItem('filieres');
  if (savedFilieres) {
    const parsed = JSON.parse(savedFilieres);
    filieres.value = parsed.data.map((f) => f.code);
  }
});

const searchQuery = ref('');
const selectedFiliere = ref('');
const selectedStatut = ref('');

const filieres = ref([]);

const filteredInscriptions = computed(() => {
  const data = store.inscriptions || [];

  return data.filter((i) => {
    const search = searchQuery.value.toLowerCase().trim();
    const matchSearch =
      !search ||
      i.nom?.toLowerCase().includes(search) ||
      i.prenom?.toLowerCase().includes(search) ||
      i.matricule?.toLowerCase().includes(search);
    const matchFiliere = !selectedFiliere.value || i.filiere_code === selectedFiliere.value;
    const matchStatut = !selectedStatut.value || i.statut === selectedStatut.value;
    return matchSearch && matchFiliere && matchStatut;
  });
});

const selectedInscription = ref(null);
const showModal = ref(false);

const openModal = (inscription) => {
  selectedInscription.value = inscription;
  showModal.value = true;
};

const statutClass = (statut) => {
  return {
    'bg-success': statut === 'validée',
    'bg-warning text-dark': statut === 'en attente',
    'bg-danger': statut === 'annulée',
  };
};

// 1. État de la pagination
const currentPage = ref(1);
const itemsPerPage = ref(10); // Tu peux changer cette valeur

// 2. Calcul des données paginées
const paginatedInscriptions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredInscriptions.value.slice(start, end);
});

// 3. Reset de la page quand les filtres changent (Optionnel mais recommandé)
// Si l'utilisateur est à la page 5 et filtre, il doit revenir à la page 1
watch([searchQuery, selectedFiliere, selectedStatut], () => {
  currentPage.value = 1;
});
</script>
