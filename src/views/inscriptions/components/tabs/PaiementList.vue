<template>
  <div class="card p-4">
    <h5>Suivi des paiements</h5>
    <table class="table">
      <thead>
        <tr>
          <th>Étudiant</th>
          <th>Classe</th>
          <th>Montant payé</th>
          <th>Statut</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in paiements" :key="p.id">
          <td>{{ p.nom }}</td>
          <td>{{ p.classe }}</td>
          <td>{{ p.montant }} FCFA</td>
          <td>
            <span :class="['status-badge', p.statut]">{{ p.statut }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup="setup">
const paiements = [
  {
    id: 1,
    nom: 'Dupont Jean',
    classe: 'L1 Info',
    montant: 20000,
    statut: 'Payé',
  },
  {
    id: 2,
    nom: 'Mbala Marie',
    classe: 'L2 Math',
    montant: 0,
    statut: 'Non payé',
  },
  {
    id: 3,
    nom: 'Kouadio Alain',
    classe: 'L1 Info',
    montant: 10000,
    statut: 'En attente',
  },
];
</script>

<style scoped="scoped">
.status-badge {
  padding: 0.3em 0.8em;
  border-radius: 20px;
  color: #fff;
}
.Payé {
  background-color: #28a745;
}
</style>
