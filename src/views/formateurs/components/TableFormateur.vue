<template>
  <div class="table-container shadow-sm rounded-4 bg-white p-3">
    <!-- Overlay de chargement -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
      <p class="mt-2 text-muted">Mise à jour de la liste...</p>
    </div>

    <!-- Tableau Moderne -->
    <div v-else-if="data.length > 0" class="table-responsive">
      <table class="table table-hover align-middle custom-table">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.key" :class="col.class">
              {{ col.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, index) in data" :key="record.id">
            <!-- Index -->
            <td class="text-muted fw-medium">
              {{ index + 1 + (currentPage - 1) * itemsPerPage }}
            </td>

            <!-- Exemple de colonne Nom/Profil (si présente dans tes colonnes) -->
            <!-- Note : On adapte le contenu selon la clé de la colonne -->
            <td v-for="col in columns.filter(c => c.key !== 'index' && c.key !== 'actions')" :key="col.key">
              <!-- Style spécifique pour le nom avec avatar -->
              <div v-if="col.key === 'nom' || col.key === 'prenom'" class="d-flex align-items-center">
                <div class="avatar-sm me-3 bg-soft-primary text-primary fw-bold">
                  {{ record.nom[0] }}{{ record.prenom[0] }}
                </div>
                <div>
                  <div class="fw-bold text-dark">{{ record.nom }} {{ record.prenom }}</div>
                  <div class="small text-muted">{{ record.email }}</div>
                </div>
              </div>
              
              <!-- Style spécifique pour le matricule/ID -->
              <span v-else-if="col.key === 'enseignant_id'" class="badge bg-light text-dark border">
                {{ record[col.key] }}
              </span>

              <!-- Rendu par défaut pour les autres colonnes -->
              <span v-else class="text-secondary">{{ record[col.key] }}</span>
            </td>

            <!-- Actions -->
            <td class="text-end">
              <ItemActions :item="record" moduleRoute="/enseignant" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- État Vide -->
    <div v-else class="text-center py-5 animate__animated animate__fadeIn">
      <img src="/img/empty-box.svg" alt="vide" class="mb-3 opacity-50" style="height: 120px" />
      <h5 class="text-muted">Aucun formateur trouvé</h5>
      <p class="small text-muted mb-4">Essayez de modifier vos filtres de recherche.</p>
      <button class="btn btn-primary btn-sm px-4 rounded-pill" @click="onReset">
        <i class="mdi mdi-refresh me-1"></i> Réinitialiser les filtres
      </button>
    </div>

    <!-- Pagination Moderne Bootstrap -->
    <div v-if="data.length > 0" class="d-flex justify-content-between align-items-center mt-4 px-2">
      <div class="text-muted small">
        Affichage de <b>{{ data.length }}</b> sur <b>{{ total }}</b> formateurs
      </div>
      
      <nav aria-label="Page navigation">
        <ul class="pagination pagination-sm mb-0 gap-1">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link rounded-circle" @click="onPageChange(currentPage - 1)">
              <i class="mdi mdi-chevron-left"></i>
            </button>
          </li>
          <!-- Simplification : Affiche la page actuelle -->
          <li class="page-item active">
            <span class="page-link rounded-circle px-3">{{ currentPage }}</span>
          </li>
          <li class="page-item" :class="{ disabled: currentPage * itemsPerPage >= total }">
            <button class="page-link rounded-circle" @click="onPageChange(currentPage + 1)">
              <i class="mdi mdi-chevron-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import ItemActions from './DetailItemv2.vue';

defineProps({
  columns: Array,
  data: Array,
  loading: Boolean,
  total: Number,
  currentPage: Number,
  itemsPerPage: Number,
});

const emit = defineEmits(['pageChange', 'reset']);

function onPageChange(page) {
  if (page > 0) emit('pageChange', page);
}
function onReset() {
  emit('reset');
}
</script>

<style scoped>
.table-container {
  border: 1px solid #f0f2f5;
}

.custom-table thead th {
  background-color: #f8faff;
  color: #64748b;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  font-weight: 700;
  padding: 15px;
  border-top: none;
}

.custom-table tbody td {
  padding: 15px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.9rem;
}

.custom-table tbody tr:hover {
  background-color: #fcfdff;
  transition: all 0.2s ease;
}

/* Mini Avatar dans le tableau */
.avatar-sm {
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: 0.8rem;
}

.bg-soft-primary {
  background-color: rgba(75, 73, 172, 0.1);
}

/* Pagination Style */
.page-link {
  border: none;
  color: #64748b;
  background: #f1f5f9;
  margin: 0 2px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-item.active .page-link {
  background-color: #4b49ac;
  color: white;
  box-shadow: 0 4px 10px rgba(75, 73, 172, 0.3);
}

.page-item.disabled .page-link {
  background: #f8fafc;
  opacity: 0.5;
}
</style>