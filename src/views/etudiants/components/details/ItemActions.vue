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
        <button class="dropdown-item" @click="$emit('add', item)">
          <i class="mdi mdi-plus-circle-outline me-2"></i> Ajouter
        </button>
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

  <!-- Modal pour les détails -->
  <teleport to="body">
    <div
      v-if="isDetailsVisible"
      class="modal fade show d-block"
      tabindex="-1"
      role="dialog"
      style="background-color: rgba(0, 0, 0, 0.5)"
      @click.self="closeDetails"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">
              <i class="mdi mdi-account-circle-outline me-2"></i>
              Détails de l’étudiant
            </h5>
            <button type="button" class="btn-close btn-close-white" @click="closeDetails"></button>
          </div>

          <div class="modal-body">
            <!-- Photo de profil -->
            <div class="text-center mb-4">
              <img
                :src="item.photo || '/img/default-avatar.png'"
                alt="Photo de profil"
                class="rounded-circle shadow"
                style="width: 120px; height: 120px; object-fit: cover"
              />
              <h5 class="mt-3">{{ item.nom }} {{ item.prenom }}</h5>
              <span class="badge bg-info">{{ item.matricule }}</span>
            </div>

            <div class="row">
              <!-- Identité -->
              <div class="col-md-6">
                <div class="info-card mb-3">
                  <h6 class="info-title">
                    <i class="mdi mdi-card-account-details me-2"></i> Identité
                  </h6>
                  <div class="info-content">
                    <div class="info-item">
                      <span class="info-label">Sexe:</span>
                      <span class="info-value">{{ item.sexe }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Date de naissance:</span>
                      <span class="info-value">{{ formatDate(item.date_naissance) }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Lieu de naissance:</span>
                      <span class="info-value">{{ item.lieu_naissance }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Contact -->
              <div class="col-md-6">
                <div class="info-card mb-3">
                  <h6 class="info-title"><i class="mdi mdi-phone me-2"></i> Contact</h6>
                  <div class="info-content">
                    <div class="info-item">
                      <span class="info-label">Téléphone:</span>
                      <span class="info-value">{{ item.telephone }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Email:</span>
                      <span class="info-value">{{ item.email }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Ville:</span>
                      <span class="info-value">{{ item.ville }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <!-- Académique -->
              <div class="col-md-6">
                <div class="info-card mb-3">
                  <h6 class="info-title"><i class="mdi mdi-school me-2"></i> Académique</h6>
                  <div class="info-content">
                    <div class="info-item">
                      <span class="info-label">Année académique:</span>
                      <span class="info-value">{{ item.annee_academique }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Cycle:</span>
                      <span class="info-value">{{ item.cycle }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Filière:</span>
                      <span class="info-value">{{ item.filiere }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Niveau:</span>
                      <span class="info-value">{{ item.niveau }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Classe:</span>
                      <span class="info-value">{{ item.classe }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Statut:</span>
                      <span class="badge bg-success">{{ item.statut }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Inscription -->
              <div class="col-md-6">
                <div class="info-card mb-3">
                  <h6 class="info-title"><i class="mdi mdi-calendar me-2"></i> Inscription</h6>
                  <div class="info-content">
                    <div class="info-item">
                      <span class="info-label">Date d’inscription:</span>
                      <span class="info-value">{{ formatDate(item.date_inscription) }}</span>
                    </div>
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

defineProps({
  item: Object,
  showAdd: {
    type: Boolean,
    default: false,
  },
  editModalTarget: {
    type: String,
    default: '#exampleModal-edit',
  },
});

const isDetailsVisible = ref(false);

const closeDetails = () => {
  isDetailsVisible.value = false;
};

const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};
</script>

<style scoped>
.modal-content {
  border: none;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.info-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  height: 100%;
}

.info-title {
  color: #495057;
  font-weight: 600;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid #dee2e6;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.info-label {
  font-weight: 500;
  color: #6c757d;
}

.info-value {
  font-weight: 400;
  color: #212529;
  text-align: right;
}

.badge {
  padding: 5px 10px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;
}

.btn-close:focus {
  box-shadow: none;
}

.modal-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-footer {
  border-top: 1px solid #dee2e6;
}
</style>
