<template>
  <div class="row">
    <!-- Section Haut : Statistiques rapides -->
    <div class="col-12 mb-4">
      <div class="card border-0 shadow-sm bg-light">
        <div class="card-body py-2">
          <div class="row text-center align-items-center">
            <div class="col-md-3 border-end">
              <p class="text-muted small mb-0">Total Absences</p>
              <h4 class="fw-bold mb-0 text-danger">{{ absences.length }}</h4>
            </div>
            <div class="col-md-3 border-end">
              <p class="text-muted small mb-0">Dont Justifiées</p>
              <h4 class="fw-bold mb-0 text-success">{{ absencesJustifiees }}</h4>
            </div>
            <div class="col-md-3 border-end">
              <p class="text-muted small mb-0">Retards</p>
              <h4 class="fw-bold mb-0 text-warning">4</h4>
            </div>
            <div class="col-md-3">
              <p class="text-muted small mb-0">Avertissements</p>
              <h4 class="fw-bold mb-0">{{ sanctions.length }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section Gauche : Registre des Absences -->
    <div class="col-md-7">
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <h6 class="m-0 fw-bold"><i class="bi bi-calendar-x me-2"></i>Registre des Absences & Retards</h6>
          <button class="btn btn-sm btn-outline-primary">Signaler une absence</button>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th class="ps-4">Date & Heure</th>
                  <th>Type</th>
                  <th>Matière</th>
                  <th>Statut</th>
                  <th class="text-end pe-4">Justification</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in absences" :key="index">
                  <td class="ps-4">
                    <span class="d-block fw-medium small">{{ item.date }}</span>
                    <small class="text-muted">{{ item.creneau }}</small>
                  </td>
                  <td>
                    <span :class="['badge rounded-pill', item.type === 'Absence' ? 'bg-danger-subtle text-danger' : 'bg-warning-subtle text-warning']">
                      {{ item.type }}
                    </span>
                  </td>
                  <td class="small">{{ item.matiere }}</td>
                  <td>
                    <i v-if="item.justifie" class="bi bi-check-circle-fill text-success" title="Justifiée"></i>
                    <i v-else class="bi bi-x-circle-fill text-danger" title="Non justifiée"></i>
                  </td>
                  <td class="text-end pe-4">
                    <button v-if="!item.justifie" class="btn btn-sm btn-link p-0 text-decoration-none">Ajouter</button>
                    <span v-else class="small text-muted text-truncate d-inline-block" style="max-width: 100px;">
                      {{ item.motif }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Section Droite : Discipline & Sanctions -->
    <div class="col-md-5">
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <h6 class="m-0 fw-bold text-danger"><i class="bi bi-shield-exclamation me-2"></i>Mesures Disciplinaires</h6>
          <button class="btn btn-sm btn-danger"><i class="bi bi-plus-lg"></i></button>
        </div>
        <div class="card-body">
          <div v-if="sanctions.length > 0" class="vertical-timeline">
            <div v-for="(sanc, idx) in sanctions" :key="idx" class="pb-3 border-start ps-3 position-relative ms-2">
              <div class="dot position-absolute start-0 translate-middle-x bg-danger rounded-circle" style="width: 10px; height: 10px; margin-left: -1px; margin-top: 6px;"></div>
              <div class="d-flex justify-content-between">
                <span class="badge bg-danger mb-2">{{ sanc.type }}</span>
                <small class="text-muted">{{ sanc.date }}</small>
              </div>
              <h6 class="fw-bold mb-1">{{ sanc.motif }}</h6>
              <p class="small text-muted mb-0">Décision : {{ sanc.decision }}</p>
            </div>
          </div>
          <div v-else class="text-center py-4">
            <i class="bi bi-emoji-smile fs-2 text-success"></i>
            <p class="text-muted small mt-2">Aucune sanction enregistrée pour le moment.</p>
          </div>
        </div>
      </div>

      <!-- Notes de comportement -->
      <div class="card border-0 shadow-sm mt-4">
        <div class="card-body">
          <h6 class="fw-bold mb-3 small text-uppercase">Observation Générale</h6>
          <textarea class="form-control form-control-sm bg-light border-0" rows="3" placeholder="Note sur le comportement de l'élève..."></textarea>
          <button class="btn btn-sm btn-primary mt-2 w-100">Enregistrer l'observation</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const absences = ref([
  { date: "15/04/2026", creneau: "08:00 - 10:00", type: "Absence", matiere: "Algorithmique", justifie: true, motif: "Certificat Médical" },
  { date: "12/04/2026", creneau: "14:00 - 16:00", type: "Absence", matiere: "Anglais", justifie: false, motif: "" },
  { date: "10/04/2026", creneau: "08:15", type: "Retard", matiere: "Réseaux", justifie: true, motif: "Transport" },
  { date: "05/04/2026", creneau: "10:00 - 12:00", type: "Absence", matiere: "Base de données", justifie: false, motif: "" },
]);

const sanctions = ref([
  { date: "20/03/2026", type: "Avertissement", motif: "Bavardages répétés", decision: "Rencontre avec les parents" },
  { date: "10/01/2026", type: "Blâme", motif: "Plagiat sur un projet", decision: "Note de 0/20 sur le TP" },
]);

const absencesJustifiees = computed(() => {
  return absences.value.filter(a => a.justifie && a.type === 'Absence').length;
});
</script>

<style scoped>
.border-start {
  border-left: 2px solid #dee2e6 !important;
}
.dot {
  z-index: 2;
}
.bg-danger-subtle { background-color: #f8d7da; }
.bg-warning-subtle { background-color: #fff3cd; }
.bg-success-subtle { background-color: #d1e7dd; }
</style>