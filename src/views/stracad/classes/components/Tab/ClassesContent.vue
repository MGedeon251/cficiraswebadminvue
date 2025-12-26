<template>
  <div class="row">
    <div class="col-12 mb-2">
      <h4>Liste des classes</h4>
      <p class="text-muted">Liste de toutes les classes académiques enregistrées.</p>
    </div>

    <div class="col-12">
      <div class="table-responsive">
        <table class="table table-striped align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Filière</th>
              <th>Niveau</th>
              <th>Capacité max</th>
              <th width="120"></th>
            </tr>
          </thead>

          <tbody>
            <!-- Chargement -->
            <tr v-if="loading">
              <td colspan="6" class="text-center py-4">Chargement des classes...</td>
            </tr>

            <!-- Données -->
            <tr v-for="(classe, index) in classes" :key="classe.id">
              <td>{{ index + 1 }}</td>
              <td>{{ classe.code }}</td>
              <td>{{ classe.filiere }}</td>
              <td>{{ classe.niveau }}</td>
              <td>{{ classe.capacite }}</td>
              <td>
                <button class="btn btn-sm btn-outline-primary" @click="editClasse(classe)">
                  Modifier
                </button>
              </td>
            </tr>

            <!-- Vide -->
            <tr v-if="!loading && classes.length === 0">
              <td colspan="6" class="text-center py-4">
                <div class="d-flex flex-column align-items-center">
                  <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" width="80" />
                  <div class="text-muted">Aucune classe enregistrée</div>
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
import { ref, onMounted } from 'vue';

/* =====================
   États
===================== */
const loading = ref(false);
const classes = ref([]);

/* =====================
   Méthodes
===================== */
const fetchClasses = async () => {
  loading.value = true;

  // Simulation API
  classes.value = [
    {
      id: 1,
      code: 'L1-A',
      filiere: 'Informatique',
      niveau: 'Licence 1',
      capacite: 60,
    },
    {
      id: 2,
      code: 'L2-B',
      filiere: 'Informatique',
      niveau: 'Licence 2',
      capacite: 55,
    },
    {
      id: 3,
      code: 'M1-DS',
      filiere: 'Data Science',
      niveau: 'Master 1',
      capacite: 40,
    },
  ];

  loading.value = false;
};

const editClasse = (classe) => {
  // Prévu pour ouverture d’un modal d’édition
  console.log('Édition de la classe :', classe);
};

/* =====================
   Lifecycle
===================== */
onMounted(() => {
  fetchClasses();
});
</script>
