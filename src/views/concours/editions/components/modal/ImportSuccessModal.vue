<template>
  <a-modal
    v-model:visible="visible"
    title="Candidats importés avec succès"
    :footer="null"
    width="700px"
  >
    <a-alert type="success" show-icon message="Importation réussie" class="mb-3" />
    <a-table
      :dataSource="successData"
      :columns="columns"
      :pagination="{ pageSize: 5 }"
      rowKey="candidat_id"
      size="small"
    />
  </a-modal>
</template>

<script setup>
import { ref, defineExpose } from 'vue';

const visible = ref(false);
const successData = ref([]);

const columns = [
  { title: 'Nom', dataIndex: 'nom', key: 'nom' },
  { title: 'Prénom', dataIndex: 'prenom', key: 'prenom' },
  { title: 'Matricule', dataIndex: 'matricule', key: 'matricule' },
  { title: 'ID', dataIndex: 'candidat_id', key: 'candidat_id', width: 80 },
];

// méthode pour afficher la modale et charger les données
const show = (list) => {
  successData.value = list;
  visible.value = true;
};

defineExpose({ show });
</script>
