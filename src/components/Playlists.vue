<template>
  <div>
    <div class="text-white items-center font-bold text-2xl my-auto">
      {{ Playlist }}
    </div>
    <div class="mt-[30px]">

    </div>
    <div class="grid grid-rows gap-4 overflow-y-auto max-h-[400px]">
      <div v-for="slide in data" :key="slide.playlistId" class="flex items-baseline w-full">
        <div class="w-full pr-2">
          <RouterLink @click="playlistData(slide.playlistId)" :to="`/playlist/${playlistStore.playlistId}`"
            class="relative w-full">
            <div class="flex items-center bg-[#23232D] rounded-md h-[54px] relative w-full">
              <div class="flex items-center w-[54px]" @mouseenter="slide.isHover = true"
                @mouseleave="slide.isHover = false">
                <div
                  :class="slide.isHover ? 'transition ease-in duration-100 bg-opacity-40' : 'transition ease-out duration-100 bg-opacity-5'"
                  class="absolute h-full z-10 w-[54px] bg-black rounded-sm" />
                <div
                  :class="slide.isHover ? 'transition ease-in duration-100 bg-opacity-1000' : 'transition ease-out duration-100 opacity-0'"
                  class="absolute z-20 p-1.5 rounded-full bg-white left-[6px]">
                  <Play :size="30" />
                </div>
                <img class="min-h-[54px] min-w-[54px] rounded-md z-0"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS340OK9lAB5iFoTaZPuQQfDKmpznknFPYrZA&s" />
              </div>
              <div class="truncate w-full ml-4">
                <p class="hover:underline truncate max-w-[95%] text-gray-200 font-light text-[15px] cursor-pointer">
                  {{ slide.name }}
                </p>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs, watch } from 'vue'
import { RouterLink } from 'vue-router';
import Play from 'vue-material-design-icons/Play.vue'
import { usePlaylistStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter()
const playlistStore = usePlaylistStore()
const props = defineProps({ Playlist: String, data: Array })
const { Playlist, data } = toRefs(props)

const playlistData = (id) => {
  playlistStore.setPlaylistData(id);
  // Kiểm tra playlistId không rỗng trước khi chuyển hướng
  if (id) {
    router.push(`/playlist/${playlistStore.playlistId}`);
  }
};

// Theo dõi sự thay đổi của playlistId và reload trang khi thay đổi
watch(() => playlistStore.playlistId, (newPlaylistId, oldPlaylistId) => {
  if (newPlaylistId !== oldPlaylistId && newPlaylistId) {
    // Nếu playlistId thay đổi và không rỗng, reload trang
    router.go(0); // Điều này sẽ reload trang
  }
});

</script>
<style scoped>
.grid {
  scrollbar-width: thin;
  scrollbar-color: #4d4d4d #191922;
}

.grid::-webkit-scrollbar-thumb {
  background-color: #4d4d4d;
  border-radius: 5px;
}

.grid::-webkit-scrollbar-track {
  background-color: #191922;
}
</style>