<template>
  <div class="row">
    <div class="col-12 grid-margin">
      <!-- Header avec Résumé Financier Rapide -->
      <div class="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h3 class="fw-bold mb-1">Validation & Frais d'Inscriptions</h3>
          <p class="text-muted small mb-0">
            Suivi des paiements et validation administrative des dossiers.
          </p>
        </div>
        <div class="d-flex gap-3 text-end">
          <div class="px-3 border-end">
            <small class="text-muted d-block">Total Collecté</small>
            <span class="fw-bold text-success">2,450,000 FCFA</span>
          </div>
          <div class="px-3">
            <small class="text-muted d-block">En attente</small>
            <span class="fw-bold text-warning">850,000 FCFA</span>
          </div>
        </div>
      </div>

      <!-- Filtres Modernisés -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body bg-light rounded">
          <div class="row g-3">
            <div class="col-md-3">
              <select class="form-select border-0 shadow-sm" v-model="selectedFiliere">
                <option value="">Toutes les filières</option>
                <option v-for="f in filieres" :key="f" :value="f">{{ f }}</option>
              </select>
            </div>
            <div class="col-md-3">
              <select class="form-select border-0 shadow-sm" v-model="selectedStatut">
                <option value="">Tous les statuts</option>
                <option value="en attente">⏳ En attente</option>
                <option value="validée">✅ Validée</option>
                <option value="annulée">❌ Annulée</option>
              </select>
            </div>
            <div class="col-md-4">
              <div class="input-group shadow-sm bg-white rounded">
                <span class="input-group-text bg-white border-0"
                  ><i class="mdi mdi-magnify text-primary"></i
                ></span>
                <input
                  type="text"
                  class="form-control border-0"
                  placeholder="Rechercher un étudiant..."
                  v-model="searchQuery"
                />
              </div>
            </div>
            <div class="col-md-2 text-end">
              <button class="btn btn-white w-100 shadow-sm border-0" @click="resetFilters">
                <i class="mdi mdi-filter-variant"></i> Filtrer
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions Globales -->
      <div class="d-flex justify-content-between mb-3 align-items-center">
        <span class="text-muted small"
          >Affichage de <b>{{ filteredInscriptions.length }}</b> dossiers</span
        >
        <div class="d-flex gap-2">
          <button class="btn btn-outline-primary btn-sm px-3 shadow-sm bg-white">
            <i class="mdi mdi-file-export-outline me-1"></i> Exporter
          </button>
          <InscriptionClasse />
        </div>
      </div>

      <!-- Tableau Financier -->
      <div class="card border-0 shadow-sm">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="bg-light">
                <tr>
                  <th class="ps-4">Étudiant / Matricule</th>
                  <th>Classe</th>
                  <th>Frais Scolarité</th>
                  <th>Montant Versé</th>
                  <th>Reste</th>
                  <th class="text-center">Statut</th>
                  <th class="text-end pe-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="ins in paginatedInscriptions" :key="ins.id">
                  <td class="ps-4">
                    <div class="d-flex align-items-center">
                      <div class="avatar-initials me-3 bg-soft-primary text-primary fw-bold">
                        {{ ins.nom[0] }}{{ ins.prenom[0] }}
                      </div>
                      <div>
                        <div class="fw-bold text-dark">{{ ins.nom }} {{ ins.prenom }}</div>
                        <small class="text-primary fw-semibold">{{ ins.matricule }}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="badge bg-light text-dark border">{{ ins.classe_code }}</div>
                    <div class="small text-muted mt-1">{{ ins.filiere_code }}</div>
                  </td>
                  <td><span class="fw-bold">450,000</span></td>
                  <td>
                    <span class="text-success fw-bold">250,000</span>
                    <div class="small text-muted" style="font-size: 10px">Via Orange Money</div>
                  </td>
                  <td>
                    <span class="badge bg-soft-danger text-danger">-200,000</span>
                  </td>
                  <td class="text-center">
                    <span :class="['badge rounded-pill px-3 py-2', statutClass(ins.statut)]">
                      {{ ins.statut }}
                    </span>
                  </td>
                  <td class="text-end pe-4">
                    <div class="btn-group shadow-sm border rounded-pill bg-white">
                      <button
                        v-if="ins.statut === 'en attente'"
                        class="btn btn-sm btn-white text-success border-end"
                        @click="validerInscription(ins.id)"
                      >
                        <i class="mdi mdi-check-bold"></i>
                      </button>
                      <button
                        class="btn btn-sm btn-white text-info border-end"
                        @click="imprimerRecu(ins)"
                      >
                        <i class="mdi mdi-printer"></i>
                      </button>
                      <button class="btn btn-sm btn-white text-secondary" @click="openModal(ins)">
                        <i class="mdi mdi-eye"></i>
                      </button>
                    </div>
                  </td>
                </tr>

                <!-- État Vide -->
                <tr v-if="filteredInscriptions.length === 0">
                  <td colspan="7" class="text-center py-5">
                    <img src="/img/empty-box.svg" width="100" class="mb-3 opacity-50" />
                    <p class="text-muted">Aucune transaction trouvée.</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <Pagination
          v-model="currentPage"
          :items-per-page="itemsPerPage"
          :total-items="filteredInscriptions.length"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.avatar-initials {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: 0.85rem;
}

.bg-soft-primary {
  background: rgba(75, 73, 172, 0.1);
}
.bg-soft-success {
  background: rgba(25, 135, 84, 0.12);
  color: #198754;
}
.bg-soft-danger {
  background: rgba(220, 53, 69, 0.12);
  color: #dc3545;
}
.bg-soft-warning {
  background: rgba(255, 193, 7, 0.15);
  color: #997404;
}

.btn-white {
  background: #fff;
  border: none;
}
.btn-white:hover {
  background: #f8f9fa;
}

.table thead th {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #777;
  border: none;
  padding: 15px 10px;
}

.table tbody tr {
  border-bottom: 1px solid #f2f2f2;
}

/* Style spécifique pour les montants FCFA */
td .fw-bold {
  font-family: 'Inter', sans-serif;
  color: #333;
}
</style>

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
    const items = Array.isArray(parsed) ? parsed : parsed?.data;
    if (Array.isArray(items)) {
      filieres.value = items.map((f) => f.code);
    }
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

const validerInscription = async (id) => {
  if (!confirm("Voulez-vous valider cette inscription et ajouter l'étudiant à la classe ?")) return;

  try {
    await store.confirmInscription(id);
    alert("Inscription validée ! L'étudiant est désormais inscrit au cursus.");
    fetchInscriptions();
  } catch (error) {
    console.error('Erreur lors de la validation:', error);
    alert('Erreur lors de la validation : ' + error.message);
  }
};

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

watch([searchQuery, selectedFiliere, selectedStatut], () => {
  currentPage.value = 1;
});
</script>
