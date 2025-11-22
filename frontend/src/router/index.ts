import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import PhotoDetail from '../components/PhotoDetail.vue';
import Admin from '../components/Admin.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/photo/:id', name: 'PhotoDetail', component: PhotoDetail, props: true },
  { path: '/admin', name: 'Admin', component: Admin },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
