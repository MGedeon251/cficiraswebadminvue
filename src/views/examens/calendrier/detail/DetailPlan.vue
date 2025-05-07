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
          <RouterLink class="dropdown-item" :to="`/examens/planning/${item.planification_id}`">
              <i class="mdi mdi mdi-launch me-2"></i> Editer
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
            🗑️ Supprimer
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
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Détails</h5>
              <button type="button" class="btn-close" @click="closeDetails"></button>
            </div>
            <div class="modal-body">
                <div class="info-card">
                    <div class="info-title">Informations sur la planification</div>
                    <div class="info-item">
                        <span class="info-label">ID:</span>
                        <span class="info-value">{{ item.planification_id }}</span>
                    </div>
                    <div class="info-content">
                        <div class="info-item">
                            <span class="info-label">Designation:</span>
                            <span class="info-value">{{ item.designation }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Code session:</span>
                            <span class="info-value ">{{ item.code_session }}</span>    
                        </div>
                        <div class="info-item">
                            <span class="info-label">Date début:</span>
                            <span class="info-value">{{ item.date_debut }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Date fin:</span>
                            <span class="info-value">{{ item.date_fin }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Statut:</span>
                            <span class="info-value">{{ item.statut }}</span>   
                        <div>
                            <span class="info-label">Commentaire:</span>
                            <span class="info-value">{{ item.commentaire }}</span>
                            </div>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Désignation session:</span>
                            <span class="info-value">{{ item.designation_session }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Code filière:</span>
                            <span class="info-value">{{ item.code_filiere }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Désignation filière:</span>
                            <span class="info-value">{{ item.designation_filiere }}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Code année académique:</span>
                            <span class="info-value">{{ item.code_annee_academique }}</span>
                        <div>

                        </div>


                    </div>
                    <p><strong>Code session:</strong> {{ item.code_session }}</p>
                        <p><strong>Désignation:</strong> {{ item.designation }}</p>
                        <p><strong>Date début:</strong> {{ item.date_debut }}</p>
                        <p><strong>Date fin:</strong> {{ item.date_fin }}</p>
                        <p><strong>Statut:</strong> {{ item.statut }}</p>
                        <p><strong>Commentaire:</strong> {{ item.commentaire }}</p>
                        <p><strong>Désignation session:</strong> {{ item.designation_session }}</p>
                        <p><strong>Code filière:</strong> {{ item.code_filiere }}</p>
                        <p><strong>Désignation filière:</strong> {{ item.designation_filiere }}</p>
                        <p><strong>Code année académique:</strong> {{ item.code_annee_academique }}</p>
                </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" @click="closeDetails">Fermer</button>
            </div>
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
  </script>

<style scoped>

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
</style>

