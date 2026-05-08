<template>
  <div class="row">
    <div class="col-12 grid-margin">
      <!-- Header -->
      <div class="mb-4">
        <h3>Validations inscriptions</h3>
        <p class="text-muted">Gestion des inscriptions et réinscriptions par filière</p>
      </div>
      <!-- Filtres -->
      <div class="card mb-4">
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-4">
              <label class="form-label">Filière</label>
              <select class="form-select" v-model="selectedFiliere">
                <option value="">Toutes</option>
                <option v-for="filiere in filieres" :key="filiere">
                  {{ filiere }}
                </option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label">Statut</label>
              <select class="form-select" v-model="selectedStatut">
                <option value="">Tous</option>
                <option value="en attente">En attente</option>
                <option value="validée">Validée</option>
                <option value="annulée">Annulée</option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label">Recherche</label>
              <input
                type="text"
                class="form-control"
                placeholder="Nom, prénom ou matricule..."
                v-model="searchQuery"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="d-flex justify-content-end mb-3 gap-2">
        <InscriptionClasse />
        <AjouterTuteur />
      </div>

      <div class="table-responsive">
        <table class="table table-hover align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Matricule</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Classe</th>
              <th>Filière</th>
              <th>Statut</th>
              <th class="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(inscription, index) in paginatedInscriptions" :key="inscription.id">
              <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
              <td>{{ inscription.matricule }}</td>
              <td>{{ inscription.nom }}</td>
              <td>{{ inscription.prenom }}</td>
              <td>{{ inscription.classe_code }}</td>
              <td>{{ inscription.filiere_code }}</td>
              <td>
                <span class="badge" :class="statutClass(inscription.statut)">
                  {{ inscription.statut }}
                </span>
              </td>
              <td class="text-end">
                <button class="btn btn-sm btn-outline-primary me-1">Détails</button>
                <button class="btn btn-sm btn-outline-danger" @click="deletePaiement(p.id)">
                  Supprimer
                </button>
              </td>
            </tr>

            <tr v-if="filteredPaiements.length === 0">
              <td colspan="7" class="text-center py-4">
                <img src="/img/empty-box.svg" width="80" class="mb-2" />
                <div class="text-muted">Aucun paiement trouvé</div>
              </td>
            </tr>
          </tbody>
        </table>

      <!-- Barre d'actions flottante -->
      <div v-if="selectedIds.length > 0" class="bulk-actions-bar">
        <div>
          <strong>{{ selectedIds.length }}</strong> paiement(s) sélectionné(s)
        </div>
        <div class="btn-group">
          <button class="btn btn-success btn-sm" @click="validerSelection">✅ Valider</button>
          <button class="btn btn-warning btn-sm" @click="exporterSelection">📤 Exporter</button>
          <button class="btn btn-danger btn-sm" @click="deleteSelected">🗑 Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

/* =====================
   États
