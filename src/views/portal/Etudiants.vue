<template>
    <div>
        <sidebar>
            <div class="row">
                <div class="col-md-12 grid-margin">
                    <div class="d-flex justify-content-between flex-wrap">
                        <div class="d-flex align-items-end flex-wrap">
                            <div class="me-md-3 me-xl-5">
                                <h2>Portail Etudiants</h2>
                                <p class="mb-md-0">Gestion des etudiants</p>
                            </div>
                        <div class="d-flex">
                            <i class="mdi mdi-home text-muted hover-cursor"></i>
                            <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Portail&nbsp;/&nbsp;</p>
                            <p class="text-primary mb-0 hover-cursor">Etudiants</p>
                        </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-end flex-wrap">
                        </div>
                    </div>
                </div>
            </div>
  
        <div class="row">
            <div class="col-md-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Liste des Etudiants</h4>
                        <SkeletonLoader v-if="loading" type="table" :rows="3" :columns="1"/>
                        <div v-else class="table-responsive">
                            <p class="card-description">Liste des etudiants inscrits</p>
                            <div class="d-flex justify-content-between flex-wrap">
                               <div class="d-flex justify-content-between align-items-end flex-wrap">
                                                <button class="btn btn-outline-dark me-2">Exporter</button>
                                                <button class="btn btn-outline-dark me-2">Exporter</button>
                                                <button
                                                    class="btn btn-primary mt-2 mt-xl-0"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#exampleModal">
                                                    Ajouter
                                                </button>
                                            </div> 
                            </div>
                            
                            <table class="table table-hover align-middle">
                                    <thead>
                                    <tr>
                                        <th>Matricule</th>
                                        <th>Nom</th>
                                        <th>Prenom</th>
                                        <th>Email</th>
                                        <th>Telephone</th>
                                        <th>Filiere</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                      <td colspan="9" class="text-center py-4">
                                          <div class="d-flex flex-column align-items-center">
                                            <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" width="auto"/>
                                          </div>
                                          <div class="text-pr">Aucune donnée</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>   
        </sidebar>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import sidebar from '@/components/Header.vue'
import SkeletonLoader from '@/components/SkeletonLoader.vue';
  
  const loading = ref(true);
  const formateurs = ref([]);
  
  onMounted(() => {
    setTimeout(() => {
      formateurs.value = [
        { id: 1, matricule: 'F001', nom: 'Doe', prenom: 'John', email: 'john@example.com', telephone: '0123456789' },
        { id: 2, matricule: 'F002', nom: 'Smith', prenom: 'Anna', email: 'anna@example.com', telephone: '0987654321' },
      ];
      loading.value = false;
    }, 3000);
  });
</script>