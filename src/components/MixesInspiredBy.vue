<template>
  <div>
    <div class="grid grid-cols-2 gap-4 mr-8">
      <div v-for="slide in data.slice(0, 2)" :key="slide.playlistId" class="flex items-baseline w-full">
        <div class="w-full pl-8">
          <RouterLink @click="playlistData(slide.playlistId)" :to="`/playlist/${slide.playlistId}`"
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
import { toRefs } from 'vue'
import { RouterLink } from 'vue-router';
import Play from 'vue-material-design-icons/Play.vue'
import { usePlaylistStore } from '@/stores/auth';

const playlistStore = usePlaylistStore()
const props = defineProps({ data: Array })
const { data } = toRefs(props)

const playlistData = (id) => {
  playlistStore.setPlaylistData(id)
}
</script>
