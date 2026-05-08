<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-white py-3">
            <h5 class="fw-bold mb-0">Enregistrer un Nouveau Paiement</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitPaiement">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label fw-bold">Matricule ou Nom de l'Étudiant</label>
                  <input v-model="form.etudiant" type="text" class="form-control" placeholder="Ex: ETU-2024-001" required />
                </div>

                <div class="col-md-6">
                  <label class="form-label fw-bold">Nature du Paiement</label>
                  <select v-model="form.type" class="form-select" required>
                    <option value="" disabled>Choisir le type...</option>
                    <option value="Inscription">Frais d'Inscription</option>
                    <option value="Scolarité">Frais Scolaires / Académiques</option>
                    <option value="Soutenance">Frais de Soutenance</option>
                    <option value="Autres">Autres (Certifications, Rattrapages...)</option>
                  </select>
                </div>

                <div class="col-md-4">
                  <label class="form-label fw-bold">Montant (FCFA)</label>
                  <input v-model.number="form.montant" type="number" class="form-control" placeholder="0" required />
                </div>
                <div class="col-md-4">
                  <label class="form-label fw-bold">Date de paiement</label>
                  <input v-model="form.date" type="date" class="form-control" required />
                </div>
                <div class="col-md-4">
                  <label class="form-label fw-bold">Mode de paiement</label>
                  <select v-model="form.mode" class="form-select" required>
                    <option value="Espèces">Espèces</option>
                    <option value="Virement">Virement Bancaire</option>
                    <option value="Wave">Wave / Orange Money</option>
                    <option value="Chèque">Chèque</option>
                  </select>
                </div>

                <div class="col-12">
                  <label class="form-label fw-bold">Observations</label>
                  <textarea v-model="form.observations" class="form-control" rows="2" placeholder="Note optionnelle..."></textarea>
                </div>

                <div class="col-12 mt-4 d-flex gap-2">
                  <button type="submit" class="btn btn-secondary px-4">
                    <i class="mdi mdi-check-circle me-1"></i> Valider & Imprimer Reçu
                  </button>
                  <button type="button" @click="resetForm" class="btn btn-light px-4">Annuler</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card bg-primary text-white border-0 shadow-sm mb-3">
          <div class="card-body">
            <h6>Importation de masse</h6>
            <p class="small opacity-75">Vous avez plusieurs paiements à enregistrer ? Utilisez un fichier Excel ou CSV.</p>
            <button class="btn btn-light btn-sm w-100" data-bs-toggle="modal" data-bs-target="#importModal">
              <i class="mdi mdi-upload me-1"></i> Importer un fichier
            </button>
          </div>
        </div>
        
        <div class="card border-0 shadow-sm">
          <div class="card-body p-3">
            <h6 class="fw-bold small text-uppercase text-muted mb-3">Dernières opérations</h6>
            <div v-if="recentPaiements.length === 0" class="text-center py-3">
              <p class="small text-muted mb-0">Aucun paiement aujourd'hui</p>
            </div>
            <ul v-else class="list-unstyled mb-0">
              <li v-for="p in recentPaiements" :key="p.id" class="border-bottom py-2 d-flex justify-content-between">
                <div>
                  <div class="fw-bold small">{{ p.etudiant }}</div>
                  <div class="text-muted" style="font-size: 0.7rem;">{{ p.type }}</div>
                </div>
                <div class="text-primary fw-bold small">{{ p.montant }} F</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="importModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold">Importer des paiements</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="text-center mb-4">
              <i class="mdi mdi-file-excel text-success" style="font-size: 48px;"></i>
              <p>Sélectionnez votre fichier .csv ou .xlsx</p>
            </div>
            <input type="file" @change="handleFileUpload" class="form-control" accept=".csv, .xlsx, .xls" />
            <div class="alert alert-info mt-3 py-2 small">
              <i class="mdi mdi-information-outline me-1"></i>
              Veuillez utiliser le format de colonne : <b>Matricule, Montant, Type, Date</b>.
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
            <button type="button" class="btn btn-success" @click="processImport">Lancer l'importation</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// État du formulaire
const form = ref({
  etudiant: '',
  type: '',
  montant: null,
  date: new Date().toISOString().substr(0, 10),
  mode: 'Espèces',
  observations: ''
});

// Liste des paiements récents pour le feedback visuel
const recentPaiements = ref([]);

// Fonctions
const submitPaiement = () => {
  // Simulation de sauvegarde
  const newPaiement = { 
    id: Date.now(), 
    ...form.value 
  };
  
  recentPaiements.value.unshift(newPaiement);
  
  // Ici on appellerait la fonction de génération de reçu
  alert(`Paiement de ${form.value.montant} FCFA enregistré. Impression du reçu...`);
  
  resetForm();
};

const resetForm = () => {
  form.value = {
    etudiant: '',
    type: '',
    montant: null,
    date: new Date().toISOString().substr(0, 10),
    mode: 'Espèces',
    observations: ''
  };
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  console.log("Fichier sélectionné :", file.name);
};

const processImport = () => {
  alert("Traitement du fichier en cours...");
  // Logique avec la lib XLSX par exemple
};
</script>

<style scoped>
.form-label {
  font-size: 0.85rem;
  color: #555;
}
.card {
  border-radius: 12px;
}
.btn-primary {
  background-color: #4b49ac;
  border-color: #4b49ac;
}
.btn-primary:hover {
  background-color: #3f3e91;
}
.modal-content {
  border-radius: 15px;
  border: none;
}
</style>