import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../components/HomeView.vue';
import ServiciosPublicos from '../components/ServiciosPublicos.vue';
import ServiciosPabellon from '../components/ServiciosPabellon.vue';
import Favoritos from '../components/Favoritos.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/todosServicios', component: ServiciosPublicos },
  { path: '/serviciosPabellon', component: ServiciosPabellon },
  { path: '/favoritos', component: Favoritos },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
