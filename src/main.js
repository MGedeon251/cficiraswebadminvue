import { createApp } from 'vue'
import { createPinia } from 'pinia';
import './assets/css/style.css'
import router from './routes'
import App from './App.vue'
const app = createApp(App);

app.use(router);
app.use(createPinia()); // Ajouter Pinia à ton application Vue 3
app.mount('#app');
