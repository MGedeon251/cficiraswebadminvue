<template>
  <form @submit.prevent="$emit('next')">
    <div class="mb-3">
      <label class="form-label">Montant</label>
      <input
        type="number"
        step="0.01"
        min="0"
        v-model.number="localData.montant"
        class="form-control"
        required
      />
    </div>

    <div class="mb-3">
      <label class="form-label">Mode de paiement</label>
      <select v-model="localData.mode_paiement" class="form-select" required>
        <option value="" disabled>Choisir un mode</option>
        <option value="espece">Espèce</option>
        <option value="mobile money">Mobile Money</option>
        <option value="virement">Virement</option>
        <option value="chèque">Chèque</option>
      </select>
    </div>

    <div class="mb-3">
      <label class="form-label">Référence transaction</label>
      <input type="text" v-model="localData.reference_transaction" class="form-control" required />
    </div>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({ modelValue: Object });
const emit = defineEmits(['update:modelValue', 'next', 'prev']);

const localData = reactive(props.modelValue.paiement || {});

watch(
  localData,
  (val) => {
    emit('update:modelValue', { ...props.modelValue, paiement: val });
  },
  { deep: true }
);
</script>
