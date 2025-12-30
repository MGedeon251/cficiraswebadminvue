<template>
  <div class="row">
    <div class="col-12 mb-2 d-flex justify-content-between align-items-center">
      <div>
        <h4>Liste des niveaux</h4>
        <p class="text-muted">Niveaux académiques disponibles pour l’organisation des classes.</p>
      </div>

      <!-- Filtrer par classe -->
      <div class="d-flex align-items-center">
        <label class="me-2">Classe :</label>
        <select v-model="selectedClasseId" class="form-select form-select-sm w-auto">
          <option :value="null">Toutes les classes</option>
          <option
            v-for="c in classes"
            :key="c.classe_id"
            :value="c.classe_id"
          >
            {{ c.classe_code }} — {{ c.filiere_designation }}
          </option>
        </select>
      </div>
    </div>

    <div class="col-12">
      <div class="table-responsive">
        <table class="table table-striped align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Désignation</th>
              <th>Filière</th>
              <th>Crédits totaux</th>
              <th>Frais scolarité</th>
            </tr>
          </thead>

          <tbody>
            <!-- Chargement -->
            <tr v-if="loading">
              <td colspan="7" class="text-center py-4">Chargement des niveaux...</td>
            </tr>

            <!-- Données -->
            <tr v-for="(niveau, index) in niveaux" :key="niveau.id">
              <td>{{ index + 1 }}</td>
              <td class="fw-bold">{{ niveau.code }}</td>
              <td>{{ niveau.designation }}</td>
              <td>{{ niveau.filiere }}</td>
              <td>
                <span class="badge bg-info">{{ niveau.credits }}</span>
              </td>
              <td>{{ formatMoney(niveau.frais) }}</td>
            </tr>

            <!-- Vide -->
            <tr v-if="!loading && niveaux.length === 0">
              <td colspan="7" class="text-center py-4">
                <div class="d-flex flex-column align-items-center">
                  <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" width="80" />
                  <div class="text-muted">Aucun niveau disponible</div>
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
import { ref, computed, onMounted } from 'vue';
import { useClasseStore } from '@/stores/academiqueStore/classeStore';

/* =====================
   Stores
===================== */
const classeStore = useClasseStore();

/* =====================
   États
===================== */
const selectedClasseId = ref(null);

/* =====================
   Données & chargement
===================== */
const loading = computed(() => classeStore.loading);
const classes = computed(() =>
  Array.isArray(classeStore.classes) ? classeStore.classes : []
);

/* =====================
   Construction des niveaux à partir des classes
   - Déduire les niveaux uniques (par niveau_id)
   - Mapper vers le format attendu par le tableau
===================== */
const niveaux = computed(() => {
  const source = selectedClasseId.value
    ? classes.value.filter(c => c.classe_id === selectedClasseId.value)
    : classes.value;

  const map = new Map();
  for (const c of source) {
    if (!map.has(c.niveau_id)) {
      map.set(c.niveau_id, {
        id: c.niveau_id,
        code: c.niveau_code,
        designation: deriveDesignation(c.niveau_code, c.niveau_ordre),
        filiere: c.filiere_designation,
        credits: c.filiere_credits,
        frais: Number(c.niveau_frais) || 0,
        actif: true, // par défaut actif (pas de champ statut dans l’API fournie)
      });
    }
  }
  return Array.from(map.values());
});

/* =====================
   Utils
===================== */
const deriveDesignation = (code, ordre) => {
  // Ex: "L1" -> "Licence 1", "M1" -> "Master 1"
  // Fallback: utilise le code si le cycle n’est pas détecté
  if (!code) return `Niveau ${ordre ?? ''}`.trim();
  const prefix = code[0]?.toUpperCase();
  const year = code.slice(1);
  const cycleMap = { L: 'Licence', M: 'Master', D: 'Doctorat' };
  const cycle = cycleMap[prefix] || 'Niveau';
  return `${cycle} ${year || ordre || ''}`.trim();
};

const formatMoney = (value) => {
  return new Intl.NumberFormat('fr-FR').format(value || 0) + ' FCFA';
};

/* =====================
   Lifecycle
===================== */
onMounted(async () => {
  // Récupère les classes détaillées depuis l’API
  await classeStore.fetchClassesDetails();
});
</script>
