<template>
  <div>
    <h5>Dossier administratif</h5>
    <div v-for="(doc, index) in localData.documents" :key="index" class="border rounded p-3 mb-3">
      <div class="mb-2">
        <label>Type de document</label>
        <input
          v-model="doc.type"
          type="text"
          class="form-control"
          placeholder="Ex: Acte de naissance"
          required
        />
      </div>
      <div class="mb-2">
        <label>Description</label>
        <input v-model="doc.description" type="text" class="form-control" />
      </div>
      <div class="mb-2">
        <label>Fichier</label>
        <input type="file" class="form-control" @change="onFileUpload($event, index)" />
      </div>

      <button class="btn btn-danger btn-sm" @click="removeDoc(index)">Supprimer</button>
    </div>

    <button class="btn btn-primary" @click="addDoc">+ Ajouter un document</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({ modelValue: Object });
const emit = defineEmits(['update:modelValue']);

const localData = ref({ documents: props.modelValue.dossier?.documents || [] });

function addDoc() {
  localData.value.documents.push({
    type: '',
    description: '',
    chemin: null,
  });
}
function removeDoc(index) {
  localData.value.documents.splice(index, 1);
}
function onFileUpload(event, index) {
  const file = event.target.files[0];
  if (file) {
    localData.value.documents[index].chemin = file;
  }
}

watch(
  localData,
  (val) => {
    emit('update:modelValue', { ...props.modelValue, dossier: { documents: val.documents } });
  },
  { deep: true }
);

// Validation interne
async function validate(data) {
  return (data.dossier?.documents || []).length > 0;
}
defineExpose({ validate }); // ✅ rend la fonction accessible depuis le parent
</script>
