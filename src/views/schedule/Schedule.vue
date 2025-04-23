<template>
    <div>
            <div class="row">
                <div class="col-md-12 grid-margin">
                    <div class="d-flex justify-content-between flex-wrap">
                        <div class="d-flex align-items-end flex-wrap">
                            <div class="me-md-3 me-xl-5">
                                <h2>Emploi du temps
                                </h2>
                                <p class="mb-md-0">Emploi du temps génerale</p>
                            </div>
                            <div class="d-flex">
                                <i class="mdi mdi-home text-muted hover-cursor"></i>
                                <p class="text-muted mb-0 hover-cursor">&nbsp;/&nbsp;Schedule&nbsp;/&nbsp;</p>
                                <p class="text-primary mb-0 hover-cursor">Analytics</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-end flex-wrap"></div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Planing Journalier | Hebdomadaire
                            </h4>
                            <p>Listes des matiere journalier et hebdomadaire pour une année académique
                            </p>
                            <SkeletonLoader v-if="loading" type="table" :rows="3" :columns="1"/> 
                            <div v-else>
                                <div class="d-flex mt-4">
                                        <div class="d-flex align-items-end flex-wrap">
                                            <div class="me-md-4 me-xl-5">
                                                <div class="filters d-flex gap-2 mb-2">
                                                    <div class="col-md-4">
                                                        <select class="form-select">
                                                            <option value="year">2022-2023</option>
                                                            <option value="year">2023-2024</option>
                                                            <option value="year">2024-2025</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <select class="form-select">
                                                            <option key="classItem" value="classItem">LAP 1
                                                            </option>
                                                            <option key="classItem" value="classItem">LAP 2
                                                            </option>
                                                            <option key="classItem" value="classItem">LAP 3
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <select class="form-select">
                                                            <option value="all" selected>Tout semestres</option>
                                                            <option value="paid">Semestre 1</option>
                                                            <option value="unpaid">Semestre 2</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                
                                <ul 
                                class="nav nav-pills nav-pills-custom mt-4"
                                id="pills-tab-custom"
                                role="tablist">
                                <li class="nav-item">
                                    <a
                                        class="nav-link active"
                                        id="pills-home-tab-custom"
                                        data-bs-toggle="pill"
                                        href="#pills-health"
                                        role="tab"
                                        aria-controls="pills-home"
                                        aria-selected="true">
                                        Lundi
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a
                                        class="nav-link"
                                        id="pills-profile-tab-custom"
                                        data-bs-toggle="pill"
                                        href="#pills-career"
                                        role="tab"
                                        aria-controls="pills-profile"
                                        aria-selected="false">
                                        Mardi
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a
                                        class="nav-link"
                                        id="pills-contact-tab-custom"
                                        data-bs-toggle="pill"
                                        href="#pills-music"
                                        role="tab"
                                        aria-controls="pills-contact"
                                        aria-selected="false">
                                        Mercredi
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a
                                        class="nav-link"
                                        id="pills-vibes-tab-custom"
                                        data-bs-toggle="pill"
                                        href="#pills-vibes"
                                        role="tab"
                                        aria-controls="pills-contact"
                                        aria-selected="false">
                                        Jeudi
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a
                                        class="nav-link"
                                        id="pills-energy-tab-custom"
                                        data-bs-toggle="pill"
                                        href="#pills-energy"
                                        role="tab"
                                        aria-controls="pills-contact"
                                        aria-selected="false">
                                        Vendredi
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a
                                        class="nav-link"
                                        id="pills-energy-tab-custom"
                                        data-bs-toggle="pill"
                                        href="#pills-energy"
                                        role="tab"
                                        aria-controls="pills-contact"
                                        aria-selected="false">
                                        Samedi
                                    </a>
                                </li>
                            </ul>
                            <div class="tab-content tab-content-custom-pill" id="pills-tabContent-custom">

                                <div
                                    class="tab-pane fade show active"
                                    id="pills-health"
                                    role="tabpanel"
                                    aria-labelledby="pills-home-tab-custom">
                                    <div class="table-responsive">
                                        <table class="table table-hover align-middle">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Horaire</th>
                                                    <th scope="col">Classe</th>
                                                    <th scope="col">Semestre</th>
                                                    <th scope="col">Matiere</th>
                                                    <th scope="col">Formateur</th>
                                                    <th scope="col"></th>
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
                                <div
                                    class="tab-pane fade"
                                    id="pills-career"
                                    role="tabpanel"
                                    aria-labelledby="pills-profile-tab-custom">
                                    <div class="media">
                                            <div class="media-body">
                                                <p>I'm thinking two circus clowns dancing. You? Finding a needle in a haystack
                                                    isn't hard when every straw is computerized. Tell him time is of the essence.
                                                    Somehow, I doubt that. You have a good heart, Dexter.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="tab-pane fade"
                                        id="pills-music"
                                        role="tabpanel"
                                        aria-labelledby="pills-contact-tab-custom">
                                        <div class="media">
                                            <img
                                                class="me-3 w-25 rounded"
                                                src="../../../assets/images/samples/300x300/14.jpg"
                                                alt="sample image">
                                                <div class="media-body">
                                                    <p>
                                                        I'm really more an apartment person. This man is a knight in shining armor. Oh I
                                                        beg to differ, I think we have a lot to discuss. After all, you are a client.
                                                        You all right, Dexter?
                                                    </p>
                                                    <p>
                                                        I'm generally confused most of the time. Cops, another community I'm not part
                                                        of. You're a killer. I catch killers. Hello, Dexter Morgan.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            class="tab-pane fade"
                                            id="pills-vibes"
                                            role="tabpanel"
                                            aria-labelledby="pills-vibes-tab-custom">
                                            <div class="media">
                                                <img
                                                    class="me-3 w-25 rounded"
                                                    src="../../../assets/images/samples/300x300/15.jpg"
                                                    alt="sample image">
                                                    <div class="media-body">
                                                        <p>
                                                            This man is a knight in shining armor. I feel like a jigsaw puzzle missing a
                                                            piece. And I'm not even sure what the picture should be. Somehow, I doubt that.
                                                            You have a good heart, Dexter. Keep your mind limber.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="tab-pane fade"
                                                id="pills-energy"
                                                role="tabpanel"
                                                aria-labelledby="pills-energy-tab-custom">
                                                <div class="media">
                                                    <img
                                                        class="me-3 w-25 rounded"
                                                        src="../../../assets/images/samples/300x300/11.jpg"
                                                        alt="sample image">
                                                        <div class="media-body">
                                                            <p>
                                                                Finding a needle in a haystack isn't hard when every straw is computerized.
                                                                You're a killer. I catch killers. I will not kill my sister. I will not kill my
                                                                sister. I will not kill my sister. Rorschach would say you have a hard time
                                                                relating to others.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
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