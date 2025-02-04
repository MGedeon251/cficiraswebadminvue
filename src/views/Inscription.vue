<template>
  <div>
      <sidebar>
        <h2>Gestion des Inscriptions</h2>
        <div class="row">
                <div class="container my-2">
                    <div class="col-md-12 grid margin stretch-card">
                    <div class="card">
                        <div class="card-body">

    
    
    <!-- Filtres de recherche -->
    <div class="filters d-flex gap-2 mb-3">
      <select v-model="selectedYear" class="form-select">
        <option v-for="year in academicYears" :key="year" :value="year">{{ year }}</option>
      </select>
      <select v-model="selectedClass" class="form-select">
        <option v-for="classItem in classes" :key="classItem" :value="classItem">{{ classItem }}</option>
      </select>
      <select v-model="selectedPaymentStatus" class="form-select">
        <option value="all">Tous</option>
        <option value="paid">Payé</option>
        <option value="unpaid">Non payé</option>
      </select>
    </div>

    <!-- Tableau des inscriptions -->
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Classe</th>
          <th>Année</th>
          <th>Statut de paiement</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in filteredStudents" :key="student.id">
          <td>{{ student.name }}</td>
          <td>{{ student.class }}</td>
          <td>{{ student.year }}</td>
          <td :class="{'text-success': student.paymentStatus === 'paid', 'text-danger': student.paymentStatus === 'unpaid'}">
            {{ student.paymentStatus === 'paid' ? 'Payé' : 'Non payé' }}
          </td>
          <td>
            <button class="btn btn-primary btn-sm me-2" @click="editStudent(student)">Modifier</button>
            <button class="btn btn-success btn-sm" @click="updatePayment(student)">Valider paiement</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Boutons d'action -->
    <div class="d-flex gap-2">
      <button class="btn btn-success" @click="exportToPDF">Exporter PDF</button>
      <button class="btn btn-info" @click="exportToExcel">Exporter Excel</button>
      <button class="btn btn-primary" @click="openModal">Nouvelle inscription</button>
    </div>

    <!-- Modal d'inscription -->
    <div v-if="showModal" class="modal-backdrop">
      <div class="modal-content">
        <h3>{{ editingStudent ? 'Modifier l’inscription' : 'Nouvelle inscription' }}</h3>
        <input v-model="form.name" type="text" placeholder="Nom de l’étudiant" class="form-control mb-2">
        <select v-model="form.class" class="form-select mb-2">
          <option v-for="classItem in classes" :key="classItem" :value="classItem">{{ classItem }}</option>
        </select>
        <select v-model="form.year" class="form-select mb-2">
          <option v-for="year in academicYears" :key="year" :value="year">{{ year }}</option>
        </select>
        <button class="btn btn-primary" @click="saveStudent">{{ editingStudent ? 'Mettre à jour' : 'Enregistrer' }}</button>
        <button class="btn btn-secondary" @click="closeModal">Annuler</button>
      </div>
    </div>
  
                        </div>
                    </div>
                </div>
                </div>
                
            </div>
      </sidebar>
  </div>

  
</template>

<script setup>
import sidebar from '@/components/Header.vue'
import { ref, computed } from "vue";

const academicYears = ref(["2023-2024", "2024-2025"]);
const classes = ref(["Licence 1", "Licence 2", "Master 1"]);
const selectedYear = ref("2023-2024");
const selectedClass = ref("Licence 1");
const selectedPaymentStatus = ref("all");
const showModal = ref(false);
const editingStudent = ref(null);
const students = ref([
  { id: 1, name: "Alice", class: "Licence 1", year: "2023-2024", paymentStatus: "paid" },
  { id: 2, name: "Bob", class: "Licence 2", year: "2023-2024", paymentStatus: "unpaid" },
]);

const form = ref({ name: "", class: selectedClass.value, year: selectedYear.value });

const filteredStudents = computed(() => {
  return students.value.filter(
    (student) =>
      student.year === selectedYear.value &&
      student.class === selectedClass.value &&
      (selectedPaymentStatus.value === "all" || student.paymentStatus === selectedPaymentStatus.value)
  );
});

const openModal = () => {
  showModal.value = true;
  editingStudent.value = null;
  form.value = { name: "", class: selectedClass.value, year: selectedYear.value };
};

const closeModal = () => {
  showModal.value = false;
};

const saveStudent = () => {
  if (editingStudent.value) {
    Object.assign(editingStudent.value, form.value);
  } else {
    students.value.push({ id: Date.now(), ...form.value, paymentStatus: "unpaid" });
  }
  closeModal();
};

const editStudent = (student) => {
  editingStudent.value = student;
  form.value = { ...student };
  showModal.value = true;
};

const updatePayment = (student) => {
  student.paymentStatus = "paid";
};

const exportToPDF = () => {
  alert("Export PDF en cours...");
};

const exportToExcel = () => {
  alert("Export Excel en cours...");
};
</script>


<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
}
</style>
