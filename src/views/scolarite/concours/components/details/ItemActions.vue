<template>
  <div class="dropdown">
    <button class="btn btn-sm btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown">
      ...
    </button>
    <ul class="dropdown-menu dropdown-menu-light">
      <li>
        <button class="dropdown-item" @click="isDetailsVisible = true">
          <i class="mdi mdi-information-outline me-2"></i> Détails
        </button>
      </li>
      <li v-if="showAdd">
        <RouterLink
          class="dropdown-item"
          :to="`/edition-concours/edit/${item.id}`"
          @click="$emit('add', item)"
        >
          <i class="mdi mdi-launch me-2"></i> Éditer
        </RouterLink>
      </li>
      <li>
        <button
          class="dropdown-item"
          data-bs-toggle="modal"
          :data-bs-target="editModalTarget"
          @click="$emit('edit', item)"
        >
          <i class="mdi mdi-pencil-outline me-2"></i> Modifier
        </button>
      </li>
      <li class="dropdown-divider"></li>
      <li>
        <button class="dropdown-item text-danger" @click="$emit('delete', item)">
          <i class="mdi mdi-delete-outline me-2"></i> Supprimer
        </button>
      </li>
    </ul>
  </div>

  <!-- Détail modal -->
  <teleport to="body">
    <div
      v-if="isDetailsVisible"
      class="modal fade show d-block"
      tabindex="-1"
      role="dialog"
      style="background-color: rgba(0, 0, 0, 0.5)"
      @click.self="closeDetails"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">
              <i class="mdi mdi-information-outline me-2"></i> Détails du concours
            </h5>
            <button type="button" class="btn-close btn-close-white" @click="closeDetails"></button>
          </div>

          <div class="modal-body">
            <div class="row">
              <!-- Infos générales -->
              <div class="col-md-6">
                <div class="info-card mb-3">
                  <h6 class="info-title">Informations générales</h6>
                  <div class="info-content">
                    <div class="info-item">
                      <span class="info-label">ID:</span>
                      <span class="info-value">{{ item.id || 'Non défini' }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Désignation:</span>
                      <span class="info-value">{{ item.designation || 'Non défini' }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Type:</span>
                      <span class="info-value">{{ item.type_libelle || 'N/A' }} ({{ item.type_code || 'N/A' }})</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Description:</span>
                      <span class="info-value">{{ item.description || 'Non défini' }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Dossier requis:</span>
                      <span class="info-value">
                        <span class="badge" :class="item.dossier_requis === 'oui' ? 'bg-success' : 'bg-secondary'">
                          {{ item.dossier_requis === 'oui' ? 'Oui' : 'Non' }}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Dates -->
              <div class="col-md-6">
                <div class="info-card mb-3">
                  <h6 class="info-title">Dates et période</h6>
                  <div class="info-content">
                    <div class="info-item">
                      <span class="info-label">Date début:</span>
                      <span class="info-value">{{ formatDate(item.date_debut) }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Date fin:</span>
                      <span class="info-value">{{ formatDate(item.date_fin) }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Limite inscription:</span>
                      <span class="info-value">{{ formatDate(item.date_limite_dossier) }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Année académique:</span>
                      <span class="info-value">{{ item.annee_data?.code || 'Non défini' }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Statut:</span>
                      <span class="badge" :class="getStatusClass(item.statut)">
                        {{ item.statut || 'Inconnu' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Année académique (détails) -->
            <div class="row mt-3">
              <div class="col-md-6">
                <div class="info-card">
                  <h6 class="info-title">Période académique</h6>
                  <div class="info-content">
                    <div class="info-item">
                      <span class="info-label">Début année:</span>
                      <span class="info-value">{{ formatDate(item.annee_data?.debut) }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Fin année:</span>
                      <span class="info-value">{{ formatDate(item.annee_data?.fin) }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Année active:</span>
                      <span class="info-value">
                        <span class="badge" :class="item.annee_data?.active ? 'bg-success' : 'bg-secondary'">
                          {{ item.annee_data?.active ? 'Oui' : 'Non' }}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="col-md-6">
                <div class="info-card">
                  <h6 class="info-title">Actions rapides</h6>
                  <div class="d-grid gap-2">
                    <button class="btn btn-outline-primary btn-sm">
                      <i class="mdi mdi-file-document-outline me-2"></i> Voir les épreuves
                    </button>
                    <button class="btn btn-outline-secondary btn-sm">
                      <i class="mdi mdi-clipboard-list-outline me-2"></i> Liste des candidats
                    </button>
                    <button class="btn btn-outline-info btn-sm">
                      <i class="mdi mdi-chart-bar me-2"></i> Statistiques
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeDetails">
              <i class="mdi mdi-close me-2"></i> Fermer
            </button>
            <button class="btn btn-primary" @click="$emit('edit', item)">
              <i class="mdi mdi-pencil me-2"></i> Modifier
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  item: Object,
  showAdd: Boolean,
  editModalTarget: String,
});

const isDetailsVisible = ref(false);

const closeDetails = () => {
  isDetailsVisible.value = false;
};

const formatDate = (date) => {
  if (!date) return 'Non défini';
  const d = new Date(date);
  return d.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const getStatusClass = (status) => {
  switch ((status || '').toLowerCase()) {
    case 'ouvert':
      return 'bg-success';
    case 'fermé':
      return 'bg-danger';
    case 'en attente':
      return 'bg-warning';
    default:
      return 'bg-secondary';
  }
};

defineExpose({ closeDetails });
</script>

<style scoped>
.info-card {
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  padding: 1rem;
  height: 100%;
}
.info-title {
  font-weight: 600;
  color: #495057;
  margin-bottom: 1rem;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 0.5rem;
}
.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.info-label {
  font-weight: 500;
  color: #6c757d;
}
.info-value {
  text-align: right;
  color: #212529;
}
</style>
