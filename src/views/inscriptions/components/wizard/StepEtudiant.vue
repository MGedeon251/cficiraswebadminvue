<template>
  <form @submit.prevent="$emit('next')">
    <div class="mb-3">
      <label class="form-label">Nom</label>
      <input type="text" v-model="localData.nom" class="form-control" required />
    </div>
    <div class="mb-3">
      <label class="form-label">Prénom</label>
      <input type="text" v-model="localData.prenom" class="form-control" required />
    </div>
    <div class="mb-3">
      <label class="form-label">Date de naissance</label>
      <input type="date" v-model="localData.date_naissance" class="form-control" required />
    </div>
    <div class="mb-3">
      <label class="form-label">Sexe</label>
      <select v-model="localData.sexe" class="form-select" required>
        <option value="" disabled>Choisir...</option>
        <option value="Homme">Homme</option>
        <option value="Femme">Femme</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Téléphone</label>
      <input type="text" v-model="localData.telephone" class="form-control" required />
    </div>
    <div class="mb-3">
      <label class="form-label">Email</label>
      <input type="email" v-model="localData.email" class="form-control" />
    </div>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({ modelValue: Object });
const emit = defineEmits(['update:modelValue', 'next', 'prev']);

const localData = reactive(props.modelValue.etudiant || {});

watch(
  localData,
  (val) => {
    emit('update:modelValue', { ...props.modelValue, etudiant: val });
  },
  { deep: true }
);
</script>
