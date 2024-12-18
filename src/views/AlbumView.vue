<script setup>
import { ref, onMounted } from 'vue';
import SongRow from '../components/SongRow.vue';
import { useRouter } from 'vue-router';
import { API_BASE_URL } from '../../constants';
import Play from 'vue-material-design-icons/Play.vue';
import Pause from 'vue-material-design-icons/Pause.vue';
import ClockTimeFiveOutline from 'vue-material-design-icons/ClockTimeFiveOutline.vue';
import { useSongStore } from '../stores/song'
import { useAlbumStore, useArtistStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
const router = useRouter();
const useSong = useSongStore()
const { isPlaying, currentTrack, currentArtist } = storeToRefs(useSong)
const albumStore = useAlbumStore()
const artistStore = useArtistStore()
const playFunc = () => {
  useSong.queue = album.value.songs;
  console.log(useSong.queue)

  if (!useSong.currentTrack && useSong.queue.length > 0) {
    useSong.currentTrack = useSong.queue[0];
  }

  useSong.playOrPauseThisSong(currentArtist.value, useSong.currentTrack);

}

const album = ref()
const getSongs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}aurora/albums/${albumStore.albumId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json();
    album.value = data.result
  } catch (error) {
    console.error('Error during fetch:', error);
  }
}

const toProfile = async () => {
  router.push(`/artist/${artistStore.artistId}`);
};

onMounted(() => {
  getSongs();
});

</script>

<template>
  <div v-if="album" class="border border-gray-700 rounded-lg m-2">
    <div id="HeaderSection" class="max-w-[1500px] mx-auto">
      <div class="flex items-center w-full relative h-full px-6 mt-6 min-w-[650px]">
        <img width="175" class="transition rounded-md" :src="album.imageUrl">
        <div class="ml-8">
          <div class="text-white">
            Single
          </div>
          <div class="text-white text-8xl w-[900px] font-semibold my-2 truncate">
            {{ album.name }}
          </div>
          <div class="flex">
            <div @click="toProfile"
              class="pl-2 text-white font-semibold hover:underline cursor-pointer justify-between">
              {{ album.artists[0].name }}
            </div>
            <div v-if="album.songs.length > 0" class="text-gray-200 pl-2">
              • {{ album.songs.length }} songs
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8"></div>
    </div>

    <div class="border-b border-b-[#302d2d]"></div>
    <div class="mb-5"></div>

    <div id="SongsSection" class="max-w-[1500px] mx-auto pl-4">

      <div class="mx-4 flex gap-4 items-center justify-start bottom-0 mb-1.5">
        <button class="p-2.5 px-6 hover:bg-red-600 rounded-full bg-red-400" @click="playFunc()">
          <div v-if="!isPlaying" class="flex items-center">
            <Play fillColor="#FFFFFF" :size="30" />
          </div>
          <div v-else class="flex items-center">
            <Pause fillColor="#FFFFFF" :size="30" />
          </div>
        </button>
      </div>

      <div class="mb-4"></div>

      <div class="flex items-center justify-between min-w-[590px] mx-4 border-b border-b-[#302d2d] py-2.5 px-1.5">
        <div class="text-xs font-light text-[#aeaeae]">TRACK</div>

        <ClockTimeFiveOutline fillColor="#aeaeae" :size="20" class="pr-2" />
      </div>

      <ul class="w-full mx-4 pr-8 min-w-[650px]" v-for="track in album.songs" :key="track">
        <SongRow v-if="track" :track="track" />
      </ul>
    </div>
    <div class="pb-20"></div>
  </div>
</template>

<style scoped>
.circle {
  width: 4px;
  height: 4px;
  background-color: rgb(189, 189, 189);
  border-radius: 100%;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
