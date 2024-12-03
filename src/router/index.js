import { createRouter, createWebHistory } from 'vue-router';
import App from '@/App.vue';
import HomeView from '../views/HomeView.vue';
import ArtistView from '../views/ArtistView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/',
      component: App,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'artist',
          name: 'artist',
          component: ArtistView,
        },
      ],
    },
  ],
});

export default router;
