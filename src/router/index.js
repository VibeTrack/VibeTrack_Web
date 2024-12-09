import { createRouter, createWebHistory } from 'vue-router';
import App from '@/App.vue';
import HomeView from '../views/HomeView.vue';
import PlaylistView from '../views/PlaylistView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import ProfileView from '@/views/ProfileView.vue';
import EditView from '@/views/EditView.vue';
import ArtistView from '@/views/ArtistView.vue';
import AlbumView from '@/views/AlbumView.vue';
import SearchView from '@/views/SearchView.vue';

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
          path: 'playlist/:id',
          name: 'playlist',
          component: PlaylistView,
        },
        {
          path: 'artist/:id',
          name: 'artist',
          component: ArtistView,
        },
        {
          path: 'profile/:id',
          name: 'profile',
          component: ProfileView,
        },
        {
          path: 'album/:id',
          name: 'album',
          component: AlbumView,
        },
        {
          path: 'search/:query',
          name: 'search',
          component: SearchView,
          props: true,  // Để truyền tham số vào component dưới dạng props
        },
      ],
    },
    {
      path: '/edit-name/:id',
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
