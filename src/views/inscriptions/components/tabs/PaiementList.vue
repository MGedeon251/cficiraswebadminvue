<template>
  <div>
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="d-flex align-items-end flex-wrap">
          <div class="me-md-3 me-xl-5">
            <h5>Suivi des paiements</h5>
          </div>
        </div>
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-end flex-wrap">
            <div class="me-md-4 me-xl-5">
              <div class="filters d-flex gap-2 mb-3">
                <a-input
                  class="me-1 mt-1 mt-xl-0"
                  v-model:value="searchQuery"
                  placeholder="Rechercher..."
                  allow-clear
                  style="width: 180px"
                >
                  <template #prefix>
                    <i class="mdi mdi-magnify" />
                  </template>
                </a-input>
                <a-select
                  class="me-1 mt-1 mt-xl-0"
                  v-model:value="selectedAnnee"
                  placeholder="Année académique"
                  style="width: 180px"
                  :loading="loadingAnnees"
                  allow-clear
                >
                  <a-select-option value="lucy">lucy</a-select-option>
                </a-select>
                <a-select
                  v-model:value="selectedFiliere"
                  placeholder="Filiere"
                  style="width: 180px"
                  :loading="loadingFilieres"
                  allow-clear
                >
                  <a-select-option value="lucy">lucy</a-select-option>
                </a-select>
              </div>
            </div>
          </div>
        </div>
        <div class="table-responsive mt-3">
          <table class="table table-hover align-middle">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Etudiants</th>
                <th scope="col">classe</th>
                <th scope="col">montant</th>
                <th scope="col">statut</th>
              </tr>
            </thead>
            <tbody>
                <tr v-for="p in paiements" :key="p.id">
                    <td>{{ p.id }}</td>
                    <td>{{ p.nom }}</td>
                    <td>{{ p.classe }}</td>
                    <td>{{ p.montant }} FCFA</td>
                    <td>
                    <span :class="['status-badge', p.statut]">{{ p.statut }}</span>
                    </td>
                </tr>
                <tr v-if="paiements.length === 0">
                    <td colspan="5" class="text-center py-4">
                    <div class="d-flex flex-column align-items-center">
                        <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" />
                    </div>
                    <div class="text-pr">Aucune donnée </div>
                    </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup="setup">
const paiements = [
  {
    id: 1,
    nom: 'Dupont Jean',
    classe: 'L1 Info',
    montant: 20000,
    statut: 'Payé',
  },
  {
    id: 2,
    nom: 'Mbala Marie',
    classe: 'L2 Math',
    montant: 0,
    statut: 'Non payé',
  },
  {
    id: 3,
    nom: 'Kouadio Alain',
    classe: 'L1 Info',
    montant: 10000,
    statut: 'En attente',
  },
];
</script>

<style scoped="scoped">
.status-badge {
  padding: 0.3em 0.8em;
  border-radius: 20px;
  color: #fff;
}
.Payé {
  background-color: #28a745;
}
</style>
