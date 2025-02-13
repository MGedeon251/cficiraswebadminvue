<template>
    <div>
        <sidebar>
            <div class="row">
                <div class="container my-2">
                    <div class="col-md-12 grid margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                                <h2>Liste des Formateurs</h2>

                                <SkeletonLoader v-if="loading" type="table" :rows="3" :columns="1"/>
                                <table v-else class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Matricule</th>
                                            <th>Nom</th>
                                            <th>Prénom</th>
                                            <th>Email</th>
                                            <th>Téléphone</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="formateur in formateurs" :key="formateur.id">
                                            <td>{{ formateur.matricule }}</td>
                                            <td>{{ formateur.nom }}</td>
                                            <td>{{ formateur.prenom }}</td>
                                            <td>{{ formateur.email }}</td>
                                            <td>{{ formateur.telephone }}</td>
                                            <td>...</td>
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
  