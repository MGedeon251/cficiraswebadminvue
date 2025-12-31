<template>
  <div class="dropdown">
    <button class="btn btn-sm btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown">
      ...
    </button>
    <ul class="dropdown-menu dropdown-menu-light">
      <li>
        <button class="dropdown-item" @click="isDetailsVisible = true">
          <i class="mdi mdi-information-outline me-2"></i> Détails
        </button>
      </li>
      <li v-if="showAdd">
        <RouterLink
          class="dropdown-item"
          :to="`/etudiants/edit/${item.etudiant_id}`"
          @click="$emit('add', item)"
        >
          <i class="mdi mdi-launch me-2"></i> Editer
        </RouterLink>
      </li>
      <li>
        <button
          class="dropdown-item"
          data-bs-toggle="modal"
          :data-bs-target="editModalTarget"
          @click="$emit('edit', item)"
        >
          <i class="mdi mdi-pencil-outline me-2"></i> Modifier
        </button>
      </li>
      <li class="dropdown-divider"></li>
      <li>
        <button class="dropdown-item text-danger" @click="$emit('delete', item)">
          <i class="mdi mdi-delete-outline me-2"></i> Supprimer
        </button>
      </li>
    </ul>
  </div>

  <!-- Modal pour les détails -->
  <teleport to="body">
    <div
      v-if="isDetailsVisible"
      class="modal fade show d-block"
      tabindex="-1"
      role="dialog"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content shadow-lg">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">Détails de l’étudiant</h5>
            <button type="button" class="btn-close btn-close-white" @click="closeDetails"></button>
          </div>

          <div class="modal-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between">
                <strong>Matricule :</strong>
                <span class="fw-bold text-primary">{{ item.matricule }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>Nom :</strong>
                <span>{{ item.nom }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>Prénom :</strong>
                <span>{{ item.prenom }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>Sexe :</strong>
                <span>{{ item.sexe }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>Date de naissance :</strong>
                <span>{{ formatDate(item.date_naissance) }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>Lieu de naissance :</strong>
                <span>{{ item.lieu_naissance }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>Téléphone :</strong>
                <span>{{ item.telephone }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>Email :</strong>
                <span>{{ item.email }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>Ville :</strong>
                <span>{{ item.ville }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>Année académique :</strong>
                <span>{{ item.annee_academique }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>Cycle :</strong>
                <span>{{ item.cycle }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>Filière :</strong>
                <span>{{ item.filiere }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>Niveau :</strong>
                <span>{{ item.niveau }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>Classe :</strong>
                <span>{{ item.classe }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>Statut :</strong>
                <span class="badge bg-success">{{ item.statut }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>Date d’inscription :</strong>
                <span>{{ formatDate(item.date_inscription) }}</span>
              </li>
            </ul>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeDetails">Fermer</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  item: Object,
  showAdd: {
    type: Boolean,
    default: false,
  },
  editModalTarget: {
    type: String,
    default: '#exampleModal-edit',
  },
})

const isDetailsVisible = ref(false)

const closeDetails = () => {
  isDetailsVisible.value = false
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}
</script>
