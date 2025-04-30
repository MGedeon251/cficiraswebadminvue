--- NoteHeader.vue ---
<template>
  <div class="d-flex justify-content-between align-items-center border-bottom pb-2 mb-4">
    <h5 class="mb-0">Edition des Notes</h5>
    <div>
      <button class="btn btn-secondary me-2" @click="$emit('back')">
        <i class="fas fa-arrow-left me-1"></i> Retour
      </button>
      <button class="btn btn-success" @click="$emit('save')">
        <i class="fas fa-save me-1"></i> Enregistrer
      </button>
    </div>
  </div>
</template>