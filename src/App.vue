<script setup>
import { onBeforeMount, ref } from 'vue';
import { RouterView, RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';


import Magnify from 'vue-material-design-icons/Magnify.vue';
import SideMenuItem from './components/SideMenuItem.vue';
import MusicPlayer from './components/MusicPlayer.vue';
import SongLyrics from './components/SongLyrics.vue';
import { API_BASE_URL } from '../constants';

import { useSongStore } from './stores/song';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const useSong = useSongStore();
const router = useRouter();

const { isPlaying, currentTrack, isLyrics, trackTime } = storeToRefs(useSong);

const isDropdownOpen = ref(false);

onBeforeMount(() => {
  isPlaying.value = false;
  isLyrics.value = false;
  trackTime.value = '0:00';
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const handleProfileClick = () => {
  profile();
  closeDropdown();
};

const logout = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}identity/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: authStore.token,
      }),
    });
    if (response.ok) {
      router.push('/login');
    } else {
      console.error('Logout failed');
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
const profile = async () => {
  router.push('/profile');
};
</script>

<template>
  <div id="TopNav"
    class="fixed right-0 flex items-center justify-between w-[calc(100%-240px)] h-[49px] border-b border-b-[#32323D] bg-[#191922] z-30">
    <div class="flex items-center w-full">
      <Magnify class="pl-6 mt-1 pr-2" fillColor="#7E7E88" :size="22" />
      <input class="p-1 bg-transparent outline-none font-[300] placeholder-[#BEBEC7] text-[#FFFFFF] w-full max-w-xl"
        placeholder="Search" type="text" />
    </div>

    <div class="flex items-center pr-10 relative">
      <button @click="toggleDropdown">
        <img class="rounded-full w-[33px] ml-4"
          src="https://yt3.ggpht.com/e9o-24_frmNSSVvjS47rT8qCHgsHNiedqgXbzmrmpsj6H1ketcufR1B9vLXTZRa30krRksPj=s88-c-k-c0x00ffffff-no-rj-mo"
          alt="User Avatar" />
      </button>
      <ul v-if="isDropdownOpen" id="dropdownMenu"
        class="absolute top-full right-10 mt-2 w-35 bg-gray-900 text-white border border-gray-700 rounded-lg shadow-lg z-10">
        <li @click="handleProfileClick" class="px-4 py-2 hover:bg-gray-800 cursor-pointer text-sm">
          Profile
        </li>
        <li @click="logout" class="px-4 py-2 hover:bg-gray-800 cursor-pointer text-sm">
          Logout
        </li>
      </ul>
    </div>
  </div>

  <div id="SideNav" class="fixed w-[240px] bg-[#191922] h-[100vh] border-r border-r-[#32323D] z-20">
    <div class="w-full pl-6 pt-3 cursor-pointer">
      <RouterLink to="/" class="text-white">
        VIBETRACK
      </RouterLink>
    </div>

    <div class="mt-[53px]"></div>

    <SideMenuItem iconString="music" :iconSize="20" pageUrl="/home" name="Music" />
    <SideMenuItem iconString="explore" :iconSize="20" pageUrl="/playlist" name="Explore" />
    <SideMenuItem iconString="favourite" :iconSize="20" pageUrl="/favourite" name="Favourites" />
  </div>

  <div id="mainContent"
    class="fixed w-[calc(100%-240px)] h-[calc(100%-56px)] ml-[240px] mt-[49px] overflow-x-auto overflow-y -auto z-10">
    <RouterView id="routerView" />
  </div>

  <MusicPlayer v-if="currentTrack" />

  <SongLyrics v-if="isLyrics" :class="{ 'animate__animated animate__slideInUp animate__faster': isLyrics }" />
</template>
