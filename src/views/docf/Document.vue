<script setup>
import sidebar from '@/components/Header.vue';
import { ref, onMounted } from 'vue';

// Liste des factures (vide au départ)
const factures = ref([]);
// Simulation du chargement (optionnel)
onMounted(() => {
  setTimeout(() => {
    factures.value = []; // Laisser vide pour tester l'affichage "Aucune donnée"
  }, 1500);
});
</script>

<template>
  <div class="row">
    <div class="col-md-12 grid-margin">
      <div class="d-flex justify-content-between flex-wrap">
        <div class="d-flex align-items-end flex-wrap">
          <div class="me-md-3 me-xl-5">
            <h2>Documents académiques</h2>
            <p class="mb-md-0">Gestion des demandes de documents académiques</p>
          </div>
          <div class="d-flex">
            <i class="mdi mdi-home text-muted hover-cursor"></i>
            <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Portail&nbsp;/&nbsp;</p>
            <p class="text-primary mb-0 hover-cursor">Etudiants</p>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-end flex-wrap"></div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="container my-2">
      <div class="col-md-12 grid margin stretch-card">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h2 class="h4">Liste des demandes</h2>
              <div class="d-flex justify-content-between align-items-end flex-wrap">
                <button class="btn btn-outline-dark me-2">Exporter</button>
                <button
                  class="btn btn-primary mt-2 mt-xl-0"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Nouvelle demandes
                </button>
              </div>
            </div>

            <div class="table-responsive">
              <table class="table table-striped">
                <thead class="table-gray">
                  <tr>
                    <th>Numéro</th>
                    <th>Client</th>
                    <th>Date</th>
                    <th>Date d'expiration</th>
                    <th>Total</th>
                    <th>Payé</th>
                    <th>Statut</th>
                    <th>Paiement</th>
                    <th>Créé par</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Aucune donnée -->
                  <tr v-if="factures.length === 0">
                    <td colspan="9" class="text-center py-4">
                      <div class="d-flex flex-column align-items-center">
                        <div class="ant-empty-image">
                          <svg
                            width="64"
                            height="41"
                            viewBox="0 0 64 41"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <title>Aucune donnée</title>
                            <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
                              <ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse>
                              <g fill-rule="nonzero" stroke="#d9d9d9">
                                <path
                                  d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
                                ></path>
                                <path
                                  d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                                  fill="#fafafa"
                                ></path>
                              </g>
                            </g>
                          </svg>
                        </div>
                        <div class="ant-empty-description">Aucune donnée</div>
                      </div>
                    </td>
                  </tr>

                  <!-- Affichage des factures -->
                  <tr v-for="facture in factures" :key="facture.id">
                    <td>{{ facture.numero }}</td>
                    <td>{{ facture.client }}</td>
                    <td>{{ facture.date }}</td>
                    <td>{{ facture.expiration }}</td>
                    <td>{{ facture.total }}€</td>
                    <td>{{ facture.paye ? 'Oui' : 'Non' }}</td>
                    <td>{{ facture.statut }}</td>
                    <td>{{ facture.paiement }}</td>
                    <td>{{ facture.creePar }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Optionnel : Animation d’apparition */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}
</style>
