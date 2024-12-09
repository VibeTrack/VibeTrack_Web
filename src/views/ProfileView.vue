<script setup>
import MultiArtistSelect from '../components/MultiArtistSelect.vue';
import SongRow from '../components/SongRow.vue';
import artist from '../playlist.json'
import Play from 'vue-material-design-icons/Play.vue';
import Pause from 'vue-material-design-icons/Pause.vue';
import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue';
import HeartOutline from 'vue-material-design-icons/HeartOutline.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

// const changeProfile = () => {
//   try {
//     const request = {
//       id,
//       firstName,
//       lastName,
//       userName,
//     }
//     const response = await fetch('', {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(request),
//     })
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const newUser = await response.json();
//   } catch (error) {
//     error.value = err.message; // Lưu thông báo lỗi
//     console.error('Fetch error:', err);
//   }
// }

const link = "https://i.scdn.co/image/1e626ce84397ca38f1b6722d6658417082f6aa28"

let name = 'Bùi Minh Quân'

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      artist.value.albumCover = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// try {
//   const response = await fetch('', {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       token: authStore.token,
//     }),
//   })
//   console.log()

// } catch (error) {
//   console.error('Error during:', error);
// }

</script>

<template>
  <div class="border border-gray-700 rounded-lg m-2">
    <div id="HeaderSection" class="max-w-[1500px] mx-auto">
      <div class="flex items-center w-full relative h-full px-8 mt-6 min-w-[650px]">
        <label class="relative cursor-pointer">
          <img width="175" class="rounded-full hover:opacity-80 transition" :src="artist.albumCover" alt="Album Cover">
          <input type="file" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            @change="handleFileUpload">
        </label>

        <div class="ml-8">
          <div class="text-white">
            Profile
          </div>
          <div class="text-white text-7xl w-full hover:underline cursor-pointer font-bold"
            @click="$router.push('/edit-name')">
            {{ name }}
          </div>

          <div class="py-1.5"></div>
        </div>
      </div>

      <div class="mt-8"></div>
    </div>

    <div class="border-b border-b-[#302d2d]"></div>
    <div class="mb-5"></div>

    <div class="bg-gray pb-2">
      <div class="pl-8 flex">
        <DotsHorizontal @click="$router.push('/home')"
          class="rounded-full hover:bg-[#979797] hover:bg-opacity-20 cursor-pointer" fillColor="#CCCCCC" :size="35" />
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
          <ul class="w-full mx-3 pr-16 min-w-[650px]" v-for="track in artist.songs.slice(0, 4)" :key="track.id">
            <SongRow v-if="track" :track="track" />
          </ul>
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