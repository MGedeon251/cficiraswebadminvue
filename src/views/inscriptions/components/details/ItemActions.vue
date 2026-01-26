<template>
  <div class="dropdown">
    <button class="btn btn-sm btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown">
      ...
    </button>
    <ul class="dropdown-menu dropdown-menu-light">
      <li>
        <button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#modalPaiement">
          <i class="mdi mdi-launch me-2"></i>
          Valider
        </button>
      </li>
      <li>
        <button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#modalDetails">
          <i class="mdi mdi-information-outline me-2"></i>
          Détails
        </button>
      </li>
      <li class="dropdown-divider"></li>
      <li>
        <button
          class="dropdown-item text-danger"
          data-bs-toggle="modal"
          data-bs-target="#modalAnnulation"
        >
          <i class="mdi mdi-delete-outline me-2"></i>
          Annuler
        </button>
      </li>
    </ul>
  </div>

  <!-- Modal Détails -->
  <div class="modal fade" id="modalDetails" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Détails de l'inscription</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <pre>{{ item }}</pre>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Paiement -->
  <div class="modal fade" id="modalPaiement" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Valider le paiement</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitPaiement">
            <div class="mb-3">
              <label class="form-label">Montant</label>
              <input
                type="number"
                step="0.01"
                min="0"
                v-model.number="paiement.montant"
                class="form-control"
                required
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Mode de paiement</label>
              <select v-model="paiement.mode_paiement" class="form-select" required>
                <option value="" disabled>Choisir un mode</option>
                <option value="espece">Espèce</option>
                <option value="mobile money">Mobile Money</option>
                <option value="virement">Virement</option>
                <option value="chèque">Chèque</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Référence de transaction</label>
              <input
                type="text"
                v-model="paiement.reference_transaction"
                class="form-control"
                required
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
          <button class="btn btn-primary" @click="submitPaiement" data-bs-dismiss="modal">
            Valider
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Annulation -->
  <div class="modal fade" id="modalAnnulation" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Annuler l'inscription</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Motif de l'annulation</label>
            <textarea
              v-model="motif"
              class="form-control"
              rows="3"
              placeholder="Saisir le motif..."
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
          <button class="btn btn-danger" @click="submitAnnulation" data-bs-dismiss="modal">
            Confirmer l'annulation
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  item: { type: Object, required: true },
});

const emit = defineEmits(['validate', 'delete']);

const motif = ref('');

const submitAnnulation = () => {
  if (!motif.value.trim()) {
    alert("Merci de préciser un motif d'annulation.");
    return;
  }
  emit('delete', { ...props.item, motif: motif.value });
  motif.value = ''; // reset champ
};

const paiement = ref({
  montant: null,
  mode_paiement: '',
  reference_transaction: '',
});

const submitPaiement = () => {
  if (
    !paiement.value.montant ||
    !paiement.value.mode_paiement ||
    !paiement.value.reference_transaction
  ) {
    alert('Merci de remplir tous les champs.');
    return;
  }

  // On émet un événement vers le parent pour appeler l'API REST
  emit('validate', {
    etudiant_id: props.item.id,
    classe_id: props.item.classe_id,
    annee_academique_id: props.item.annee_academique_id,
    montant: paiement.value.montant,
    mode_paiement: paiement.value.mode_paiement,
    reference_transaction: paiement.value.reference_transaction,
    statut: 'en attente',
  });

  // Reset form
  paiement.value.montant = null;
  paiement.value.mode_paiement = '';
  paiement.value.reference_transaction = '';
};
</script>
