import { createApp } from 'vue';
import App from './App.vue';
import Router from './router/router';
import Store from './store/store'
/* import UserId from './store/userId'; */
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const app = createApp(App);
app.use(Router);
/* app.use(UserId); */
app.use(Store);
app.mount('#app');
