<template>
  <form @submit.prevent="$emit('next')">
    <div class="mb-3">
      <label class="form-label">Année académique</label>
      <select v-model="localData.annee_academique_id" class="form-select" required>
        <option value="" disabled>Choisir...</option>
        <option value="1">2024-2025</option>
        <option value="2">2025-2026</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Classe</label>
      <select v-model="localData.classe_id" class="form-select" required>
        <option value="" disabled>Choisir...</option>
        <option value="1">Licence 1 Informatique</option>
        <option value="2">Licence 2 Informatique</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Commentaire</label>
      <textarea v-model="localData.commentaire" class="form-control"></textarea>
    </div>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({ modelValue: Object });
const emit = defineEmits(['update:modelValue', 'next', 'prev']);

const localData = reactive(props.modelValue.inscription || {});

watch(
  localData,
  (val) => {
    emit('update:modelValue', { ...props.modelValue, inscription: val });
  },
  { deep: true }
);
</script>
