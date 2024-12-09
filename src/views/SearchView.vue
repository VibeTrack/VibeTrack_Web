<script setup>
import { ref, onMounted, watch } from 'vue';
import Artist from '../components/Artist.vue';
import Album from '../components/Album.vue';
import { API_BASE_URL } from '../../constants';
import { useSearchStore } from '@/stores/auth';

const searchStore = useSearchStore();
const artists = ref([]);

console.log(searchStore.searchQuery)
const getArtists = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}aurora/artists/search?name=${searchStore.searchQuery}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data);
    artists.value = data.result;
  } catch (error) {
    console.error('Error during fetch:', error);
  }
};

const albums = ref([]);
const getAlbums = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}aurora/albums/search?name=${searchStore.searchQuery}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    albums.value = data.result;
  } catch (error) {
    console.error('Error during fetch:', error);
  }
};

watch(() => searchStore.searchQuery, async (newSearchQuery) => {
  if (newSearchQuery) {
    await getArtists();
    await getAlbums();
  }
});

onMounted(async () => {
  await getArtists();
  await getAlbums();
});
</script>

<template>
  <div class="border border-gray-700 rounded-lg m-2">
    <div v-if="artists" class="mt-8 min-w-[800px]">
      <Artist Artist="Artist" :data=artists />
    </div>

    <div v-if="albums" class="mt-8 min-w-[800px]">
      <Album Album="Album" :data=albums />
    </div>

    <div class="pb-20"></div>
  </div>
</template>
