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
                        {{ niveau.name }} ({{ niveau.etudiants }} étudiants)
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

<script>
export default {
  name: 'FiliereView',
  data() {
    return {
      cycles: [
        {
          name: 'Cycle Licence (L)',
          filieres: [
            {
              name: 'Filière Informatique',
              niveaux: [
                { name: 'L1 Informatique', etudiants: 120 },
                { name: 'L2 Informatique', etudiants: 95 },
                { name: 'L3 Informatique', etudiants: 80 },
              ],
            },
            { name: 'Filière Génie Civil', niveaux: [1, 2, 3] },
            { name: 'Filière Électronique', niveaux: [] },
          ],
        },
        {
          name: 'Cycle Master (M)',
          filieres: [
            { name: 'Filière IA & Data Science', niveaux: [] },
            { name: 'Filière Cybersécurité', niveaux: [] },
          ],
        },
        {
          name: 'Cycle Doctorat (D)',
          filieres: [],
        },
      ],
    };
  },
};
</script>
