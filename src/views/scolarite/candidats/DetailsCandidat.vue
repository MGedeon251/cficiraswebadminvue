<template>
  <div class="formulaire">
    <h2>Détails du candidat</h2>
    <div class="form-bloc">
      <!-- Zone des champs -->
      <div class="zone-champs">
        <div class="ligne-champs" v-for="(ligne, i) in lignesChamps" :key="i">
          <div class="champ" v-for="champ in ligne" :key="champ.name">
            <label>{{ champ.label }}</label>
            <div class="champ-valeur">
              {{ champ.type === 'select' ? candidat[champ.name] : candidat[champ.name] }}
            </div>
          </div>
        </div>

        <!-- Filière -->
        <div class="champ-full">
          <label>Filière souhaitée</label>
          <div class="champ-valeur">{{ candidat.filiere }}</div>
        </div>
      </div>

      <!-- Zone de photo -->
      <div class="zone-photo">
        <label>Photo d'identité</label>
        <div class="aperçu-photo">
          <img :src="candidat.photo" alt="Photo du candidat" />
        </div>
      </div>
    </div>

    <div class="pied-formulaire">
      <router-link :to="`/scolarite/candidats/${index}/edit`">
        <button>Modifier</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const index = route.params.index;
const candidat = ref({});

onMounted(() => {
  const data = localStorage.getItem('candidats');
  if (data) {
    const candidats = JSON.parse(data);
    candidat.value = candidats[index] || {};
  }
});

const lignesChamps = [
  [
    { name: 'nom', label: 'Nom' },
    { name: 'prenom', label: 'Prénom' },
    { name: 'age', label: 'Âge' },
    { name: 'sexe', label: 'Sexe' },
  ],
  [
    { name: 'dateNaissance', label: 'Date de naissance' },
    { name: 'lieuNaissance', label: 'Lieu de naissance' },
    { name: 'nationalite', label: 'Nationalité' },
    { name: 'adresse', label: 'Adresse' },
  ],
  [
    { name: 'arrondissement', label: 'Arrondissement' },
    { name: 'serie', label: 'Série BAC' },
    { name: 'categorie', label: 'Catégorie' },
    { name: 'email', label: 'Email' },
  ],
  [
    { name: 'numero', label: 'Téléphone' },
    { name: 'tuteurNom', label: 'Nom du tuteur' },
    { name: 'tuteurNumero', label: 'Tél. tuteur' },
  ],
];
</script>

<style scoped>
.formulaire {
  background: #fff;
  max-width: 1100px;
  margin: auto;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 0 10px #ccc;
}
.form-bloc {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}
.zone-champs {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.ligne-champs {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.champ {
  flex: 1 1 22%;
  display: flex;
  flex-direction: column;
}
.champ-valeur {
  padding: 0.5rem;
  background-color: #f1f1f1;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.zone-photo {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.aperçu-photo img {
  width: 130px;
  height: 160px;
  object-fit: cover;
  border: 1px solid #ccc;
  box-shadow: 0 0 4px #aaa;
  border-radius: 4px;
}
.pied-formulaire {
  margin-top: 1.5rem;
  text-align: center;
}
button {
  padding: 0.6rem 2rem;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
}
</style>
