<template>
    <div class="row">
        <div class="container my-2">
            <h4>Calendrier</h4>
            <p class="text-muted">Planifications et repartitions des salles matieres</p>

            <div class="card p-4">
                <div class="card-body dashboard-tabs p-0">
                    <h4 class="card-title">Planification</h4>
                    <p class="card-description"></p>

                    <div class="d-flex gap-2 mb-3">
                        <div class="d-flex justify-content-between align-items-end flex-wrap">
                            <button
                                type="button"
                                class="btn btn-outline-dark btn-icon me-2 d-none d-md-block ">
                                <i class="mdi mdi-filter"></i>
                            </button>
                            <button
                                type="button"
                                class="btn btn-outline-dark btn-icon me-2 d-none d-md-block"
                                @click="">
                                <i class="mdi mdi-alert-circle"></i>
                            </button>
                            <button
                                class="btn btn-primary mt-2 mt-xl-0"
                                data-bs-toggle="modal"
                                data-bs-target="#addPlanningModal">
                                + Ajouter
                            </button>
                        </div>
                        <addPlanning @examen-ajoute="ajouterExamen"/>
                    </div>

                    <table class="table table-hover table-nowrap mb-0">
                        <thead>
                            <tr>
                                <th>designation</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(exam, index) in examens" :key="index">
                                <td>{{ exam.designation }}</td>
                                <td>{{ exam.type_session }}</td>
                                <td>{{ exam.semestre }}</td>
                                <td>{{ exam.date_debut }}</td>
                                <td>
                                    <ItemActions
                                        :item="exam"
                                        moduleRoute="/calendrier"
                                        :showAdd="false"
                                        editModalTarget="#editExamModal"
                                        @edit="editExam"
                                        @delete="confirmDelete"
                                    />
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
    import addPlanning from './modal/AddPlanning.vue'; // Assure-toi que le chemin est correct
    import ItemActions from '@/components/ItemActions.vue'; // Assure-toi que le chemin est correct
    
    import {ref} from 'vue';
    const examens = ref([]);
    function ajouterExamen(nouvelExamen) {
  examens.value.push(nouvelExamen);
}
</script>
