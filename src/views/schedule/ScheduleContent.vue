<template>
  <div class="tab-content tab-content-custom-pill mt-3">
    <div v-for="day in days" :key="day.id">
      <div v-show="activeTab === day.id" class="tab-pane fade show active">
        <div class="table-responsive">
          <table class="table table-hover align-middle">
            <thead>
              <tr>
                <th>Horaire</th>
                <th>Classe</th>
                <th>Type</th>
                <th>Matière</th>
                <th>Formateur</th>
                <th>Semestre</th>
                <th>Salle</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="9" class="text-center py-4">
                  <div class="d-flex flex-column align-items-center">
                    <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" />
                  </div>
                  <div class="text-pr">Aucune donnée pour {{ day.label }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activeTab: String,
  },
  data() {
    return {
      days: [
        { id: 'lundi', label: 'Lundi' },
        { id: 'mardi', label: 'Mardi' },
        { id: 'mercredi', label: 'Mercredi' },
        { id: 'jeudi', label: 'Jeudi' },
        { id: 'vendredi', label: 'Vendredi' },
        { id: 'samedi', label: 'Samedi' },
      ],
    };
  },
};
</script>
