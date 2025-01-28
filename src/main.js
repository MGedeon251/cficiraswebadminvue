import { createApp } from 'vue'
import './assets/css/style.css'
import 'ant-design-vue/dist/reset.css';
import router from './routes'
import App from './App.vue'
const app = createApp(App);

app.use(router);
app.mount('#app');
