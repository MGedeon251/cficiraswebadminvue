<template>
  <div>
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="d-flex align-items-end flex-wrap">
          <div class="me-md-3 me-xl-5">
            <h5>Suivi des paiements</h5>
            <p>Inscription & réinscription pour une année académique</p>
          </div>
        </div>
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-end flex-wrap">
            <div class="me-md-4 me-xl-5">
              <div class="filters d-flex gap-2 mb-3">
                <a-input
                  class="me-1 mt-1 mt-xl-0"
                  v-model:value="searchQuery"
                  placeholder="Rechercher..."
                  allow-clear="allow-clear"
                  style="width: 180px"
                >
                  <template #prefix>
                    <i class="mdi mdi-magnify" />
                  </template>
                </a-input>
                <a-select
                  class="me-1 mt-1 mt-xl-0"
                  v-model:value="selectedAnnee"
                  placeholder="Année académique"
                  style="width: 180px"
                  :loading="loadingAnnees"
                  allow-clear="allow-clear"
                >
                  <a-select-option value="lucy">lucy</a-select-option>
                </a-select>
                <a-select
                  v-model:value="selectedFiliere"
                  placeholder="Filiere"
                  style="width: 180px"
                  :loading="loadingFilieres"
                  allow-clear="allow-clear"
                >
                  <a-select-option value="lucy">lucy</a-select-option>
                </a-select>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-end flex-wrap">
            <button class="btn btn-outline-dark me-2">+ Valider paiement</button>
          </div>
        </div>

        <!-- Tableau -->
        <div class="table-responsive mt-2">
          <table class="table table-hover align-middle">
            <thead>
              <tr>
                <th scope="col">
                  <!-- case pour tout sélectionner -->
                  <input type="checkbox" v-model="selectAll" @change="toggleAll" />
                </th>
                <th scope="col">Étudiant</th>
                <th scope="col">Classe</th>
                <th scope="col">Montant</th>
                <th scope="col">Statut</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in paiements" :key="p.id">
                <td>
                  <input type="checkbox" :value="p.id" v-model="selectedIds" />
                </td>
                <td>{{ p.nom }}</td>
                <td>{{ p.classe }}</td>
                <td>{{ p.montant }} FCFA</td>
                <td>
                  <span :class="['status-badge', p.statut]">{{ p.statut }}</span>
                </td>
                <td>
                  <item-actions :item="p" @delete="deleteItem" @add="openAddModal" />
                </td>
              </tr>

              <tr v-if="paiements.length === 0">
                <td colspan="7" class="text-center py-4">
                  <div class="d-flex flex-column align-items-center">
                    <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" />
                  </div>
                  <div class="text-pr">Aucune donnée</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- BARRE D'ACTIONS FLOTTANTE EN BAS -->
    <div v-if="selectedIds.length > 0" class="bulk-actions-bar">
      <div>
        <strong>{{ selectedIds.length }}</strong>
        élément(s) sélectionné(s)
      </div>
      <div class="btn-group">
        <button class="btn btn-success btn-sm" @click="validerSelection">✅ Valider</button>
        <button class="btn btn-warning btn-sm" @click="exporterSelection">📤 Exporter</button>
        <button class="btn btn-danger btn-sm" @click="deleteSelected">🗑 Supprimer</button>
        <button class="btn btn-secondary btn-sm" @click="envoyerMail">✉️ Envoyer un mail</button>
      </div>
    </div>
  </div>
</template>

<script setup="setup">
import { ref, watch } from 'vue';
import ItemActions from '../details/ItemActions.vue';

const paiements = ref([
  {
    id: 1,
    nom: 'Dupont Jean',
    classe: 'L1 Info',
    montant: 20000,
    statut: 'Payé',
  },
  {
    id: 2,
    nom: 'Mbala Marie',
    classe: 'L2 Math',
    montant: 0,
    statut: 'Non payé',
  },
  {
    id: 3,
    nom: 'Kouadio Alain',
    classe: 'L1 Info',
    montant: 10000,
    statut: 'En attente',
  },
]);

const selectedIds = ref([]);
const selectAll = ref(false);

// Coche/décoche tout
const toggleAll = () => {
  if (selectAll.value) {
    selectedIds.value = paiements.value.map((p) => p.id);
  } else {
    selectedIds.value = [];
  }
};

// Synchroniser la case "tout sélectionner"
watch(selectedIds, (newVal) => {
  selectAll.value = newVal.length === paiements.value.length;
});

// Actions groupées
const deleteSelected = () => {
  paiements.value = paiements.value.filter((p) => !selectedIds.value.includes(p.id));
  selectedIds.value = [];
};

const validerSelection = () => {
  console.log('Valider les IDs :', selectedIds.value);
};

const exporterSelection = () => {
  console.log('Exporter les IDs :', selectedIds.value);
};

const envoyerMail = () => {
  console.log('Envoyer mail aux IDs :', selectedIds.value);
};
</script>

<style scoped="scoped">
.status-badge {
  padding: 0.3em 0.8em;
  border-radius: 20px;
  color: #fff;
}

.Payé {
  background-color: #28a745;
}
.Non\ payé {
  background-color: #dc3545;
}
.En\ attente {
  background-color: #ffc107;
}

/* Barre flottante en bas */
.bulk-actions-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 2px solid #007bff;
  padding: 0.8rem 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1);
  z-index: 1050;
}
</style>
