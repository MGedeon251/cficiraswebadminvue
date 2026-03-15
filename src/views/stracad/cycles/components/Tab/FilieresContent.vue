<template>
  <div class="row">
    <h4>Vue d'ensemble des cycles et filières</h4>
    <p>Déroulez les cycles pour consulter les filières et leurs niveaux.</p>

    <div class="accordion" id="cyclesAccordion">
      <!-- Boucle sur les cycles -->
      <div class="accordion-item" v-for="(cycle, cIndex) in cycles" :key="cycle.name">
        <h2 class="accordion-header" :id="'heading' + cIndex">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="'#collapse' + cIndex"
            aria-expanded="false"
            :aria-controls="'collapse' + cIndex"
          >
            {{ cycle.name }}
          </button>
        </h2>
        <div
          :id="'collapse' + cIndex"
          class="accordion-collapse collapse"
          :aria-labelledby="'heading' + cIndex"
          data-bs-parent="#cyclesAccordion"
        >
          <div class="accordion-body">
            <!-- Boucle sur les filières -->
            <div class="accordion" :id="'filieresAccordion' + cIndex">
              <div
                class="accordion-item"
                v-for="(filiere, fIndex) in cycle.filieres"
                :key="filiere.name"
              >
                <h2 class="accordion-header" :id="'headingF' + cIndex + '-' + fIndex">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="'#collapseF' + cIndex + '-' + fIndex"
                    aria-expanded="false"
                    :aria-controls="'collapseF' + cIndex + '-' + fIndex"
                  >
                    {{ filiere.name }}
                  </button>
                </h2>
                <div
                  :id="'collapseF' + cIndex + '-' + fIndex"
                  class="accordion-collapse collapse"
                  :aria-labelledby="'headingF' + cIndex + '-' + fIndex"
                  :data-bs-parent="'#filieresAccordion' + cIndex"
                >
                  <div class="accordion-body">
                    <ul v-if="filiere.niveaux && filiere.niveaux.length">
                      <li v-for="niveau in filiere.niveaux" :key="niveau.name">
                        {{ niveau.name }} {{ niveau.etudiants }}
                      </li>
                    </ul>
                    <span v-else class="text-muted">Aucun niveau renseigné</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted } from 'vue';
import { useCycleStore } from '@/stores/academiqueStore/cycleStore';
import { useNotifier } from '@/stores/messages/useNotifier';

const cycleStore = useCycleStore();
const messageStore = useNotifier();

// Récupération des cycles + filières depuis le store
const cycles = computed(() => cycleStore.Filierecycles);

// Charger les données au montage
onMounted(async () => {
  try {
    await cycleStore.fetchFiliereCycle();
  } catch (error) {
    messageStore.error('Erreur lors du chargement des cycles et filières');
  }
});
</script>
