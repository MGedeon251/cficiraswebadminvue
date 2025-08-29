<template>
  <div>
    <h5>Résumé de l'inscription</h5>
    <ul class="list-group mb-3">
      <li class="list-group-item">
        👤 Étudiant : {{ modelValue.etudiant?.nom }} {{ modelValue.etudiant?.prenom }}
      </li>
      <li class="list-group-item">
        🎓 Classe : {{ modelValue.inscription?.classe_id }}
      </li>
      <li class="list-group-item">
        📅 Année : {{ modelValue.inscription?.annee_academique_id }}
      </li>
      <li class="list-group-item">
        💳 Paiement : {{ modelValue.paiement?.montant }} ({{ modelValue.paiement?.mode_paiement }})
      </li>
    </ul>
    <p class="text-success">✅ Vérifiez les informations avant de terminer.</p>
  </div>
</template>

<script setup>
const props = defineProps({ modelValue: Object });
</script>
