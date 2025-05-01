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
                <i class="mdi mdi-information-outline me-2"></i>
                Détails de la session
              </h5>
              <button type="button" class="btn-close btn-close-white" @click="closeDetails"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="info-card mb-3">
                    <h6 class="info-title">Informations générales</h6>
                    <div class="info-content">
                      <div class="info-item">
                        <span class="info-label">Code:</span>
                        <span class="info-value">{{ item.code_session }}</span>
                      </div>
                      <div class="info-item">
                        <span class="info-label">Désignation:</span>
                        <span class="info-value">{{ item.nom_session }}</span>
                      </div>
                      <div class="info-item">
                        <span class="info-label">Type:</span>
                        <span class="info-value">{{ item.type_session }}</span>
                      </div>
                      <div class="info-item">
                        <span class="info-label">Semestre:</span>
                        <span class="info-value">{{ item.semestre }}</span>
                      </div>
                      <div class="info-item">
                        <span class="info-label">Période:</span>
                        <span class="info-value">{{ item.periode_semestre }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="col-md-6">
                  <div class="info-card mb-3">
                    <h6 class="info-title">Dates et responsable</h6>
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
                        <span class="info-label">Responsable:</span>
                        <span class="info-value">{{ item.responsable }}</span>
                      </div>
                      <div class="info-item">
                        <span class="info-label">Année académique:</span>
                        <span class="info-value">{{ item.annee_academique }}</span>
                      </div>
                      <div class="info-item">
                        <span class="info-label">État:</span>
                        <span class="badge" :class="getStatusClass(item.etat)">
                          {{ item.etat }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div class="row mt-3">
                <div class="col-md-6">
                  <div class="info-card">
                    <h6 class="info-title">Statistiques</h6>
                    <div class="info-content">
                      <div class="info-item">
                        <span class="info-label">Modules évalués:</span>
                        <span class="info-value">{{ item.modules_evalues || '0' }}</span>
                      </div>
                      <div class="info-item">
                        <span class="info-label">Notes saisies:</span>
                        <span class="info-value">{{ item.nombre_notes_saisies || '0' }}</span>
                      </div>
                      <div class="info-item">
                        <span class="info-label">Taux de saisie:</span>
                        <div class="progress mt-2" style="height: 10px;">
                          <div 
                            class="progress-bar bg-success" 
                            role="progressbar" 
                            :style="{ width: calculateCompletionRate() + '%' }"
                            :aria-valuenow="calculateCompletionRate()"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <small class="text-muted">{{ calculateCompletionRate() }}% complété</small>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="col-md-6">
                  <div class="info-card">
                    <h6 class="info-title">Actions rapides</h6>
                    <div class="d-grid gap-2">
                      <button class="btn btn-outline-primary btn-sm">
                        <i class="mdi mdi-file-document-outline me-2"></i> Voir les épreuves
                      </button>
                      <button class="btn btn-outline-secondary btn-sm">
                        <i class="mdi mdi-clipboard-list-outline me-2"></i> Liste des participants
                      </button>
                      <button class="btn btn-outline-info btn-sm">
                        <i class="mdi mdi-chart-bar me-2"></i> Statistiques complètes
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
  import { ref, computed } from 'vue';
  
  const props = defineProps({
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
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Non défini';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  const calculateCompletionRate = () => {
    const modules = parseInt(props.item.modules_evalues) || 1;
    const notes = parseInt(props.item.nombre_notes_saisies) || 0;
    return Math.min(Math.round((notes / modules) * 100), 100);
  };
  
  const getStatusClass = (status) => {
    return {
      'active': 'bg-success',
      'inactive': 'bg-secondary',
      'draft': 'bg-warning text-dark',
      'completed': 'bg-info'
    }[status] || 'bg-light text-dark';
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
  
  .progress {
    border-radius: 5px;
    background-color: #e9ecef;
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