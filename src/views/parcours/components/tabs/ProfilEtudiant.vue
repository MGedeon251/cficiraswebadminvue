<template>
  <div class="row">
    <!-- Colonne de Gauche : Photo et État civil -->
    <div class="col-md-4">
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body text-center">
          <div class="mb-3">
            <!-- Placeholder pour la photo de l'étudiant -->
            <img 
              src="https://tse3.mm.bing.net/th/id/OIP.i4YH9hPP_yM3nXMIQDDkQwHaLL?pid=ImgDet&w=474&h=715&rs=1&o=7&rm=3" 
              alt="Photo de l'étudiant" 
              class="rounded-circle img-thumbnail"
              style="width: 150px; height: 150px; object-fit: cover;"
            >
          </div>
          <h4 class="fw-bold mb-1">{{ etudiant.nom }} {{ etudiant.prenom }}</h4>
          <p class="text-muted small mb-3">Matricule : <span class="badge bg-primary">{{ etudiant.matricule }}</span></p>
          
          <div class="d-grid gap-2">
            <button class="btn btn-outline-primary btn-sm">Modifier la photo</button>
          </div>
        </div>
      </div>

      <div class="card border-0 shadow-sm">
        <div class="card-body">
          <h6 class="fw-bold border-bottom pb-2 mb-3 text-uppercase small">État Civil</h6>
          <ul class="list-unstyled mb-0">
            <li class="mb-2 d-flex justify-content-between">
              <span class="text-muted">Né(e) le :</span>
              <span class="fw-medium">{{ etudiant.date_naissance }}</span>
            </li>
            <li class="mb-2 d-flex justify-content-between">
              <span class="text-muted">Lieu :</span>
              <span class="fw-medium">{{ etudiant.lieu_naissance }}</span>
            </li>
            <li class="mb-2 d-flex justify-content-between">
              <span class="text-muted">Sexe :</span>
              <span class="fw-medium">{{ etudiant.sexe }}</span>
            </li>
            <li class="d-flex justify-content-between">
              <span class="text-muted">Nationalité :</span>
              <span class="fw-medium">{{ etudiant.nationalite }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Colonne de Droite : Coordonnées, Inscription et Tuteurs -->
    <div class="col-md-8">
      <!-- Informations de Contact -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-header bg-white py-3">
          <h6 class="m-0 fw-bold"><i class="bi bi-geo-alt me-2"></i>Coordonnées & Adresse</h6>
        </div>
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="text-muted small d-block">Téléphone</label>
              <span class="fw-medium">{{ etudiant.telephone || 'Non renseigné' }}</span>
            </div>
            <div class="col-md-6">
              <label class="text-muted small d-block">Email</label>
              <span class="fw-medium">{{ etudiant.email || 'Non renseigné' }}</span>
            </div>
            <div class="col-12 border-top pt-2">
              <label class="text-muted small d-block">Adresse de résidence</label>
              <span class="fw-medium">{{ etudiant.adresse }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Informations Académiques Actuelles -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-header bg-white py-3">
          <h6 class="m-0 fw-bold"><i class="bi bi-mortarboard me-2"></i>Inscription Actuelle (2025-2026)</h6>
        </div>
        <div class="card-body">
          <div class="row text-center">
            <div class="col-md-4 border-end">
              <p class="text-muted small mb-1">Filière / Option</p>
              <h6 class="fw-bold text-primary">{{ etudiant.filiere }}</h6>
            </div>
            <div class="col-md-4 border-end">
              <p class="text-muted small mb-1">Niveau / Classe</p>
              <h6 class="fw-bold">{{ etudiant.classe_actuelle }}</h6>
            </div>
            <div class="col-md-4">
              <p class="text-muted small mb-1">Statut</p>
              <span class="badge bg-success">Inscrit</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tuteurs / Parents -->
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-white py-3">
          <h6 class="m-0 fw-bold"><i class="bi bi-people me-2"></i>Contacts d'urgence & Tuteurs</h6>
        </div>
        <div class="card-body">
          <table class="table table-sm table-borderless align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th class="small py-2">Nom du Parent/Tuteur</th>
                <th class="small py-2">Lien</th>
                <th class="small py-2">Téléphone</th>
                <th class="small py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tuteur, index) in etudiant.tuteurs" :key="index" class="border-bottom">
                <td class="py-2">{{ tuteur.nom_complet }}</td>
                <td class="py-2">{{ tuteur.lien }}</td>
                <td class="py-2">{{ tuteur.telephone }}</td>
                <td class="py-2 text-muted small">{{ tuteur.email }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Ces données viendront normalement d'un Fetch API ou d'un Store Pinia
const etudiant = ref({
  matricule: "STUD-2025-0042",
  nom: "KABORE",
  prenom: "Ousmane",
  date_naissance: "12/05/2005",
  lieu_naissance: "Dakar",
  sexe: "Masculin",
  nationalite: "Sénégalaise",
  email: "o.kabore@student.com",
  telephone: "+221 77 000 00 00",
  adresse: "Mermoz, Rue 10, Dakar, Sénégal",
  filiere: "Génie Logiciel",
  classe_actuelle: "Licence 3",
  tuteurs: [
    { nom_complet: "KABORE Ibrahim", lien: "Père", telephone: "+221 77 111 22 33", email: "i.kabore@gmail.com" },
    { nom_complet: "DIOP Aminata", lien: "Mère", telephone: "+221 70 444 55 66", email: "a.diop@gmail.com" }
  ]
});
</script>

<style scoped>
.card {
  border-radius: 12px;
}
.shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.05) !important;
}
.fw-medium {
  font-weight: 500;
}
</style>