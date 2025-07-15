<template>
  <div class="row">
    <div class="col-md-12 grid-margin">
      <div class="d-flex justify-content-between flex-wrap">
        <div class="d-flex align-items-end flex-wrap">
          <div class="me-md-3 me-xl-5">
            <h3>Epreuves - {{ 'Concours Informatique 2024' }}</h3>
            <p>Détails sur les épreuves</p>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-end flex-wrap">
          <div class="dropdown me-2">
            <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="dropdown">
              <i class="mdi mdi-dots-vertical"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <a class="dropdown-item" href="#"
                  ><i class="mdi mdi-file-excel me-2"></i>Exporter Excel</a
                >
              </li>
              <li>
                <a class="dropdown-item" href="#"><i class="mdi mdi-printer me-2"></i>Imprimer</a>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a class="dropdown-item" href="#"><i class="mdi mdi-cog me-2"></i>Paramètres</a>
              </li>
            </ul>
          </div>
          <button class="btn btn-outline-dark me-2">PDF</button>
        </div>
      </div>
      <template>
        <div class="mt-3">
          <a-table
            :dataSource="epreuves"
            :columns="columns"
            :pagination="false"
            bordered
            rowKey="index"
          >
            <template #bodyCell="{ column, record, index }">
              <template v-if="column.dataIndex === 'code'">
                <a-input v-model:value="record.code" placeholder="EX01" />
              </template>

              <template v-else-if="column.dataIndex === 'designation'">
                <a-input v-model:value="record.designation" placeholder="Mathématiques" />
              </template>

              <template v-else-if="column.dataIndex === 'coefficient'">
                <a-input-number v-model:value="record.coefficient" :min="1" style="width: 100%" />
              </template>

              <template v-else-if="column.dataIndex === 'heure_debut'">
                <a-time-picker v-model:value="record.heure_debut" format="HH:mm" />
              </template>

              <template v-else-if="column.dataIndex === 'heure_fin'">
                <a-time-picker v-model:value="record.heure_fin" format="HH:mm" />
              </template>

              <template v-else-if="column.dataIndex === 'type_epreuve'">
                <a-select v-model:value="record.type_epreuve" style="width: 100%">
                  <a-select-option value="écrit">Écrit</a-select-option>
                  <a-select-option value="oral">Oral</a-select-option>
                  <a-select-option value="pratique">Pratique</a-select-option>
                </a-select>
              </template>

              <template v-else-if="column.dataIndex === 'action'">
                <div class="flex gap-1">
                  <a-button type="link" @click="saveEpreuve(record)" icon>
                    <template #icon><SaveOutlined /></template>
                  </a-button>
                  <a-button type="link" danger @click="removeEpreuve(index)" icon>
                    <template #icon><DeleteOutlined /></template>
                  </a-button>
                </div>
              </template>
            </template>
          </a-table>

          <a-button type="dashed" block class="mt-4" @click="addEpreuve">
            + Ajouter une épreuve
          </a-button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SaveOutlined, DeleteOutlined } from '@ant-design/icons-vue';

const epreuves = ref([]); // ou useConcourStore().epreuves selon ton store

const addEpreuve = () => {
  epreuves.value.push({
    code: '',
    designation: '',
    coefficient: 1,
    heure_debut: '',
    heure_fin: '',
    type_epreuve: 'écrit',
  });
};

const removeEpreuve = (index) => {
  epreuves.value.splice(index, 1);
};

const saveEpreuve = (epreuve) => {
  console.log('Sauvegarder cette épreuve :', epreuve);
};

// colonnes pour le tableau Ant Design Vue
const columns = [
  { title: 'Code', dataIndex: 'code' },
  { title: 'Intitulé', dataIndex: 'designation' },
  { title: 'Coefficient', dataIndex: 'coefficient' },
  { title: 'Heure début', dataIndex: 'heure_debut' },
  { title: 'Heure fin', dataIndex: 'heure_fin' },
  { title: 'Type', dataIndex: 'type_epreuve' },
  { title: 'Action', dataIndex: 'action' },
];
</script>
