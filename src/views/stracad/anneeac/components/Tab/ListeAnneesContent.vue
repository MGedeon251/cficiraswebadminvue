<template>
  <div class="row">
    <h4>Liste des années académiques</h4>
    <p>Vous pouvez consulter les détails de chaque examen en cliquant sur le lien correspondant.</p>

    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Code</th>
            <th>Début</th>
            <th>Fin</th>
            <th>Statut</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <!-- Vérifie si la liste est vide -->
          <tr v-if="annees.length === 0">
            <td colspan="6" class="text-center py-4">
              <div class="d-flex flex-column align-items-center">
                <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" />
                <div class="text-pr">Aucune donnée</div>
              </div>
            </td>
          </tr>
          <!-- Boucle sur les années -->
          <tr v-for="(annee, index) in annees" :key="annee.id">
            <td>{{ index + 1 }}</td>
            <td class="fw-bold">{{ annee.code }}</td>
            <td>{{ formatDate(annee.date_debut) }}</td>
            <td>{{ formatDate(annee.date_fin) }}</td>
            <td>
                <span :class="mapStatut(annee.est_actif).class">
                  {{ mapStatut(annee.est_actif).label }}
                </span>
            </td>
            <td>
                <ItemActions
                  :item="annee"
                  anneeRoute="/edition-concours/"
                  :showAdd="false"
                  @edit="editAnnee"
                  @delete="confirmDelete"
                />

              </td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav v-if="totalPages > 1" class="mt-3">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="prevPage">Précédent</button>
        </li>
        <li 
          v-for="page in totalPages" 
          :key="page" 
          class="page-item" 
          :class="{ active: currentPage === page }"
        >
          <button class="page-link" @click="goToPage(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="nextPage">Suivant</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useAnneeStore } from '@/stores/academiqueStore/anneStore';
import { useNotifier} from '@/stores/messages/useNotifier';
import ItemActions from '../details/ItemActions.vue'; 

// Stores
const anneeStore = useAnneeStore();
const messageStore = useNotifier();

// Récupération des années depuis le store
const annees = computed(() => anneeStore.anneesAcademiques);

// Charger les données au montage
onMounted(async () => {
  try {
    await anneeStore.fetchAnneesAcademiques();
  } catch (error) {
    messageStore.error("Erreur lors du chargement des années académiques");
  }
});
// Méthodes de formatage
const formatDate = (date) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};
// Fonction de mapping
const mapStatut = (estActif) => {
  return {
    label: estActif ? 'True' : 'False',
    class: estActif ? 'badge bg-success' : 'badge bg-secondary'
  };
};

const editAnnee = (annee) => {
  currentAnnee.value = { ...annee }; // clone pour éviter mutation directe
  const modal = new bootstrap.Modal(document.getElementById('anneeModal'));
  modal.show();
};

const saveAnnee = async () => {
  if (currentAnnee.value.id) {
    await anneeStore.updateAnnee(currentAnnee.value);
  } else {
    await anneeStore.addAnnee(currentAnnee.value);
  }
};
</script>
