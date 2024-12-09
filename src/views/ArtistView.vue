<template>
  <div v-if="artistData" class="border border-gray-700 rounded-lg m-2">
    <div id="HeaderSection" class="max-w-[1500px] mx-auto">

      <div class="flex items-center w-full relative h-full px-8 mt-6 min-w-[650px]">
        <img width="175" class="rounded-full transition" :src="artistData.imageUrl">

        <div class="ml-8">
          <div class="text-white text-7xl w-full font-bold">
            {{ artistData.name }}
          </div>
          <div class="py-1.5"></div>
          <div class="text-white">
            {{ artistData.followers }} followers
          </div>
        </div>
      </div>
      <div class="mt-8"></div>
    </div>

    <div class="border-b border-b-[#302d2d]"></div>
    <div class="mb-5"></div>

    <div class="bg-gray pb-2">
      <div class="pl-8 flex">
        <button class="p-2.5 px-6 hover:bg-red-600 rounded-full bg-red-400" @click="playFunc()">
          <div v-if="!isPlaying" class="flex items-center">
            <Play fillColor="#FFFFFF" :size="30" />
          </div>
          <div v-else class="flex items-center">
            <Pause fillColor="#FFFFFF" :size="30" />
          </div>
        </button>
      </div>

      <div class="px-8 mt-8 min-w-[800px]">
        <div class="flex flex-col">
          <div class="text-white text-2xl font-bold inline-block">
            Top tracks
          </div>
          <div class="text-white ml-3 text-xs">
            Only visible to you
          </div>
        </div>

        <div class="py-3"></div>

        <div class="border border-gray-700 rounded-lg m-2">
          <div class="mt-1"></div>
          <ul class="w-full mx-3 pr-16 min-w-[650px]" v-for="track in artistData.songs.slice(0, 7)" :key="track.songId">
            <SongRow v-if="track" :track="track" />
          </ul>
        </div>
      </div>

      <div class="px-4 mt-4 min-w-[800px]">
        <Album Album="Album" :data=artistData.albums />
      </div>
    </div>
  </div>
  <div class="pb-20"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SongRow from '../components/SongRow.vue';
import Play from 'vue-material-design-icons/Play.vue';
import Pause from 'vue-material-design-icons/Pause.vue';
import { API_BASE_URL } from '../../constants';
import { useSongStore } from '../stores/song'
import { storeToRefs } from 'pinia';
import Album from '@/components/Album.vue';
import { useArtistStore } from '@/stores/auth';

const artistStore = useArtistStore()
const useSong = useSongStore()
const { isPlaying, currentTrack, currentArtist } = storeToRefs(useSong)

const playFunc = () => {
  useSong.queue = artistData.value.songs;

  if (!useSong.currentTrack && useSong.queue.length > 0) {
    useSong.currentTrack = useSong.queue[0];
  }

  useSong.playOrPauseThisSong(currentArtist.value, useSong.currentTrack);

}
const artistData = ref()
const getArtist = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}aurora/artists/${artistStore.artistId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data);
    artistData.value = data.result
  } catch (error) {
    console.error('Error during fetch:', error);
  }
};

onMounted(() => {
  getArtist();
});
</script>
