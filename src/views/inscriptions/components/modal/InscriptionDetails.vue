<template>
  <teleport to="body">
    <div
      v-if="modelValue"
      class="modal fade show d-block"
      tabindex="-1"
      role="dialog"
      style="background-color: rgba(0, 0, 0, 0.5)"
      @click.self="close"
    >
      <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content shadow-md">

          <!-- Header -->
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">Détails de l'inscription</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              @click="close"
            ></button>
          </div>

          <!-- Body -->
          <div class="modal-body" v-if="inscription">
            <ul class="list-group list-group-flush">

              <li class="list-group-item d-flex justify-content-between">
                <strong>Matricule :</strong>
                <span class="fw-bold text-primary">
                  {{ inscription.matricule }}
                </span>
              </li>

              <li class="list-group-item d-flex justify-content-between">
                <strong>Nom complet :</strong>
                <span>
                  {{ inscription.nom }} {{ inscription.prenom }}
                </span>
              </li>

              <li class="list-group-item d-flex justify-content-between">
                <strong>Sexe :</strong>
                <span>{{ inscription.sexe }}</span>
              </li>

              <li class="list-group-item d-flex justify-content-between">
                <strong>Classe :</strong>
                <span class="badge bg-secondary">
                  {{ inscription.classe_code }}
                </span>
              </li>

              <li class="list-group-item d-flex justify-content-between">
                <strong>Filière :</strong>
                <span class="badge bg-info">
                  {{ inscription.filiere_code }}
                </span>
              </li>

              <li class="list-group-item d-flex justify-content-between">
                <strong>Année académique :</strong>
                <span class="text-success">
                  {{ inscription.annee_code }}
                </span>
              </li>

              <li class="list-group-item d-flex justify-content-between">
                <strong>Date d'inscription :</strong>
                <span>
                  {{ formatDate(inscription.date_inscription) }}
                </span>
              </li>

              <li class="list-group-item d-flex justify-content-between">
                <strong>Statut :</strong>
                <span class="badge" :class="statutClass(inscription.statut)">
                  {{ inscription.statut }}
                </span>
              </li>

            </ul>
          </div>

          <!-- Footer -->
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="close">
              Fermer
            </button>
          </div>

        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  inscription: Object
});

const emit = defineEmits(['update:modelValue']);

const close = () => {
  emit('update:modelValue', false);
};

// Statut badge
const statutClass = (statut) => ({
  'bg-success': statut === 'validée',
  'bg-warning text-dark': statut === 'en attente',
  'bg-danger': statut === 'annulée',
});

// Format date propre
const formatDate = (date) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// UX : ESC pour fermer
const handleKeydown = (e) => {
  if (e.key === 'Escape') close();
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>