<template>
  <div
    class="modal fade"
    id="wizardModal"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <!-- Header -->
        <div class="modal-header">
          <h5 class="modal-title">Nouvelle inscription</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <!-- Stepper -->
          <ul class="nav nav-pills justify-content-center mb-4">
            <li
              v-for="(step, index) in steps"
              :key="index"
              class="nav-item"
            >
              <button
                class="nav-link"
                :class="{
                  active: currentStep === index,
                  disabled: index > currentStep,
                  'bg-success text-white': index < currentStep
                }"
                @click="goToStep(index)"
              >
                {{ index + 1 }}. {{ step.label }}
              </button>
            </li>
          </ul>

          <!-- Contenu dynamique -->
          <component
            :is="steps[currentStep].component"
            v-model="formData"
            @next="nextStep"
            @prev="prevStep"
            @finish="finishWizard"
          />
        </div>

        <!-- Footer Navigation -->
        <div class="modal-footer d-flex justify-content-between">
          <button
            v-if="currentStep > 0"
            class="btn btn-secondary"
            @click="prevStep"
          >
            ← Précédent
          </button>

          <button
            v-if="currentStep < steps.length - 1"
            class="btn btn-primary ms-auto"
            @click="nextStep"
          >
            Suivant →
          </button>

          <button
            v-else
            class="btn btn-success ms-auto"
            @click="finishWizard"
          >
            ✅ Terminer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import StepEtudiant from "./StepEtudiant.vue";
import StepInscription from "./StepInscription.vue";
import StepValidation from "./StepValidation.vue";
import StepPaiement from "./StepPaiement.vue";
// ⚠️ ton StepPaiement.vue reste séparé
//const StepPaiement = () => import("./StepPaiement.vue");

const props = defineProps({ modelValue: Object });
const emit = defineEmits(["update:modelValue", "finish"]);

const formData = ref(props.modelValue || {});

const currentStep = ref(0);
const steps = [
  { label: "Étudiant", component: StepEtudiant },
  { label: "Inscription", component: StepInscription },
  { label: "Paiement", component: StepPaiement },
  { label: "Validation", component: StepValidation }
];

function nextStep() {
  if (currentStep.value < steps.length - 1) currentStep.value++;
}
function prevStep() {
  if (currentStep.value > 0) currentStep.value--;
}
function goToStep(index) {
  if (index <= currentStep.value) currentStep.value = index;
}
function finishWizard() {
  emit("finish", formData.value);
}
</script>
