<template>
  <div class="container-fluid p-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="fw-bold">Répertoire des Étudiants</h4>
      <button class="btn btn-primary"><i class="bi bi-person-plus me-2"></i>Inscrire un étudiant</button>
    </div>

    <!-- Filtres de recherche -->
    <div class="card border-0 shadow-sm mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-4">
            <input v-model="searchQuery" type="text" class="form-control" placeholder="Rechercher par nom ou matricule...">
          </div>
          <div class="col-md-3">
            <select v-model="filtreClasse" class="form-select">
              <option value="">Toutes les classes</option>
              <option v-for="c in classes" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
          <div class="col-md-3">
            <select v-model="filtreStatut" class="form-select">
              <option value="">Tous les statuts</option>
              <option value="Inscrit">Inscrit</option>
              <option value="En attente">En attente</option>
            </select>
          </div>
          <div class="col-md-2 text-end">
            <button class="btn btn-outline-secondary w-100" @click="resetFilters">Réinitialiser</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tableau des Étudiants -->
    <div class="card border-0 shadow-sm">
      <div class="card-body p-0">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th class="ps-4">Étudiant</th>
              <th>Classe</th>
              <th>Moyenne</th>
              <th>Paiement</th>
              <th>Statut</th>
              <th class="text-end pe-4">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="std in etudiantsFiltrés" :key="std.id" style="cursor: pointer" @click="voirDossier(std.id)">
              <td class="ps-4">
                <div class="d-flex align-items-center">
                  <div class="avatar me-3 bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style="width: 40px; height: 40px;">
                    {{ std.nom.charAt(0) }}{{ std.prenom.charAt(0) }}
                  </div>
                  <div>
                    <span class="fw-bold d-block">{{ std.nom }} {{ std.prenom }}</span>
                    <small class="text-muted">{{ std.matricule }}</small>
                  </div>
                </div>
              </td>
              <td>{{ std.classe }}</td>
              <td><span class="fw-bold">{{ std.moyenne }}</span>/20</td>
              <td>
                <div class="progress" style="height: 6px; width: 100px;">
                  <div class="progress-bar bg-success" :style="{ width: std.tauxPaiement + '%' }"></div>
                </div>
                <small class="text-muted">{{ std.tauxPaiement }}% réglé</small>
              </td>
              <td>
                <span :class="['badge rounded-pill', std.statut === 'Inscrit' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning']">
                  {{ std.statut }}
                </span>
              </td>
              <td class="text-end pe-4">
                <button class="btn btn-sm btn-light border">Voir Dossier</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'; // Si tu utilises Vue Router

const router = useRouter();
const searchQuery = ref('');
const filtreClasse = ref('');
const filtreStatut = ref('');

const classes = ['Licence 1', 'Licence 2', 'Licence 3', 'Master 1', 'Master 2'];

const etudiants = ref([
  { id: 1, matricule: 'STUD-001', nom: 'KABORE', prenom: 'Ousmane', classe: 'Licence 3', moyenne: 14.5, tauxPaiement: 70, statut: 'Inscrit' },
  { id: 2, matricule: 'STUD-002', nom: 'DIOP', prenom: 'Fatou', classe: 'Licence 2', moyenne: 16.2, tauxPaiement: 100, statut: 'Inscrit' },
  { id: 3, matricule: 'STUD-003', nom: 'TRAORE', prenom: 'Moussa', classe: 'Licence 3', moyenne: 11.0, tauxPaiement: 40, statut: 'En attente' },
]);

const etudiantsFiltrés = computed(() => {
  return etudiants.value.filter(s => {
    const matchSearch = (s.nom + s.prenom + s.matricule).toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchClasse = !filtreClasse.value || s.classe === filtreClasse.value;
    const matchStatut = !filtreStatut.value || s.statut === filtreStatut.value;
    return matchSearch && matchClasse && matchStatut;
  });
});

const voirDossier = (id) => {
  // Ici on navigue vers la vue détaillée que nous avons créée
  // router.push(`/etudiant/${id}`);
  console.log("Naviguer vers le dossier de l'étudiant ID:", id);
};
</script>