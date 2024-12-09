<script setup>
import { ref, onMounted } from 'vue';
import SongRow from '../components/SongRow.vue';
import { API_BASE_URL } from '../../constants';
import { useRouter } from 'vue-router';
import { avatar } from '../../constants';
import { useAuthStore } from '@/stores/auth';
import MixesInspiredBy from '@/components/MixesInspiredBy.vue';
import { useSongStore } from '@/stores/song';

const router = useRouter();
const useSong = useSongStore()

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

onMounted(() => {
  getUser();
  getMixes();
});

</script>

<template>
  <div v-if="userInfo" class="border border-gray-700 rounded-lg m-2">
    <div id="HeaderSection" class="max-w-[1500px] mx-auto">
      <div class="flex items-center w-full relative h-full px-8 mt-6 min-w-[650px]">
        <label class="relative cursor-pointer">
          <img width="175" class="rounded-full hover:opacity-80 transition" :src="avatar" alt="Album Cover">
          <input type="file" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
        </label>

        <div class="ml-8">
          <div class="text-white">
            Profile
          </div>
          <div class="text-white text-7xl w-full hover:underline cursor-pointer font-bold"
            @click="$router.push('/edit-name')">
            {{ userInfo.firstName }}
          </div>

          <div class="py-1.5"></div>
        </div>
      </div>

      <div class="mt-8"></div>
    </div>

    <div class="border-b border-b-[#302d2d]"></div>
    <div class="mb-5"></div>

    <div class="bg-gray pb-2">
      <div class="px-8 mt-4 min-w-[800px]">
        <div class="text-white text-2xl font-bold inline-block">
          Your Playlist
        </div>

        <div class="py-3"></div>

        <div>
          <MixesInspiredBy :data=mixes />
        </div>
      </div>

      <div class="px-8 mt-8 min-w-[800px]">
        <div class="flex flex-col">
          <div class="text-white text-2xl font-bold inline-block">
            Currently Song List
          </div>
          <div class="text-white ml-3 text-xs">
            Only visible to you
          </div>
        </div>

        <div class="py-3"></div>

        <div class="border border-gray-700 rounded-lg m-2">
          <div class="mt-1"></div>
          <ul class="w-full mx-3 pr-16 min-w-[650px]" v-for="track in useSong.queue" :key="track.id">
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