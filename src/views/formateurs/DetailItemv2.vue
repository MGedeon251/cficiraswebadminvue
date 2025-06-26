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
        <button class="dropdown-item" @click="$emit('add', item)">
          <i class="mdi mdi-plus-circle-outline me-2"></i> Ajouter
        </button>
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
      @click.self="closeDetails"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">
              <i class="mdi mdi-information-outline me-2"></i>
              Détails de Formateur
            </h5>
            <button type="button" class="btn-close btn-close-white" @click="closeDetails"></button>
          </div>
          <div class="modal-body">
            <div class="row mb-4">
              <!-- Photo + identité -->
              <div class="col-md-3 text-center">
                <img
                  :src="item.photo || '/img/default-avatar.png'"
                  alt="Photo du formateur"
                  class="teacher-photo img-thumbnail"
                />
                <div class="mt-2">
                  <span class="badge bg-primary">{{ item.enseignant_id || 'ID inconnu' }}</span>
                </div>
              </div>

              <div class="col-md-9">
                <div class="info-content"></div>
              </div>
            </div>

            <!-- Informations personnelles -->
            <div class="row">
              <div class="col-md-6">
                <div class="info-card">
                  <h6 class="info-title">
                    <i class="mdi mdi-account-details me-2"></i> Informations personnelles
                  </h6>
                  <div class="info-content">
                    <div class="info-item">
                      <span class="info-label">Date de naissance:</span>
                      <span class="info-value">{{ formatDate(item.datenais) }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Lieu de naissance:</span>
                      <span class="info-value">{{ item.lieunais || 'Non spécifié' }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Sexe:</span>
                      <span class="info-value">{{
                        item.sexe === 'M'
                          ? 'Masculin'
                          : item.sexe === 'F'
                            ? 'Féminin'
                            : 'Non spécifié'
                      }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Statut matrimonial:</span>
                      <span class="info-value">{{ item.matrimonial || 'Non spécifié' }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Informations académiques -->
              <div class="col-md-6">
                <div class="info-card">
                  <h6 class="info-title">
                    <i class="mdi mdi-school me-2"></i> Diplôme & Spécialité
                  </h6>
                  <div class="info-content">
                    <div class="info-item">
                      <span class="info-label">Diplôme:</span>
                      <span class="info-value">{{ item.diplome || 'Non spécifié' }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Spécialité:</span>
                      <span class="info-value">{{ item.specialite || 'Non spécifié' }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Établissement:</span>
                      <span class="info-value">{{ item.etablissement || 'Non spécifié' }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Année d'obtention:</span>
                      <span class="info-value">{{ item.annee_obtention || 'Non spécifiée' }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Niveau:</span>
                      <span class="info-value">{{ item.niveau || 'Non spécifié' }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Informations de la session -->
    </div>
  </teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getEnseignants } from '@/api/pedagogies/pedagogieApi';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import localizedFormat from 'dayjs/plugin/localizedFormat';

const props = defineProps({
  item: Object,
  showAdd: { type: Boolean, default: false },
  editModalTarget: { type: String, default: '#exampleModal-edit' },
});

const isDetailsVisible = ref(false);
const enseignantDetails = ref(null);

const closeDetails = () => {
  isDetailsVisible.value = false;
};

const calculateCompletionRate = () => {
  const modules = parseInt(props.item.modules_evalues) || 1;
  const notes = parseInt(props.item.nombre_notes_saisies) || 0;
  return Math.min(Math.round((notes / modules) * 100), 100);
};

const getStatusClass = (status) => {
  return (
    {
      active: 'bg-success',
      inactive: 'bg-secondary',
      draft: 'bg-warning text-dark',
      completed: 'bg-info',
    }[status] || 'bg-light text-dark'
  );
};

dayjs.extend(localizedFormat);
dayjs.locale('fr');

function toInputDateFormat(dateString) {
  return dateString ? dayjs(dateString).format('DD MMMM YYYY') : '-';
}

function formatDate(dateString) {
  if (!dateString) return 'Non spécifié';
  return dayjs(dateString).format('DD MMMM YYYY');
}

onMounted(async () => {
  const res = await getEnseignants();
  if (res.success && res.data) {
    enseignantDetails.value = res.data.find(
      (ens) => `${ens.nom} ${ens.prenom}`.trim() === props.item.responsable?.trim()
    );
  }
});
</script>

<style scoped>
.modal-content {
  border: none;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}
.info-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  height: 100%;
}
.info-title {
  color: #495057;
  font-weight: 600;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid #dee2e6;
}
.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.info-label {
  font-weight: 500;
  color: #6c757d;
}
.info-value {
  font-weight: 400;
  color: #212529;
  text-align: right;
}
.badge {
  padding: 5px 10px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;
}
.progress {
  border-radius: 5px;
  background-color: #e9ecef;
}
.btn-close:focus {
  box-shadow: none;
}
.modal-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.modal-footer {
  border-top: 1px solid #dee2e6;
}
</style>
