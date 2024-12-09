<script setup>
import { ref, onMounted } from 'vue';
import Artist from '../components/Artist.vue';
import Album from '../components/Album.vue';
import { API_BASE_URL } from '../../constants';
import { useAuthStore } from '@/stores/auth';
import MixesInspiredBy from '@/components/MixesInspiredBy.vue';

const authStore = useAuthStore();
const artists = ref([]);

const getArtists = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}aurora/artists`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    artists.value = data.result.content;
  } catch (error) {
    console.error('Error during fetch:', error);
  }
};

const albums = ref([]);
const getAlbums = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}aurora/albums`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    albums.value = data.result.content;
  } catch (error) {
    console.error('Error during fetch:', error);
  }
};

const mixes = ref([]);
const getMixes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}aurora/playlists`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    const data = await response.json();
    mixes.value = data.result;
  } catch (error) {
    console.error('Error during fetch:', error);
  }
};

onMounted(async () => {
  await getMixes();
  await getArtists();
  await getAlbums();
});
</script>

<template>
  <div class="border border-gray-700 rounded-lg m-2">
    <div v-if="mixes.length > 0" class="mt-8 min-w-[800px]">
      <div class=" px-8 text-white text-xl font-semibold inline-block">
        Mixes inspired by...
        <div class="text-sm font-light text-[#A2A2AD]">Discover new tracks similar to your favourites</div>
      </div>

      <div class="py-3"></div>
      <MixesInspiredBy :data=mixes />
    </div>

    <div class="mt-8 min-w-[800px]">
      <Artist Artist="Artist" :data=artists />
    </div>

    <div class="mt-8 min-w-[800px]">
      <Album Album="Recommend Album" :data=albums />
    </div>

    <div class="pb-20"></div>
  </div>
</template>
