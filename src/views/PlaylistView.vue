<script setup>
import { ref, onMounted } from 'vue';
import SongRow from '../components/SongRow.vue';
import { useRouter } from 'vue-router';
import { API_BASE_URL, avatar } from '../../constants';
import Play from 'vue-material-design-icons/Play.vue';
import Pause from 'vue-material-design-icons/Pause.vue';
import ClockTimeFiveOutline from 'vue-material-design-icons/ClockTimeFiveOutline.vue';
import { useSongStore } from '../stores/song'
import { storeToRefs } from 'pinia';
import { usePlaylistStore } from '@/stores/auth';
const playlistStore = usePlaylistStore();
const router = useRouter();
const useSong = useSongStore()
const { isPlaying, currentTrack, currentArtist } = storeToRefs(useSong)

const playFunc = () => {
  useSong.queue = playlist.value.songs;
  console.log(useSong.queue)

  if (!useSong.currentTrack && useSong.queue.length > 0) {
    useSong.currentTrack = useSong.queue[0];
  }

  useSong.playOrPauseThisSong(currentArtist.value, useSong.currentTrack);
}

console.log(useSong.currentTrack)

const user = JSON.parse(localStorage.getItem('user'));
const userInfo = ref()
const getUser = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}identity/users/${user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    const data = await response.json();
    userInfo.value = data.result;
  } catch (error) {
    console.error('Error during fetch:', error);
  }
};

const playlist = ref()
const getSongs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}aurora/playlists/${playlistStore.playlistId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
    const data = await response.json();
    playlist.value = data.result;
  } catch (error) {
    console.error('Error during fetch:', error);
  }
}

const recommendList = ref([])
const getRecommendSongs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}ai/song/recommend/${useSong.currentTrack.songId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
    const data = await response.json();
    recommendList.value = data.result
    console.log(recommendList)
  } catch (error) {
    console.error('Error during fetch:', error);
  }
}

const toProfile = async () => {
  router.push(`/profile/${user.id}`);
};

onMounted(() => {
  getSongs();
  getRecommendSongs();
  getUser();
});
</script>

<template>
  <div v-if="playlist && userInfo" class="border border-gray-700 rounded-lg m-2">
    <div id="HeaderSection" class="max-w-[1500px] mx-auto">
      <div class="flex items-center w-full relative h-full px-6 mt-6 min-w-[650px]">
        <img width="175" class="transition rounded-md"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS340OK9lAB5iFoTaZPuQQfDKmpznknFPYrZA&s">
        <div class="ml-8">
          <div class="text-white">
            Playlist
          </div>
          <div class="text-white text-8xl w-full cursor-pointer font-semibold my-2">
            {{ playlist.name }}
          </div>
          <div class="flex">
            <img width="30" class="transition rounded-full" :src=avatar>
            <div @click="toProfile"
              class="pl-2 text-white font-semibold hover:underline cursor-pointer justify-between">
              {{ userInfo.firstName }}
            </div>
            <div v-if="playlist.songs.length > 0" class="text-gray-200 pl-2">
              • {{ playlist.songs.length }} songs
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
        <button v-if="playlist.songs.length > 0" class="p-2.5 px-6 hover:bg-red-600 rounded-full bg-red-400"
          @click="playFunc()">
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

      <ul class="w-full mx-4 pr-8 min-w-[650px]" v-for="track in playlist.songs" :key="track">
        <SongRow v-if="track" :track="track" />
      </ul>
    </div>
    <div class="pb-20"></div>
    <div v-if="playlist.songs.length > 0">
      <div class="flex items-center justify-between min-w-[590px] mx-4 border-b border-b-[#302d2d] py-2.5 px-1.5">
        <div class="text-white text-xl font-semibold inline-block">
          Recommended
          <div class="text-sm font-light text-[#A2A2AD]">Based on what's in this playlist</div>
        </div>
      </div>
      <ul class="w-full mx-4 pr-8 min-w-[650px]" v-for="track in recommendList" :key="track">
        <SongRow v-if="track" :track="track" />
      </ul>
    </div>
    <div class="pb-10"></div>
  </div>
  <div class="pb-20"></div>
</template>

<style scoped>
.circle {
  width: 4px;
  height: 4px;
  background-color: rgb(189, 189, 189);
  border-radius: 100%;
}
</style>
