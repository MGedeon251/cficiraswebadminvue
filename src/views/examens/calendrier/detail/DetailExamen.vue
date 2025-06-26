<template>
  <div>
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-end flex-wrap">
            <div class="me-md-3 me-xl-5">
              <h2 class="page-title">
                <i class="mdi mdi-calendar text-primary me-2"></i>
                Calendrier des Examens
              </h2>
              <p class="mb-md-0">
                Gestion des sessions d'examen et répartition des salles/matières
              </p>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-end flex-wrap">
            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-outline-primary" @click="toggleFilters">
                <i class="mdi mdi-filter me-1"></i>
              </button>
              <div class="dropdown">
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
                    <a class="dropdown-item" href="#"
                      ><i class="mdi mdi-printer me-2"></i>Imprimer</a
                    >
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li>
                    <a class="dropdown-item" href="#"><i class="mdi mdi-cog me-2"></i>Paramètres</a>
                  </li>
                </ul>
              </div>
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-primary mt-2 mt-xl-0"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  aria-hidden="true"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                >
                  + Publier
                </button>
                <button
                  type="button"
                  class="btn btn-primary dropdown-toggle dropdown-toggle-split"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span class="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#drop_table" @click="downloadPDF">Publier PDF</a>
                  </li>
                  <li><a class="dropdown-item" href="#drop_table">Publier Excel</a></li>
                  <li><a class="dropdown-item" href="#drop_table">Publier Word</a></li>
                  <li><a class="dropdown-item" href="#drop_table">Publier CSV</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="container my-2">
        <div class="col-md-12 grid margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h5 class="mb-3">Calendrier des épreuves - {{}}</h5>
              <div ref="tableToPrint">
                <div class="table-responsive">
                  <table class="table table-bordered">
                    <thead class="table-light">
                      <tr>
                        <th>Module</th>
                        <th>Date</th>
                        <th>Heure début</th>
                        <th>Heure fin</th>
                        <th>Type</th>
                        <th>Statut</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <!-- draggable tbody -->
                    <draggable
                      v-model="epreuves"
                      tag="tbody"
                      item-key="module_id"
                      handle=".handle"
                      @end="onOrderChange"
                    >
                      <template #item="{ element: epreuve, index }">
                        <tr>
                          <td class="handle" style="cursor: move">
                            ☰ <input v-model="epreuve.module" class="form-control" />
                          </td>
                          <td>
                            <input
                              type="date"
                              v-model="epreuve.date_epreuve"
                              class="form-control"
                            />
                          </td>
                          <td>
                            <input type="time" v-model="epreuve.heure_debut" class="form-control" />
                          </td>
                          <td>
                            <input type="time" v-model="epreuve.heure_fin" class="form-control" />
                          </td>
                          <td>
                            <select v-model="epreuve.type_epreuve" class="form-select">
                              <option value="écrit">Écrit</option>
                              <option value="oral">Oral</option>
                              <option value="pratique">Pratique</option>
                            </select>
                          </td>
                          <td>
                            <span class="badge bg-info">{{ epreuve.statut }}</span>
                          </td>
                          <td>
                            <button class="btn btn-success btn-sm" @click="saveEpreuve(epreuve)">
                              <i class="mdi mdi-content-save"></i>
                            </button>
                          </td>
                        </tr>
                      </template>
                    </draggable>
                  </table>
                </div>
              </div>

              <button class="btn btn-outline-primary mt-3" @click="addEpreuve">
                + Ajouter une épreuve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getClasseModules } from '@/api/academique/moduleApi';
import { useRoute } from 'vue-router';
import draggable from 'vuedraggable';

import html2pdf from 'html2pdf.js';

const route = useRoute();
const moduleData = ref([]);

const props = defineProps({
  examenId: Number,
  classe: Object,
});

const epreuves = ref([]);

const addEpreuve = () => {
  epreuves.value.push({
    module: '',
    enseignant: '',
    date_epreuve: '',
    heure_debut: '',
    heure_fin: '',
    salle: '',
    type_epreuve: 'écrit',
    statut: 'prévu',
  });
};

const saveEpreuve = async (epreuve) => {
  try {
    if (epreuve.id) {
      console.log('Update epreuve :', epreuve);
    } else {
      console.log('Create epreuve :', epreuve);
    }
    alert('Epreuve sauvegardée avec succès');
  } catch (err) {
    console.error(err);
    alert('Erreur lors de la sauvegarde');
  }
};

const onOrderChange = () => {
  console.log('Nouvel ordre des épreuves :', epreuves.value);
};

const tableToPrint = ref(null);

const downloadPDF = () => {
  const element = tableToPrint.value;

  const opt = {
    margin: 0.5,
    filename: 'calendrier_examens.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a3', orientation: 'portrait' },
  };

  html2pdf().set(opt).from(element).save();
};
onMounted(async () => {
  const id = route.params.id;
  const semestreId = route.params.semestreId;
  try {
    const response = await getClasseModules(id, semestreId);
    moduleData.value = response;

    epreuves.value = response.map((mod) => ({
      module: mod.designation,
      module_id: mod.id,
      date_epreuve: '',
      heure_debut: '',
      heure_fin: '',
      type_epreuve: 'écrit',
      statut: 'prévu',
    }));
  } catch (error) {
    console.error('Erreur lors du chargement du module :', error);
  }
});
</script>

<style scoped>
.badge {
  font-size: 0.8rem;
}
.handle {
  cursor: move;
}
</style>
