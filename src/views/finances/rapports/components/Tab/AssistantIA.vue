<template>
  <div class="ai-assistant-wrapper">
    <button 
      class="btn btn-dark rounded-circle shadow-lg ai-trigger" 
      @click="toggleChat"
      :class="{ 'pulse': !isOpen }"
    >
      <i class="mdi" :class="isOpen ? 'mdi-close' : 'mdi-robot-outline'"></i>
    </button>

    <Transition name="slide-up">
      <div v-if="isOpen" class="card ai-chat-window shadow-lg border-0">
        <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center py-3">
          <div class="d-flex align-items-center">
            <div class="bg-success rounded-circle me-2" style="width: 8px; height: 8px;"></div>
            <h6 class="mb-0 fw-bold">Assistant Business IA</h6>
          </div>
          <small class="opacity-75">Propulsé par Gemini</small>
        </div>

        <div class="card-body chat-messages" ref="chatContainer">
          <div class="message assistant mb-3">
            <div class="bubble p-3 shadow-sm bg-light text-dark">
              Bonjour ! Je suis votre analyste. Je peux analyser vos <strong>honoraires</strong>, 
              vos <strong>dépenses</strong> ou extraire des insights sur les <strong>paiements étudiants</strong>. 
              <br><em class="small mt-2 d-block">Posez-moi une question sur vos chiffres.</em>
            </div>
          </div>

          <div v-for="(msg, index) in messages" :key="index" :class="['message mb-3', msg.role]">
            <div :class="['bubble p-3 shadow-sm', msg.role === 'user' ? 'bg-dark text-white ms-auto' : 'bg-light text-dark']">
              {{ msg.text }}
            </div>
          </div>
        </div>

        <div class="card-footer bg-white border-top-0 p-3">
          <div class="input-group">
            <input 
              v-model="userInput" 
              @keyup.enter="sendMessage"
              type="text" 
              class="form-control border-light bg-light" 
              placeholder="Demander un insight..."
            />
            <button class="btn btn-dark" @click="sendMessage">
              <i class="mdi mdi-send"></i>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const isOpen = ref(false);
const userInput = ref('');
const chatContainer = ref(null);
const messages = ref([]);

const toggleChat = () => {
  isOpen.value = !isOpen.value;
};

const sendMessage = async () => {
  if (!userInput.value.trim()) return;

  // Ajouter message utilisateur
  messages.value.push({ role: 'user', text: userInput.value });
  const query = userInput.value;
  userInput.value = '';

  await nextTick();
  scrollToBottom();

  // Simulation de réponse IA
  setTimeout(() => {
    messages.value.push({ 
      role: 'assistant', 
      text: `Analyse en cours... Sur la base de vos données actuelles, vos dépenses opérationnelles ont augmenté de 12% ce mois-ci, principalement dû aux fournitures.` 
    });
    scrollToBottom();
  }, 1000);
};

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};
</script>

<style scoped>
.ai-assistant-wrapper {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 9999;
}

.ai-trigger {
  width: 60px;
  height: 60px;
  font-size: 24px;
  border: none;
  transition: transform 0.3s ease;
}

.ai-trigger:hover {
  transform: scale(1.1);
}

.ai-chat-window {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 350px;
  height: 500px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 15px;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #fbfbfb;
}

.bubble {
  max-width: 85%;
  border-radius: 18px;
  font-size: 0.9rem;
  line-height: 1.4;
}

.assistant .bubble {
  border-bottom-left-radius: 2px;
}

.user .bubble {
  border-bottom-right-radius: 2px;
}

/* Animations */
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s ease-out;
}
.slide-up-enter-from, .slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.pulse {
  animation: pulse-animation 2s infinite;
}

@keyframes pulse-animation {
  0% { box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(0, 0, 0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); }
}
</style>