<script setup>
import { ref, onMounted } from 'vue';
import MultiArtistSelect from '../components/MultiArtistSelect.vue';
import SongRow from '../components/SongRow.vue';
import artist from '../playlist.json'
import Play from 'vue-material-design-icons/Play.vue';
import Pause from 'vue-material-design-icons/Pause.vue';
import { API_BASE_URL } from '../../constants';
import { useSongStore } from '../stores/song'
import { storeToRefs } from 'pinia';

const useSong = useSongStore()
const { isPlaying, currentTrack, currentArtist } = storeToRefs(useSong)

const playFunc = () => {
  if (currentTrack.value) {
    useSong.playOrPauseThisSong(currentArtist.value, currentTrack.value)
    return
  }
  useSong.playFromFirst()
}

// const artistData = ref()

// const getArtist = async () => {
//   try {
//     const response = await fetch(`${API_BASE_URL}aurora/artists/66CXWjxzNUsdJxJ2JdwvnR`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     const data = await response.json();
//     console.log(data);
//     artistData.value = data.result
//   } catch (error) {
//     console.error('Error during fetch:', error);
//   }
// };

// onMounted(() => {
//   getArtist();
// });

</script>

<template>
  <div class="border border-gray-700 rounded-lg m-2">
    <div id="HeaderSection" class="max-w-[1500px] mx-auto">

      <div class="flex items-center w-full relative h-full px-8 mt-6 min-w-[650px]">
        <img width="175" class="rounded-full transition" :src="artist.albumCover" alt="Album Cover">

        <div class="ml-8">
          <div class="text-white text-7xl w-full font-bold">
            {{ artist.name }}
          </div>
          <div class="py-1.5"></div>
          <div class="ml-8 text-white">
            {{ }} followers
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
        <button class="mx-3 border border-gray-700 px-4 rounded-full hover:border-gray-400">
          <div class="items-center m-2 text-white">
            Follow
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
          <ul v-if="currentTrack" class="w-full mx-3 pr-16 min-w-[650px]" v-for="track in artist.songs"
            :key="track.songId">
            <SongRow v-if="track" :track="track" />
          </ul>
        </div>
      </div>

      <div class="px-8 mt-4 min-w-[800px]">
        <div class="text-white text-2xl font-bold inline-block">
          Playlist
        </div>

        <div class="py-3"></div>

        <div class="flex justify-start gap-7 ">
          <MultiArtistSelect class="w-1/4"
            text="Featuring Bring Me the Horizon, Our Last Night, Bad Omens, The Retaliators" to="/playlist"
            :images=artist.albumCover />
          <MultiArtistSelect class="w-1/4"
            text="Featuring Metallica, Jessye Norman, Dresdner Philharmonie, San Francisco Symphony" to="/playlist"
            :images=link />
          <MultiArtistSelect class="w-1/4" text="Featuring Panter, Alden Karik, Arturiko, Krista Masalta" to="/playlist"
            :images=artist.albumCover />
          <MultiArtistSelect class="w-1/4" text="Featuring Machine Gun Kelly, Girlfriends, Mod Sun, Chri$tian Gate$"
            to="/playlist" :images=artist.albumCover />
        </div>
      </div>
    </div>
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