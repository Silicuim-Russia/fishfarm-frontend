import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import HomePage from '@/views/HomePage.vue';
import SelectPage from '@/views/SelectPage.vue';

const routes = [
  {
    path: '/pool/:id',
    name: 'HomePage',
    component: HomePage,
    props: (route) => ({ pool_id: route.params.id }),
  },
  {
    path: '/',
    name: 'SelectPage',
    component: SelectPage,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
