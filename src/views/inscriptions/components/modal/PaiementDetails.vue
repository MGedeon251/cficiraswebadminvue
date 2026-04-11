<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="modelValue" class="modal-mask" @click.self="close">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content border-0 shadow-lg">
            <div class="modal-header border-bottom-0 pb-0">
              <h5 class="modal-title fw-bold text-secondary">Détails de l'étudiant</h5>
              <button type="button" class="btn-close shadow-none" @click="close"></button>
            </div>

            <div class="modal-body p-4" v-if="inscription">
              <div class="d-flex align-items-center mb-4 pb-3 border-bottom">
                <div class="avatar-circle me-3 bg-light text-primary">
                  {{ inscription.prenom[0] }}{{ inscription.nom[0] }}
                </div>
                <div>
                  <h4 class="mb-0 fw-bold">{{ inscription.nom }} {{ inscription.prenom }}</h4>
                  <span class="text-muted small"
                    >Matricule:
                    <span class="fw-medium text-dark">{{ inscription.matricule }}</span></span
                  >
                </div>
                <div class="ms-auto text-end">
                  <span
                    class="badge rounded-pill px-3 py-2"
                    :class="statutClass(inscription.statut)"
                  >
                    {{ inscription.statut.toUpperCase() }}
                  </span>
                </div>
              </div>

              <div class="row g-4">
                <div class="col-md-6">
                  <div class="info-card">
                    <label class="text-muted small text-uppercase fw-semibold mb-1 d-block"
                      >Cursus & Classe</label
                    >
                    <div class="d-flex align-items-center">
                      <span class="info-icon me-2 text-info">🎓</span>
                      <span class="fw-bold">{{ inscription.classe_code }}</span>
                      <span class="mx-2 text-muted">|</span>
                      <span class="text-secondary">{{ inscription.filiere_code }}</span>
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="info-card">
                    <label class="text-muted small text-uppercase fw-semibold mb-1 d-block"
                      >Année Académique</label
                    >
                    <div class="d-flex align-items-center">
                      <span class="info-icon me-2 text-success">📅</span>
                      <span class="fw-bold">{{ inscription.annee_code }}</span>
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="info-card">
                    <label class="text-muted small text-uppercase fw-semibold mb-1 d-block"
                      >Sexe</label
                    >
                    <div class="d-flex align-items-center text-capitalize">
                      <span class="info-icon me-2">{{
                        inscription.sexe === 'M' ? '♂️' : '♀️'
                      }}</span>
                      <span>{{ inscription.sexe }}</span>
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="info-card">
                    <label class="text-muted small text-uppercase fw-semibold mb-1 d-block"
                      >Date d'inscription</label
                    >
                    <div class="d-flex align-items-center text-secondary">
                      <span class="info-icon me-2 text-warning">🕒</span>
                      <span>{{ formatDate(inscription.date_inscription) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal-footer border-top-0 p-4">
              <button class="btn btn-light px-4 fw-medium" @click="close">Fermer</button>
              <button class="btn btn-primary px-4 shadow-sm fw-medium">Imprimer le reçu</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
/* Overlay de la modal */
.modal-mask {
  position: fixed;
  z-index: 1050;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(15, 23, 42, 0.6); /* Couleur plus foncée type Slate */
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Avatar stylisé */
.avatar-circle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  border: 2px solid #e2e8f0;
}

/* Carte d'information */
.info-card {
  padding: 12px;
  background: #f8fafc;
  border-radius: 10px;
  border: 1px solid #f1f5f9;
}

.info-icon {
  font-size: 1.1rem;
}

/* Transition de la modal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Boutons et badges */
.btn-primary {
  background-color: #4f46e5;
  border: none;
}
.btn-primary:hover {
  background-color: #4338ca;
}
</style>

<script setup>
import { onMounted, onUnmounted } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  inscription: Object,
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
