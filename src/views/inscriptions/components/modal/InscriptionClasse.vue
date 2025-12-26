<template>
  <div class="modal fade" id="inscriptionClasseModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Inscription par classe</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
                  <div class="modal-body">
            <!-- Sélection Filière et Classe -->
            <div class="row mb-4">
              <div class="col-md-6">
                <label for="filiere" class="form-label">Filière</label>
                <select v-model="filiere" id="filiere" class="form-select" required>
                  <option value="">Sélectionnez la filière</option>
                  <option v-for="f in filieres" :key="f" :value="f">{{ f }}</option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="classe" class="form-label">Classe</label>
                <select v-model="classe" id="classe" class="form-select" required>
                  <option value="">Sélectionnez la classe</option>
                  <option v-for="c in classes" :key="c" :value="c">{{ c }}</option>
                </select>
              </div>
            </div>

            <!-- Importation fichier -->
            <div class="mb-4">
              <label for="fileInput" class="form-label">Sélectionnez un fichier Excel ou CSV</label>
              <input
                id="fileInput"
                type="file"
                class="form-control"
                accept=".xlsx, .xls, .csv"
                @change="handleFile"
              />
              <div class="form-text">
                Le fichier doit contenir les colonnes suivantes :
                <strong>nom, prénom, sexe, datenais, lieunais, tel, email, adresse, ville, pays</strong>
              </div>
            </div>

            <!-- Spinner Loading -->
            <div v-if="isLoading" class="text-center py-4">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Chargement...</span>
              </div>
              <p class="mt-2">Importation en cours...</p>
            </div>

            <!-- Aperçu données -->
            <div v-if="studentsData.length > 0" class="table-responsive">
              <h6>Étudiants à importer ({{ studentsData.length }} lignes)</h6>
              <table class="table table-striped table-hover table-sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Sexe</th>
                    <th>Date Naissance</th>
                    <th>Lieu Naissance</th>
                    <th>Téléphone</th>
                    <th>Email</th>
                    <th>Classe</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(student, idx) in studentsData" :key="idx">
                    <td>{{ idx + 1 }}</td>
                    <td>{{ student.nom }}</td>
                    <td>{{ student.prenom }}</td>
                    <td>{{ student.sexe }}</td>
                    <td>{{ student.datenais }}</td>
                    <td>{{ student.lieunais }}</td>
                    <td>{{ student.tel }}</td>
                    <td>{{ student.email }}</td>
                    <td>{{ student.classe }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Footer -->
          <div class="modal-footer">
            <button class="btn btn-outline-secondary" @click="$emit('close')">Annuler</button>
            <button
              class="btn btn-primary"
              :disabled="!studentsData.length || !filiere || !classe || isLoading"
              @click="submitStudents"
            >
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-1" role="status"></span>
              {{ isLoading ? 'Importation...' : 'Importer' }}
            </button>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';

const studentsData = ref([]);
</script>

