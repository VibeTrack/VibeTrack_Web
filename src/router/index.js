import { createRouter, createWebHistory } from 'vue-router';
import App from '@/App.vue';
import HomeView from '../views/HomeView.vue';
import ArtistView from '../views/ArtistView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import ProfileView from '@/views/ProfileView.vue';
import EditView from '@/views/EditView.vue';

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
          path: 'home',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'artist',
          name: 'artist',
          component: ArtistView,
        },
        {
          path: 'podcasts',
          name: 'podcasts',
          component: HomeView,
        },
        {
          path: 'favourite',
          name: 'favourite',
          component: ArtistView,
        },
        {
          path: 'profile',
          name: 'profile',
          component: ProfileView,
        },
      ],
    },
    {
      path: '/edit-name',
      name: 'EditName',
      component: EditView,
    },
    {
      path: '/', // Route mặc định
      redirect: { name: 'login' }, // Chuyển hướng đến login
    },
    {
      path: '/:catchAll(.*)', // Wildcard route cho các URL không tồn tại
      redirect: { name: 'login' },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next({ name: 'login' });
  } else {
    next();
  }
});


export default router;
