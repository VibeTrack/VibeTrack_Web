<template>
  <div>
    <RouterLink :to="to" class="relative">
      <div @mouseenter="isHover = true" @mouseleave="isHover = false"
        class="flex justify-center items-center contrast-[2] brightness-[0.87] rounded-md aspect-square overflow-hidden">
        <div
          :class="isHover ? 'transition ease-in duration-150 bg-opacity-20' : 'transition ease-out duration-150 bg-opacity-5'"
          class="absolute w-full h-full bg-black z-10 rounded-md" />
        <img class="absolute right-0 top-0" :src="images">
        <div class="absolute z-10 p-2 rounded-full bg-white inline-block">
          <Play :size="33" />
        </div>
      </div>
    </RouterLink>
    <div class="h-2"></div>
    <RouterLink :to="to">
      <div class="hover:underline text-gray-200 font-light text-sm">
        {{ text }}
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import { RouterLink } from 'vue-router';

import Play from 'vue-material-design-icons/Play.vue'

let isHover = ref(false)

const props = defineProps({ images: Object, text: String, to: String })
const { images, text, to } = toRefs(props)
</script>