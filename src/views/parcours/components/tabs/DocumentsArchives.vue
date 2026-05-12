<template>
  <div class="row">
    <!-- Section Gauche : Catégories et Upload -->
    <div class="col-md-4">
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <h6 class="fw-bold mb-3">Ajouter un document</h6>
          <div
            class="upload-zone border border-2 border-dashed rounded-3 p-4 text-center bg-light"
            @dragover.prevent
            @drop.prevent="handleDrop"
          >
            <i class="bi bi-cloud-arrow-up fs-1 text-primary"></i>
            <p class="small text-muted mt-2">Glissez-déposez vos fichiers ici ou</p>
            <button class="btn btn-sm btn-primary">Parcourir</button>
            <input type="file" class="d-none" ref="fileInput" />
          </div>
          <div class="mt-3">
            <small class="text-muted italic text-center d-block">
              Formats acceptés : PDF, JPG, PNG (Max 5Mo)
            </small>
          </div>
        </div>
      </div>

      <!-- Filtres par catégorie -->
      <div class="list-group shadow-sm border-0">
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="list-group-item list-group-item-action d-flex justify-content-between align-items-center border-0 py-3"
          :class="{ active: filtreActif === cat.id }"
          @click="filtreActif = cat.id"
        >
          <span><i :class="['bi me-2', cat.icon]"></i> {{ cat.nom }}</span>
          <span class="badge rounded-pill bg-light text-dark border">{{ cat.count }}</span>
        </button>
      </div>
    </div>

    <!-- Section Droite : Liste des fichiers -->
    <div class="col-md-8">
      <div class="card border-0 shadow-sm">
        <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <h6 class="m-0 fw-bold">Documents archivés</h6>
          <div class="input-group input-group-sm" style="width: 200px">
            <input type="text" class="form-control" placeholder="Rechercher..." />
            <span class="input-group-text"><i class="bi bi-search"></i></span>
          </div>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th class="ps-4">Nom du fichier</th>
                  <th>Type</th>
                  <th>Date d'ajout</th>
                  <th>Taille</th>
                  <th class="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(doc, index) in documentsFiltrés" :key="index">
                  <td class="ps-4">
                    <div class="d-flex align-items-center">
                      <i :class="['bi fs-4 me-3', getIcon(doc.format)]"></i>
                      <div>
                        <span class="fw-medium d-block">{{ doc.nom }}</span>
                        <small class="text-muted">{{ doc.categorie }}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="badge bg-light text-muted border text-uppercase">{{
                      doc.format
                    }}</span>
                  </td>
                  <td class="small">{{ doc.date }}</td>
                  <td class="small text-muted">{{ doc.taille }}</td>
                  <td class="text-end pe-4">
                    <div class="btn-group">
                      <button class="btn btn-sm btn-light" title="Prévisualiser">
                        <i class="bi bi-eye"></i>
                      </button>
                      <button class="btn btn-sm btn-light text-primary" title="Télécharger">
                        <i class="bi bi-download"></i>
                      </button>
                      <button class="btn btn-sm btn-light text-danger" title="Supprimer">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- État vide -->
          <div v-if="documentsFiltrés.length === 0" class="text-center py-5">
            <i class="bi bi-folder2-open display-4 text-light"></i>
            <p class="text-muted mt-2">Aucun document dans cette catégorie.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const filtreActif = ref('tous');

const categories = ref([
  { id: 'tous', nom: 'Tous les documents', icon: 'bi-files', count: 5 },
  { id: 'identite', nom: 'Identité & État Civil', icon: 'bi-person-badge', count: 2 },
  { id: 'scolaire', nom: 'Bulletins & Diplômes', icon: 'bi-mortarboard', count: 2 },
  { id: 'medical', nom: 'Santé & Médical', icon: 'bi-heart-pulse', count: 1 },
]);

const documents = ref([
  {
    nom: 'Extrait_Naissance.pdf',
    categorie: 'identite',
    format: 'pdf',
    date: '12/09/2025',
    taille: '1.2 Mo',
  },
  {
    nom: 'Photo_Identite.jpg',
    categorie: 'identite',
    format: 'jpg',
    date: '10/09/2025',
    taille: '450 Ko',
  },
  {
    nom: 'Baccalaureat_S.pdf',
    categorie: 'scolaire',
    format: 'pdf',
    date: '15/09/2025',
    taille: '2.1 Mo',
  },
  {
    nom: 'Certificat_Medical.pdf',
    categorie: 'medical',
    format: 'pdf',
    date: '16/09/2025',
    taille: '800 Ko',
  },
  {
    nom: 'Releve_Notes_L2.pdf',
    categorie: 'scolaire',
    format: 'pdf',
    date: '20/09/2025',
    taille: '1.5 Mo',
  },
]);

const documentsFiltrés = computed(() => {
  if (filtreActif.value === 'tous') return documents.value;
  return documents.value.filter((doc) => doc.categorie === filtreActif.value);
});

const getIcon = (format) => {
  switch (format) {
    case 'pdf':
      return 'bi-file-earmark-pdf text-danger';
    case 'jpg':
    case 'png':
      return 'bi-file-earmark-image text-success';
    default:
      return 'bi-file-earmark-text text-primary';
  }
};
</script>

<style scoped>
.border-dashed {
  border-style: dashed !important;
}
.upload-zone {
  cursor: pointer;
  transition: all 0.3s ease;
}
.upload-zone:hover {
  background-color: #f1f3f5 !important;
  border-color: #0d6efd !important;
}
.list-group-item.active {
  background-color: #e7f1ff;
  color: #0d6efd;
  font-weight: bold;
}
.btn-group .btn {
  border-color: #f8f9fa;
}
</style>
