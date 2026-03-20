<template>
  <div class="ai-hub-container border rounded shadow-sm bg-white">
    <div class="row g-0" style="height: 80vh;">
      
      <div class="col-md-3 border-end bg-light d-none d-md-flex flex-column">
        <div class="p-3 border-bottom bg-white">
          <h6 class="fw-bold mb-0">Analyses Récentes</h6>
        </div>
        <div class="flex-grow-1 overflow-auto p-2">
          <div class="list-group list-group-flush">
            <button v-for="h in history" :key="h.id" class="list-group-item list-group-item-action border-0 rounded mb-1 small">
              <i class="mdi mdi-history me-2 opacity-50"></i> {{ h.title }}
            </button>
          </div>
        </div>
        <div class="p-3 border-top">
          <button class="btn btn-outline-dark btn-sm w-100" @click="clearChat">
            <i class="mdi mdi-plus me-1"></i> Nouvelle Analyse
          </button>
        </div>
      </div>

      <div class="col-md-9 d-flex flex-column bg-white">
        
        <div class="p-3 border-bottom d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <div class="avatar-ia bg-dark text-white rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px;">
              <i class="mdi mdi-brain"></i>
            </div>
            <div>
              <h6 class="mb-0 fw-bold">Intelligence Opérationnelle</h6>
              <small class="text-success"><i class="mdi mdi-circle ms-0" style="font-size: 8px;"></i> Connecté aux données en temps réel</small>
            </div>
          </div>
          <button class="btn btn-sm btn-light border" @click="exportConversation">
            <i class="mdi mdi-download me-1"></i> Exporter l'audit
          </button>
        </div>

        <div class="chat-body flex-grow-1 p-4 overflow-auto" ref="chatBox">
          <div class="d-flex mb-4">
            <div class="message-bubble assistant p-3 rounded shadow-sm border bg-light">
              <p class="mb-2">Bonjour Administrateur. Je suis prêt à analyser l'ensemble des opérations de la plateforme.</p>
              <p class="mb-0 small text-muted">Exemples de questions que vous pouvez me poser :</p>
              <div class="mt-2 d-flex flex-wrap gap-2">
                <button @click="quickQuestion('Quel est le bénéfice net de ce mois ?')" class="btn btn-xs btn-outline-dark rounded-pill py-1 px-2 small-text">Bénéfice net du mois ?</button>
                <button @click="quickQuestion('Liste des impayés en Licence 1')" class="btn btn-xs btn-outline-dark rounded-pill py-1 px-2 small-text">Impayés L1</button>
                <button @click="quickQuestion('Prévision des honoraires pour le mois prochain')" class="btn btn-xs btn-outline-dark rounded-pill py-1 px-2 small-text">Prévisions Honoraires</button>
              </div>
            </div>
          </div>

          <div v-for="(msg, index) in messages" :key="index" :class="['d-flex mb-4', msg.role === 'user' ? 'justify-content-end' : '']">
            <div :class="['message-bubble p-3 rounded shadow-sm', msg.role === 'user' ? 'bg-dark text-white user' : 'bg-light border assistant']" style="max-width: 80%;">
              <div v-html="msg.text"></div>
              <div v-if="msg.stats" class="mt-2 pt-2 border-top border-secondary opacity-75 small">
                Source : Module {{ msg.stats.module }} | Données à jour
              </div>
            </div>
          </div>
          
          <div v-if="isTyping" class="text-muted small mb-3 italic">
            <span class="spinner-grow spinner-grow-sm me-1"></span> L'IA analyse les bases de données...
          </div>
        </div>

        <div class="p-4 border-top">
          <div class="input-group input-group-lg shadow-sm rounded">
            <input 
              v-model="query" 
              @keyup.enter="handleSend"
              type="text" 
              class="form-control border-0 bg-light" 
              placeholder="Ex: Compare les revenus de ce mois avec le mois précédent..."
            >
            <button class="btn btn-dark px-4" @click="handleSend">
              <i class="mdi mdi-send"></i>
            </button>
          </div>
          <p class="text-center text-muted mt-2 mb-0" style="font-size: 10px;">
            L'IA peut faire des erreurs. Vérifiez les chiffres importants dans les rapports officiels.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const query = ref('');
const isTyping = ref(false);
const chatBox = ref(null);
const messages = ref([]);
const history = ref([
  { id: 1, title: 'Analyse Taux Recouvrement Oct.' },
  { id: 2, title: 'Comparatif Dépenses Trimestrielles' }
]);

const handleSend = async () => {
  if (!query.value.trim()) return;

  const userText = query.value;
  messages.value.push({ role: 'user', text: userText });
  query.value = '';
  isTyping.value = true;

  await nextTick();
  scrollToBottom();

  // Simulation d'une réponse intelligente basée sur les modules
  setTimeout(() => {
    isTyping.value = false;
    messages.value.push({ 
      role: 'assistant', 
      text: `D'après les données du module <strong>Trésorerie</strong> et <strong>Paiements</strong> : <br>
             1. Les revenus ont augmenté de 15% grâce aux inscriptions de Master. <br>
             2. Cependant, le solde net est impacté par une hausse des charges opérationnelles (entretien). <br>
             <strong>Décision recommandée :</strong> Relancer les 42 étudiants de L1 en retard de paiement pour stabiliser le cash-flow.`,
      stats: { module: 'Finances & Scolarité' }
    });
    scrollToBottom();
  }, 1500);
};

const quickQuestion = (q) => {
  query.value = q;
  handleSend();
};

const scrollToBottom = () => {
  chatBox.value.scrollTop = chatBox.value.scrollHeight;
};

const clearChat = () => { messages.value = []; };
</script>

<style scoped>
.small-text { font-size: 11px; }
.chat-body { background-color: #fdfdfd; scroll-behavior: smooth; }

.message-bubble {
  position: relative;
  line-height: 1.5;
}

.message-bubble.assistant {
  border-bottom-left-radius: 0 !important;
}

.message-bubble.user {
  border-bottom-right-radius: 0 !important;
}

.avatar-ia {
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.btn-xs {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

/* Scrollbar personnalisée */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: #f1f1f1; }
::-webkit-scrollbar-thumb { background: #888; border-radius: 10px; }
</style>