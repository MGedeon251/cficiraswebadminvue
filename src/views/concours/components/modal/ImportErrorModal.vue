<template>
  <a-modal
    v-model:visible="visible"
    title="Erreurs d'importation"
    :footer="null"
    width="700px"
  >
    <a-alert
      type="error"
      show-icon
      message="Certaines lignes du fichier n'ont pas pu être importées"
      class="mb-3"
    />
    <a-table
      :dataSource="errors"
      :columns="columns"
      :pagination="{ pageSize: 5 }"
      rowKey="index"
      size="small"
    />
  </a-modal>
</template>

<script setup>
import { ref, defineExpose } from 'vue';

const visible = ref(false);
const errors = ref([]);

const columns = [
  { title: '#', dataIndex: 'index', key: 'index', width: 60 },
  { title: 'Nom', dataIndex: 'nom', key: 'nom' },
  { title: 'Prénom', dataIndex: 'prenom', key: 'prenom' },
  { title: 'Erreur', dataIndex: 'error', key: 'error' },
];

// méthode pour afficher la modale et charger les erreurs
const show = (errorList) => {
  errors.value = errorList.map((err, idx) => ({
    index: idx + 1,
    nom: err.nom || 'N/A',
    prenom: err.prenom || 'N/A',
    error: err.error,
  }));
  visible.value = true;
};

defineExpose({ show });
</script>
