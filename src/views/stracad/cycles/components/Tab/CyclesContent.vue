<template>
  <div class="row">
    <h4>Liste des cycles</h4>
    <p>Vous pouvez consulter les détails de chaque examen en cliquant sur le lien correspondant.</p>

    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Code</th>
            <th>Désignation</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <!-- Cas vide -->
          <tr v-if="cycles.length === 0">
            <td colspan="6" class="text-center py-4">
              <div class="d-flex flex-column align-items-center">
                <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" />
                <div class="text-pr">Aucune donnée</div>
              </div>
            </td>
          </tr>

          <!-- Boucle sur les cycles -->
          <tr v-for="(cycle, index) in cycles" :key="cycle.id">
            <td>{{ index + 1 }}</td>
            <td class="fw-bold">{{ cycle.code }}</td>
            <td>{{ cycle.designation }}</td>
            <td>
              <ItemActions
                :item="cycle"
                :showAdd="false"
                @edit="editCycle"
                @delete="cycleStore.removeCycle"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useCycleStore } from '@/stores/academiqueStore/cycleStore';
import { useNotifier } from '@/stores/messages/useNotifier';
import { extractErrorMessage } from '@/stores/messages/useErrorMessage';
import ItemActions from '../details/ItemActions.vue';

const { notifyError } = useNotifier();

// Stores
const cycleStore = useCycleStore();
// Récupération des cycles depuis le store
const cycles = computed(() => cycleStore.cycles);

// Charger les données au montage
onMounted(async () => {
  try {
    await cycleStore.fetchCycles(); // appel à l’action du store
    console.log('Cycles chargés:', cycles.value);
  } catch (error) {
    notifyError(extractErrorMessage(error, 'Échec lors du chargement des données.'));
  }
});
</script>
