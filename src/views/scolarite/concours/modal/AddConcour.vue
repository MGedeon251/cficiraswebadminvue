<template>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Ouverture d'un concours</h5>
            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
  
          <div class="modal-body">
            <form @submit.prevent="submitConcour">
              <!-- Type concours -->
              <div class="mb-3">
                <label class="form-label">Type concours</label>
                <select v-model="form.type_concours" @change="updateDesignations" class="form-select" required>
                  <option value="">Sélectionner</option>
                  <option value="Concours">Concours</option>
                  <option value="Test">Test</option>
                </select>
              </div>
  
              <!-- Désignation -->
              <div class="mb-3">
                <label class="form-label">Désignation</label>
                <select v-model="form.designation" @change="updateNiveaux" class="form-select" required>
                  <option value="">Sélectionner</option>
                  <option v-for="designation in designations" :key="designation" :value="designation">
                    {{ designation }}
                  </option>
                </select>
              </div>
  
              <!-- Niveau (si Test) -->
              <div class="mb-3" v-if="form.type_concours === 'Test'">
                <label class="form-label">Niveau</label>
                <select v-model="form.niveau" class="form-select" required>
                  <option value="">Sélectionner</option>
                  <option v-for="niveau in niveaux" :key="niveau" :value="niveau">
                    {{ niveau }}
                  </option>
                </select>
              </div>
  
              <!-- Date début -->
              <div class="mb-3">
                <label class="form-label">Date début</label>
                <div class="row">
                  <div class="col">
                    <select v-model="form.jour" class="form-select" required>
                      <option value="">Jour</option>
                      <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
                    </select>
                  </div>
                  <div class="col">
                    <select v-model="form.mois" class="form-select" required>
                      <option value="">Mois</option>
                      <option v-for="(month, index) in moisList" :key="index" :value="index + 1">
                        {{ month }}
                      </option>
                    </select>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" :value="anneeAcademique" readonly />
                  </div>
                </div>
              </div>
  
              <!-- Date fin -->
              <div class="mb-3">
                <label class="form-label">Date fin</label>
                <div class="row">
                  <div class="col">
                    <select v-model="form.jourFin" class="form-select" required>
                      <option value="">Jour</option>
                      <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
                    </select>
                  </div>
                  <div class="col">
                    <select v-model="form.moisFin" class="form-select" required>
                      <option value="">Mois</option>
                      <option v-for="(month, index) in moisList" :key="index" :value="index + 1">
                        {{ month }}
                      </option>
                    </select>
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" :value="anneeAcademique" readonly />
                  </div>
                </div>
              </div>
  
              <!-- Description -->
              <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea v-model="form.description" class="form-control" rows="2"></textarea>
              </div>
  
              <!-- Boutons -->
              <div class="modal-footer">
                <button type="submit" class="btn btn-success">Créer</button>
                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Annuler</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed,onMounted, defineEmits } from 'vue'
  import {createConcours} from  '@/api/gestions/gestionApi'
  
  const emit = defineEmits(['concoursCreated'])
  
  const form = ref({
    type_concours: '',
    designation: '',
    niveau: '',
    jour: '',
    mois: '',
    jourFin: '',
    moisFin: '',
    description: '',
  })
  
  const designations = ref([])
  const niveaux = ref([])
  
  function updateDesignations() {
    if (form.value.type_concours === 'Concours') {
      designations.value = ['Administration publique', 'Informatique', 'Réseaux télécom']
    } else if (form.value.type_concours === 'Test') {
      designations.value = ['Administration publique', 'Informatique', 'Réseaux télécom', 'Master']
    } else {
      designations.value = []
    }
    niveaux.value = []
    form.value.niveau = ''
  }
  
  function updateNiveaux() {
    if (form.value.type_concours === 'Test') {
      if (form.value.designation === 'Master') {
        niveaux.value = ['4ème année (Master 1)', '5ème année (Master 2)']
      } else {
        niveaux.value = ['2ème année', '3ème année']
      }
    } else {
      niveaux.value = []
      form.value.niveau = ''
    }
  }
  
  const moisList = [
    'Janvier', 'Février', 'Mars', 'Avril',
    'Mai', 'Juin', 'Juillet', 'Août',
    'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ]
  
  const anneeAcademique = computed(() => {
    const now = new Date()
    const year = now.getFullYear()
    const nextYear = year + 1
    return `${year}-${nextYear}`
  })
  
  async function submitConcour() {
    try {
      const response = await createConcours(form);
      concours.value = response.data;
    } catch (e) {
      //message d'erreur ici pour savoir !
      concours.value = [];
    }
    
  }
  onMounted(async (form) => {
    try {
      const response = await createConcours(form);
      concours.value = response.data;
    } catch (e) {
      //message d'erreur ici pour savoir !
      concours.value = [];
    }
  });


  
  </script>
  