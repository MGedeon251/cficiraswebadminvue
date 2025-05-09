<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="d-flex align-items-center">
        <i class="mdi mdi-book-open-page-variant fs-2 text-primary me-3"></i>
        <h2 class="mb-0 fw-bold">Détails du module</h2>
      </div>
      <router-link class="btn btn-outline-secondary d-flex align-items-center" to="/modules">
        <i class="mdi mdi-arrow-left me-2"></i> Retour à la liste
      </router-link>
    </div>

    <div v-if="module" class="card border-0 shadow-sm rounded-3 overflow-hidden">
      <div class="card-body p-4">
        <div class="row">
          <!-- Colonne Informations de base -->
          <div class="col-md-6 border-end pe-4">
            <h5 class="fw-bold text-primary mb-4 d-flex align-items-center">
              <i class="mdi mdi-information-outline me-2"></i>
              Informations de base
            </h5>

            <div class="detail-item mb-3">
              <span class="detail-label">Code module</span>
              <span class="detail-value bg-light-primary">{{ module.data.code }}</span>
            </div>

            <div class="detail-item mb-3">
              <span class="detail-label">Désignation</span>
              <span class="detail-value">{{ module.data.designation }}</span>
            </div>

            <div class="row">
              <div class="col-6">
                <div class="detail-item mb-3">
                  <span class="detail-label">Crédits</span>
                  <span class="detail-value badge bg-primary">{{ module.data.credit }}</span>
                </div>
              </div>
              <div class="col-6">
                <div class="detail-item mb-3">
                  <span class="detail-label">Coefficient</span>
                  <span class="detail-value badge bg-info text-dark">{{
                    module.data.coefficient
                  }}</span>
                </div>
              </div>
            </div>

            <div class="detail-item">
              <span class="detail-label">Volume horaire</span>
              <span class="detail-value">
                <span class="badge bg-secondary">{{ module.data.volume_horaire }}h</span>
              </span>
            </div>
          </div>

          <!-- Colonne Responsable et Filières -->
          <div class="col-md-6 ps-4">
            <div class="mb-4">
              <h5 class="fw-bold text-primary mb-4 d-flex align-items-center">
                <i class="mdi mdi-account-tie me-2"></i>
                Responsable
              </h5>
              <div class="d-flex align-items-center">
                <div
                  class="avatar bg-primary text-white rounded-circle me-3 d-flex align-items-center justify-content-center"
                  style="width: 40px; height: 40px"
                >
                  <i class="mdi mdi-account"></i>
                </div>
                <div>
                  <div class="fw-medium">{{ module.responsable_id || 'Non attribué' }}</div>
                  <small class="text-muted">Responsable pédagogique</small>
                </div>
              </div>
            </div>

            <div>
              <h5 class="fw-bold text-primary mb-3 d-flex align-items-center">
                <i class="mdi mdi-school me-2"></i>
                Filières & Classes associées
              </h5>
              <div class="accordion" id="filieresAccordion">
                <div
                  v-for="(filiere, index) in module.data.filieres_classes"
                  :key="index"
                  class="accordion-item border-0 mb-2"
                >
                  <h6 class="accordion-header">
                    <button
                      class="accordion-button collapsed bg-light rounded-2"
                      type="button"
                      data-bs-toggle="collapse"
                      :data-bs-target="'#collapse' + index"
                    >
                      <i class="mdi mdi-bookmark-outline text-primary me-2"></i>
                      {{ filiere.filiere }}
                    </button>
                  </h6>
                  <div
                    :id="'collapse' + index"
                    class="accordion-collapse collapse"
                    data-bs-parent="#filieresAccordion"
                  >
                    <div class="accordion-body pt-2">
                      <div class="d-flex flex-wrap gap-2">
                        <span
                          v-for="(classe, i) in filiere.classes"
                          :key="i"
                          class="badge bg-light text-dark border"
                        >
                          {{ classe }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="d-flex justify-content-end gap-3 mt-5 pt-3 border-top">
          <button class="btn btn-primary d-flex align-items-center" @click="editModule">
            <i class="mdi mdi-pencil me-2"></i> Modifier
          </button>
          <button class="btn btn-outline-success d-flex align-items-center" @click="assignToClass">
            <i class="mdi mdi-account-plus me-2"></i> Assigner
          </button>
          <button class="btn btn-outline-danger d-flex align-items-center" @click="archiveModule">
            <i class="mdi mdi-archive me-2"></i> Archiver
          </button>
        </div>
      </div>
    </div>

    <div v-else class="d-flex justify-content-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getModuleById } from '@/api/academique/moduleApi';

const route = useRoute();
const router = useRouter();
const module = ref(null);

const editModule = () => {
  router.push(`/modules/${route.params.id}/edit`);
};

const assignToClass = () => {
  router.push(`/modules/${route.params.id}/assign`);
};

const archiveModule = () => {
  // Implémentez la logique d'archivage ici
  console.log('Archivage du module', module.value.id);
};

onMounted(async () => {
  const id = route.params.id;
  try {
    const response = await getModuleById(id);
    module.value = response;
  } catch (error) {
    console.error('Erreur lors du chargement du module :', error);
  }
});
</script>

<style scoped>
.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-size: 0.875rem;
  color: #6c757d;
  font-weight: 500;
}

.detail-value {
  font-size: 1rem;
  color: #212529;
  font-weight: 400;
}

.bg-light-primary {
  background-color: rgba(13, 110, 253, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  display: inline-block;
}

.avatar {
  font-size: 1.25rem;
}

.accordion-button:not(.collapsed) {
  background-color: rgba(13, 110, 253, 0.1);
  color: #0d6efd;
}

.accordion-button:focus {
  box-shadow: none;
  border-color: rgba(13, 110, 253, 0.25);
}
</style>
