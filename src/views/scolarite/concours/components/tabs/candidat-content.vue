<template>
  <div>
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-end flex-wrap">
            <div class="flex flex-wrap justify-between mb-4">
              <a-input
                class="me-1 mt-1 mt-xl-0"
                v-model:value="searchQuery"
                placeholder="Rechercher..."
                allow-clear
                style="width: 250px"
              >
                <template #prefix>
                  <i class="mdi mdi-magnify" />
                </template>
              </a-input>
              <a-button type="default" @click="refreshCandidats" :loading="loading">
                🔄 Rafraîchir
              </a-button>
            </div>
          </div>

          <div class="d-flex justify-content-between align-items-end flex-wrap">
            <button class="btn btn-outline-dark me-2" @click="exportCandidats">
              Exporter Excel
            </button>

            <button
              class="btn btn-outline-primary me-2 mt-2 mt-xl-0"
              @click="openImportModal"
            >
              Importer fichier Excel
            </button>

            <button
              type="button"
              class="btn btn-success mt-2 mt-xl-0"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              + Ajouter
            </button>
          </div>

          <AddCandidat @submit="handleSubmit" @close="handleClose" />
        </div>

        <div v-if="!loading" class="table-responsive mt-3">
          <table class="table table-hover align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>matricule</th>
                <th>nom</th>
                <th>prenom</th>
                <th>telephone</th>
                <th>date inscription</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(candidat, index) in paginatedCandidats" :key="candidat.id">
                <td>{{ index + 1 }}</td>
                <td>{{ candidat.matricule }}</td>
                <td>{{ candidat.nom }}</td>
                <td>{{ candidat.prenom }}</td>
                <td>{{ candidat.tel }}</td>
                <td>{{ formatDate(candidat.date_inscription) }}</td>
                <td>
                  <ItemActions2 :item="candidat" @delete="confirmDelete" />
                </td>
              </tr>
            </tbody>
          </table>

          <Pagination
            v-model="currentPage"
            :items-per-page="itemsPerPage"
            :total-items="totalItems"
            @update:itemsPerPage="itemsPerPage = $event"
          />
        </div>

        <div v-else class="text-center p-4">
          <span class="text-muted">Chargement des détails du concours...</span>
        </div>
      </div>
    </div>

    <!-- Modal import -->
    <ImportCandidatModal
      ref="importModalRef"
      :concoursId="concoursId"
      @imported="onImportDone"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import dayjs from 'dayjs'
import { useRoute } from 'vue-router'
import * as XLSX from 'xlsx'

import ItemActions2 from '../details/ItemActions2.vue'
import Pagination from '@/components/shared/Pagination.vue'
import AddCandidat from '../modal/addCandidat.vue'
import ImportCandidatModal from './ImportCandidatModal.vue'

import { candidatsStore } from '@/stores/scolarite/concours/candidatsStore'
import { filiereStore } from '@/stores/scolarite/concours/filiereStore'

const props = defineProps({
  concoursId: {
    type: Number,
    required: false
  }
})

const route = useRoute()
const concoursId = ref(props.concoursId || (route.params.id ? parseInt(route.params.id) : null))

const candidats = ref([])
const loading = ref(false)
const searchQuery = ref('')

const loadCandidats = () => {
  loading.value = true
  const allCandidats = candidatsStore.getAll()
  if (concoursId.value) {
    candidats.value = allCandidats.filter(c => c.concours_id === concoursId.value)
  } else {
    candidats.value = []
  }
  loading.value = false
}

const refreshCandidats = () => loadCandidats()

const formatDate = date => (date ? dayjs(date).format('DD-MM-YYYY') : '-')

const filteredCandidats = computed(() => {
  if (!searchQuery.value.trim()) return candidats.value
  const q = searchQuery.value.toLowerCase()
  return candidats.value.filter(
    c =>
      (c.nom && c.nom.toLowerCase().includes(q)) ||
      (c.prenom && c.prenom.toLowerCase().includes(q)) ||
      (c.matricule && c.matricule.toLowerCase().includes(q))
  )
})

const currentPage = ref(1)
const itemsPerPage = ref(10)
const totalItems = computed(() => filteredCandidats.value.length)
const paginatedCandidats = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredCandidats.value.slice(start, start + itemsPerPage.value)
})

const handleSubmit = formData => {
  const obj = {}
  for (const pair of formData.entries()) {
    obj[pair[0]] = pair[1]
  }
  obj.concours_id = concoursId.value
  candidatsStore.add(obj)
  loadCandidats()
  handleClose()
}

const confirmDelete = candidat => {
  if (confirm(`Confirmer la suppression de ${candidat.nom} ${candidat.prenom} ?`)) {
    candidatsStore.delete(candidat.id)
    loadCandidats()
  }
}

const handleClose = () => {
  const modalEl = document.getElementById('exampleModal')
  const modal = bootstrap.Modal.getInstance(modalEl)
  modal?.hide()
}

const exportCandidats = () => {
  if (candidats.value.length === 0) {
    alert('Aucun candidat à exporter.')
    return
  }

  const filieresMap = {}
  filiereStore.getAll().forEach(f => {
    filieresMap[f.id] = f.code
  })

  const data = candidats.value.map(c => ({
    nom: c.nom,
    prenom: c.prenom,
    datenais: c.datenais,
    lieunais: c.lieunais,
    sexe: c.sexe,
    tel: c.tel,
    email: c.email,
    ville: c.ville,
    adresse: c.adresse,
    filiere: filieresMap[c.filiere] || 'N/A',
    statut: c.statut,
    nationalite: c.nationalite
  }))

  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Candidats')
  XLSX.writeFile(workbook, 'candidats_export.xlsx')
}

const importModalRef = ref(null)
const openImportModal = () => {
  importModalRef.value?.openImportModal()
}

const onImportDone = () => {
  loadCandidats()
}

onMounted(() => {
  loadCandidats()
})

watch(
  () => props.concoursId,
  (newVal) => {
    concoursId.value = newVal
    loadCandidats()
  }
)
</script>
