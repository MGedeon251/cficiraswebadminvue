<template>
    <div class="dropdown">
      <button class="btn btn-sm btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown">
        ...
      </button>
      <ul class="dropdown-menu dropdown-menu-light">
        <li>
          <button class="dropdown-item" @click="isDetailsVisible = true">📝 Détails</button>
        </li>
        <li v-if="showAdd">
          <button class="dropdown-item" @click="$emit('add', item)">➕ Ajouter</button>
        </li>
        <li>
          <button
            class="dropdown-item"
            data-bs-toggle="modal"
            :data-bs-target="editModalTarget"
            @click="$emit('edit', item)"
          >
            ✏️ Modifier
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
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content shadow">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">📋 Détails de la session</h5>
          <button type="button" class="btn-close" @click="closeDetails"></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-md-6 mb-3" v-for="(value, label) in detailsMap" :key="label">
                <dt class="fw-semibold text-secondary">{{ label }}</dt>
                <dd class="mb-0">{{ value }}</dd>
              </div>
            </div>
            <!-- Espace réservé aux éléments de statistiques -->
            <!-- Section statistiques visuelles -->
            <div class="mt-4 pt-3 border-top">
            <h6 class="text-muted mb-3">📊 Statistiques</h6>

            <div class="mb-3">
                <label class="form-label fw-semibold">Progression des saisies de notes :</label>
                <div class="progress">
                <div
                    class="progress-bar progress-bar-striped bg-success"
                    role="progressbar"
                    :style="{ width: tauxNotesSaisies + '%' }"
                    :aria-valuenow="tauxNotesSaisies"
                    aria-valuemin="0"
                    aria-valuemax="100"
                >
                    {{ tauxNotesSaisies }}%
                </div>
                </div>
            </div>

            <div class="mb-2">
                <label class="form-label fw-semibold">Modules évalués :</label>
                <div>
                <span
                    v-for="(mod, idx) in modules"
                    :key="idx"
                    class="badge bg-primary me-1"
                >
                    {{ mod }}
                </span>
                </div>
            </div>
            </div>

          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeDetails">Fermer</button>
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
const tauxNotesSaisies = computed(() => {
  const total = 100; // tu peux remplacer cela par une vraie valeur dynamique si nécessaire
  const saisies = parseInt(props.item?.nombre_notes_saisies || 0, 10);
  return Math.min(Math.round((saisies / total) * 100), 100);
});

const modules = computed(() => {
  if (!props.item?.modules_evalues) return [];
  return props.item.modules_evalues.split(',').map(m => m.trim());
});

const detailsMap = computed(() => ({
  'Code': props.item.code_session,
  'Désignation': props.item.nom_session,
  'Type': props.item.type_session,
  'Semestre': props.item.semestre,
  'Période semestre': props.item.periode_semestre,
  'Date début': props.item.date_debut,
  'Date fin': props.item.date_fin,
  'Responsable': props.item.responsable,
  'Année académique': props.item.annee_academique,
  'État': props.item.etat,
}));
  
  const isDetailsVisible = ref(false);
  
  const closeDetails = () => {
    isDetailsVisible.value = false;
  };
  </script>
  