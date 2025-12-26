<!-- CyclesContent.vue -->
<template>
  <div>
    <!-- Statistiques rapides -->
      <div class="col-12 mb-2">
      <h4>Statistiques des cycles</h4>
      <p class="text-muted">
        Indicateurs globaux liés aux cycles et à l’activité académique.
      </p>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered table-striped mb-5">
        <thead>
          <tr>
            <th>cycles au total</th>
            <th>cycles actif</th>
            <th>filieres associées</th>
            <th>etudiants inscrits</th>
            <th>Notes saisies</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="9" class="text-center py-4">
              <div class="d-flex flex-column align-items-center">
                <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" />
              </div>
              <div class="text-pr">Aucune donnée</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Statistiques
const totalCycles = ref(3);
const cyclesActifs = ref(3);
const totalFilieres = ref(12);
const totalEtudiants = ref(1450);

// Filtres
const searchQuery = ref('');
const filterStatut = ref('');
const filterNiveau = ref('');

// Données
const cycles = ref([
  {
    id: 1,
    code: 'L',
    nom: 'Licence',
    nomComplet: 'Licence Professionnelle',
    type: 'licence',
    duree: 3,
    diplome: 'Licence (BAC+3)',
    nombreFilieres: 5,
    nombreEtudiants: 850,
    creditsECTS: 180,
    statut: 'actif',
  },
  {
    id: 2,
    code: 'M',
    nom: 'Master',
    nomComplet: 'Master Recherche et Professionnel',
    type: 'master',
    duree: 2,
    diplome: 'Master (BAC+5)',
    nombreFilieres: 4,
    nombreEtudiants: 450,
    creditsECTS: 120,
    statut: 'actif',
  },
  {
    id: 3,
    code: 'D',
    nom: 'Doctorat',
    nomComplet: 'Doctorat / PhD',
    type: 'doctorat',
    duree: 3,
    diplome: 'Doctorat (BAC+8)',
    nombreFilieres: 3,
    nombreEtudiants: 150,
    creditsECTS: 180,
    statut: 'actif',
  },
]);

const formData = ref({
  code: '',
  nom: '',
  nomComplet: '',
  type: 'licence',
  duree: 3,
  diplome: '',
  description: '',
  creditsECTS: 180,
  statut: 'actif',
});

// Computed
const filteredCycles = computed(() => {
  return cycles.value.filter((cycle) => {
    const matchSearch =
      cycle.nom.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      cycle.code.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchStatut = !filterStatut.value || cycle.statut === filterStatut.value;
    return matchSearch && matchStatut;
  });
});

// Méthodes
const getCycleIcon = (type) => {
  const icons = {
    licence: 'mdi mdi-school text-primary',
    master: 'mdi mdi-school-outline text-success',
    doctorat: 'mdi mdi-certificate text-warning',
  };
  return icons[type] || 'mdi mdi-school';
};

const getStatutClass = (statut) => {
  const classes = {
    actif: 'status-badge status-active',
    inactif: 'status-badge status-inactive',
    brouillon: 'status-badge status-draft',
  };
  return classes[statut] || 'status-badge';
};

const getStatutLabel = (statut) => {
  const labels = {
    actif: 'Actif',
    inactif: 'Inactif',
    brouillon: 'Brouillon',
  };
  return labels[statut] || statut;
};

const resetFilters = () => {
  searchQuery.value = '';
  filterStatut.value = '';
  filterNiveau.value = '';
};

const applyFilters = () => {
  console.log('Filtres appliqués');
};

const exportData = () => {
  console.log('Export des cycles');
};

const voirDetails = (cycle) => {
  console.log('Voir détails:', cycle);
};

const modifierCycle = (cycle) => {
  console.log('Modifier:', cycle);
};

const supprimerCycle = (cycle) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer le cycle ${cycle.nom} ?`)) {
    console.log('Supprimer:', cycle);
  }
};

const enregistrerCycle = () => {
  console.log('Enregistrer:', formData.value);
};
</script>

<style scoped>
.stat-card {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon i {
  font-size: 28px;
}

.stat-content h3 {
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
  color: #2c3e50;
}

.stat-content p {
  margin: 0;
  color: #6c757d;
  font-size: 0.9rem;
}

.bg-primary-soft {
  background-color: rgba(0, 123, 255, 0.1);
}
.bg-success-soft {
  background-color: rgba(40, 167, 69, 0.1);
}
.bg-info-soft {
  background-color: rgba(23, 162, 184, 0.1);
}
.bg-warning-soft {
  background-color: rgba(255, 193, 7, 0.1);
}

.cycle-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 123, 255, 0.1);
}

.cycle-icon i {
  font-size: 20px;
}
</style>
