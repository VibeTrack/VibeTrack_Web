<script setup>
import { onBeforeMount, ref, onMounted, watch } from 'vue';
import { RouterView, RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';

import Plus from 'vue-material-design-icons/Plus.vue';
import Magnify from 'vue-material-design-icons/Magnify.vue';
import MusicPlayer from './components/MusicPlayer.vue';
import Playlists from './components/Playlists.vue';
import { API_BASE_URL, avatar } from '../constants';

import { useSongStore } from './stores/song';
import { storeToRefs } from 'pinia';
import { useAuthStore, usePlaylistStore, useSearchStore } from '@/stores/auth';

const authStore = useAuthStore();
const playlistStore = usePlaylistStore();
const useSong = useSongStore();
const searchStore = useSearchStore();
const router = useRouter();
const user = JSON.parse(localStorage.getItem('user'));

const { isPlaying, currentTrack, trackTime } = storeToRefs(useSong);
const searchQuery = ref('');
const isDropdownOpen = ref(false);

onBeforeMount(() => {
  isPlaying.value = false;
  trackTime.value = '0:00';
});

watch(searchQuery, (newQuery) => {
  if (newQuery) {
    router.push(`/search/${newQuery}`);
    searchStore.setSearchtData(newQuery);
  }
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

const playlist = ref([]);
const getPlaylists = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}aurora/playlists`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    const data = await response.json();
    playlist.value = data.result;
  } catch (error) {
    console.error('Error during fetch:', error);
  }
};

onMounted(async () => {
  getPlaylists();
});

const createPlaylist = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}aurora/playlists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      router.push(`/playlist/${data.result.playlistId}`);
      playlistStore.setPlaylistData(data.result.playlistId)
    } else {
      console.error('Failed to create playlist');
    }
  } catch (error) {
    console.error('Error during fetch:', error);
  }
  window.location.reload();
}

const logout = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}identity/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('authToken'),
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
  router.push(`/profile/${user.id}`);
};
</script>

<template>
  <div id="TopNav"
    class="fixed right-0 flex items-center justify-between w-[calc(100%-240px)] h-[49px] border-b border-b-[#32323D] bg-[#191922] z-30">
    <div class="flex items-center w-full">
      <Magnify class="pl-6 mt-1 pr-2" fillColor="#7E7E88" :size="22" />
      <input v-model="searchQuery"
        class="p-1 bg-transparent outline-none font-[300] placeholder-[#BEBEC7] text-[#FFFFFF] w-full max-w-xl"
        placeholder="Search" type="text" />
    </div>

    <div class="flex items-center pr-10 relative">
      <button @click="toggleDropdown">
        <img class="rounded-full w-[33px] ml-4" :src="avatar" />
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
      <div class="flex justify-between items-center">
        <RouterLink to="/home" class="text-white my-auto">
          <div class="flex">
            <img src="/images/sound-icon.png" width="60">
            <div class="font-semibold mt-auto pl-2"> VibeTrack </div>
          </div>
        </RouterLink>
        <div @click="createPlaylist"
          class="p-1.5 mr-1 justify-end hover:bg-[#5a5a5a] hover:bg-opacity-50 rounded-full cursor-pointer">
          <Plus fillColor="#FFFFFF" :size="20" />
        </div>
      </div>
    </div>
    <div class="mt-[53px] pl-4">
      <Playlists Playlist="Playlist" :data=playlist />
    </div>
    <div class="mt-[53px]"></div>


  </div>

  <div id="mainContent"
    class="fixed w-[calc(100%-240px)] h-[calc(100%-56px)] ml-[240px] mt-[49px] overflow-x-auto overflow-y-auto z-10">
    <RouterView id="routerView" />
  </div>

  <MusicPlayer v-if="currentTrack" />

</template>
