<template>
  <div class="row">
    <div class="col-12 mb-2">
      <h4>Liste des semestres</h4>
      <p class="text-muted">Liste de tous les semestres académiques enregistrés.</p>
    </div>

    <div class="col-12">
      <div class="table">
        <table class="table table-striped align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Année</th>
              <th>Date début</th>
              <th>Date fin</th>
              <th>Statut</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <!-- Chargement -->
            <tr v-if="loading">
              <td colspan="8" class="text-center py-4">Chargement des semestres...</td>
            </tr>

            <!-- Données -->
            <tr v-for="(semestre, index) in semestres" :key="semestre.id">
              <td>{{ index + 1 }}</td>
              <td class="fw-bold">{{ semestre.code }}</td>
              <td>{{ semestre.annee }}</td>
              <td>{{ formatDate(semestre.dateDebut) }}</td>
              <td>{{ formatDate(semestre.dateFin) }}</td>
              <td>
                <span class="badge" :class="semestre.actif ? 'bg-success' : 'bg-secondary'">
                  {{ semestre.actif ? 'Actif' : 'Inactif' }}
                </span>
              </td>
              <td>
                <ItemActions
                  :item="semestre"
                  concourRoute="/edition-semestre/"
                  :showAdd="false"
                  @edit="editSemestre"
                  @delete="confirmDelete"
                />
              </td>
            </tr>

            <!-- Vide -->
            <tr v-if="!loading && semestres.length === 0">
              <td colspan="8" class="text-center py-4">
                <div class="d-flex flex-column align-items-center">
                  <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" width="80" />
                  <div class="text-muted">Aucun semestre enregistré</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import ItemActions from '../details/ItemActions.vue';
import { useSemestreStore } from '@/stores/academiqueStore/semestreStore';

/* =====================
   Store
===================== */
const semestreStore = useSemestreStore();

/* =====================
   Computed
===================== */
const loading = computed(() => semestreStore.loading);

// Mapping API → format tableau
const semestres = computed(() =>
  semestreStore.semestres.map((s) => ({
    id: s.id,
    code: s.code,
    annee: s.annee_code,        // API: annee_code
    dateDebut: s.date_debut,    // API: date_debut
    dateFin: s.date_fin,        // API: date_fin
    actif: s.est_actif,         // API: est_actif
    nbClasses: s.nb_classes,
    nbModules: s.nb_modules,
  }))
);


/* =====================
   Méthodes
===================== */
const editSemestre = (semestre) => {
  console.log('Édition du semestre :', semestre);
};

const confirmDelete = (semestre) => {
  semestreStore.removeSemestre(semestre.id);
};

const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('fr-FR');
};

/* =====================
   Lifecycle
===================== */
onMounted(() => {
  semestreStore.fetchSemestres();
});
</script>
