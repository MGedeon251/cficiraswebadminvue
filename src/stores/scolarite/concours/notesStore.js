// stores/scolarite/concours/notesStore.js
import { reactive } from 'vue'

const notesData = reactive([
  // Exemple : { id: 1, candidat_id: 2, epreuve_id: 3, note: 12.5, concours_id: 1 }
])

export const notesStore = {
  getNotesByConcoursId(concoursId) {
    return notesData.filter(n => n.concours_id === concoursId)
  },
  addOrUpdateNote(note) {
    // ajoute ou met à jour note par id unique (candidat+epreuve)
    const index = notesData.findIndex(n => n.candidat_id === note.candidat_id && n.epreuve_id === note.epreuve_id)
    if (index !== -1) notesData[index] = note
    else notesData.push(note)
  }
}
