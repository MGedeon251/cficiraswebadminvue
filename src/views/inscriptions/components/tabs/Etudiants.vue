<template>
    <div>
        <div class="row">
            <div class="col-md-12 grid-margin">
                <div class="d-flex justify-content-between flex-wrap">
                    <div class="d-flex align-items-end flex-wrap">
                        <div class="me-md-3 me-xl-5">
                            <h3>Inscription et reinscription</h3>
                            <p>Inscription & reinscription pour une année académique</p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-end flex-wrap">
                        <button class="btn btn-outline-dark me-2">Exporter</button>
                        <div class="btn-group">
                            <button
                                class="btn btn-primary mt-2 mt-xl-0"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal">
                                + Ajouter
                            </button>
                            <button
                                class="btn btn-primary dropdown-toggle dropdown-toggle-split"
                                data-bs-toggle="dropdown">
                                <span class="visually-hidden">Toggle Dropdown</span>
                            </button>
                            <ul class="dropdown-menu">
                                <li>
                                    <a class="dropdown-item" href="#drag-drop-area">Importer fichier</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="table-responsive mt-3">
                    <table class="table table-hover align-middle">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>matricule</th>
                                <th>nom</th>
                                <th>prenom</th>
                                <th>telephone</th>
                                <th>Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="candidat in candidats" :key="candidat.id">
                                <td>{{ candidat.id }}</td>
                                <td>{{ candidat.matricule }}</td>
                                <td>{{ candidat.nom }}</td>
                                <td>{{ candidat.prenom }}</td>
                                <td>{{ candidat.telephone }}</td>
                                <td>{{ candidat.statut }}</td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup="setup">
    import {ref, onMounted} from 'vue';
    const candidats = ref([]);

    onMounted(() => {
        candidats.value = [
            { id: 1, matricule: 'MAT2025101', nom: 'Kouadio', prenom: 'Eric', telephone: '0102030405', statut: 'En attente' },
            { id: 2, matricule: 'MAT2025102', nom: 'Yao', prenom: 'Marie', telephone: '0605040302', statut: 'Admis' },
            { id: 3, matricule: 'MAT2025103', nom: 'Koffi', prenom: 'Serge', telephone: '0708091011', statut: 'Refusé' },
            { id: 4, matricule: 'MAT2025104', nom: 'N’Guessan', prenom: 'Aline', telephone: '0203040506', statut: 'En attente' },
            { id: 5, matricule: 'MAT2025105', nom: 'Bamba', prenom: 'Moussa', telephone: '0807060504', statut: 'Admis' },
            { id: 6, matricule: 'MAT2025106', nom: 'Coulibaly', prenom: 'Fatou', telephone: '0908070605', statut: 'Refusé' },
            { id: 7, matricule: 'MAT2025107', nom: 'Fofana', prenom: 'Salif', telephone: '0302010405', statut: 'En attente' },
            { id: 8, matricule: 'MAT2025108', nom: 'Cissé', prenom: 'Awa', telephone: '0504030201', statut: 'Admis' },
            { id: 9, matricule: 'MAT2025109', nom: 'Sangaré', prenom: 'Kader', telephone: '0607080910', statut: 'Refusé' },
            { id: 10, matricule: 'MAT2025110', nom: 'Diabaté', prenom: 'Aminata', telephone: '0105060708', statut: 'En attente' }
        ];
    });
</script>