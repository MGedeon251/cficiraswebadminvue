<template>
    <div>
      <h5 class="mb-4">Résultats du Concours</h5>
  
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Matricule</th>
            <th>Nom & Prénom</th>
            <th v-for="epreuve in epreuves" :key="epreuve.id">{{ epreuve.libelle }}</th>
            <th>Moyenne</th>
            <th>Rang</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(candidat, index) in candidatsAvecResultats" :key="candidat.id">
            <td>{{ candidat.matricule }}</td>
            <td>{{ candidat.nom }} {{ candidat.prenom }}</td>
  
            <td v-for="epreuve in epreuves" :key="epreuve.id">
              <input
                type="number"
                class="form-control"
                step="0.01"
                min="0"
                max="20"
                v-model.number="candidat.notes[epreuve.id]"
                @change="saveNote(candidat.id, epreuve.id, candidat.notes[epreuve.id])"
              />
            </td>
  
            <td>{{ candidat.moyenne.toFixed(2) }}</td>
            <td>{{ candidat.rang }}</td>
            <td :class="{'text-success': candidat.statut === 'Admis', 'text-danger': candidat.statut === 'Recalé'}">
              {{ candidat.statut }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, onMounted } from 'vue'
  import { candidatsStore } from '@/stores/scolarite/concours/candidatsStore'
  import { epreuvesStore } from '@/stores/scolarite/concours/epreuvesStore'
  import { notesStore } from '@/stores/scolarite/concours/notesStore'
  
  // Props
  const props = defineProps({
    concoursId: Number,
  })
  
  // Données
  const candidats = ref([])
  const epreuves = ref([])
  
  // Chargement des données
  onMounted(() => {
    candidats.value = candidatsStore.getAll().filter(c => c.concours_id === props.concoursId)
    epreuves.value = epreuvesStore.getEpreuvesByConcoursId(props.concoursId)
  })
  
  // Fonction de sauvegarde
  function saveNote(candidat_id, epreuve_id, note) {
    notesStore.setNote({ candidat_id, epreuve_id, note })
  }
  
  // Calcul des résultats enrichis
  const candidatsAvecResultats = computed(() => {
    const resultats = candidats.value.map(candidat => {
      const notes = {}
      let total = 0
      let totalCoef = 0
  
      for (const epreuve of epreuves.value) {
        const noteObj = notesStore.getNote(candidat.id, epreuve.id)
        const note = noteObj ? parseFloat(noteObj.note) : 0
        notes[epreuve.id] = note
        total += note * epreuve.coefficient
        totalCoef += epreuve.coefficient
      }
  
      const moyenne = totalCoef ? total / totalCoef : 0
  
      return {
        ...candidat,
        notes,
        moyenne,
        rang: 0, // temporaire, sera calculé ensuite
        statut: moyenne >= 10 ? 'Admis' : 'Recalé',
      }
    })
  
    // Classement par moyenne
    resultats.sort((a, b) => b.moyenne - a.moyenne)
  
    // Attribution du rang
    resultats.forEach((c, i) => {
      c.rang = i + 1
    })
  
    return resultats
  })
  </script>
  
  <style scoped>
  .table input {
    width: 70px;
    text-align: center;
  }
  </style>
  