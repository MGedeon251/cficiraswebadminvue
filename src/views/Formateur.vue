<script setup>
import sidebar from '@/components/Header.vue'
</script>

<template>
    <div>
        <sidebar>
            <div class="row">
                <div class="col-md-12 grid-margin">
                    <div class="d-flex justify-content-between flex-wrap">
                        <div class="d-flex align-items-end flex-wrap">
                            <div class="me-md-3 me-xl-5">
                                <h2>Enseignants | Formateur</h2>
                                <p class="mb-md-0">Gestion des formateurs et enseignant</p>
                            </div>
                        <div class="d-flex">
                            <i class="mdi mdi-home text-muted hover-cursor"></i>
                            <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Formateur&nbsp;/&nbsp;</p>
                            <p class="text-primary mb-0 hover-cursor">Analytics</p>
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
                        <h4 class="card-title">Liste des Formateurs</h4>
                        <p class="card-description">Liste de formateurs actifs </p>
                        <div class="table-responsive">
                            <div v-if="loading" class="skeleton-loader">
                                    <div class="skeleton-item" v-for="i in 5" :key="i"></div>
                                    </div>
                                <div v-else class="mt-3">
                                    <table class="table table-hover align-middle">
                                    <thead>
                                    <tr>
                                        <th>Matricule</th>
                                        <th>Nom</th>
                                        <th>Prenom</th>
                                        <th>Email</th>
                                        <th>Telephone</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                      <td colspan="9" class="text-center py-4" style="width: 1020px; position: sticky; left: 0px; overflow: hidden;">
                                          <div class="d-flex flex-column align-items-center">
                                            <img src="/img/empty-box.svg" alt="Aucune donnée" class="mb-2" width="64" height="41" />
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

        </div>

            
        </sidebar>
    </div>
</template>
<script>
export default {
  name: "Setting",
  data() {
    return {
      email: "gedeon.lekounda@gmail.com",
      selectedTheme: "light",
      loading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
};
</script>
<style scoped>
.container {
  max-width: 800px;
}
.skeleton-loader {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.skeleton-item {
  height: 20px;
  background: #f3f3f3;
  border-radius: 4px;
  animation: pulse 1.5s infinite ease-in-out;
}
@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}
</style>