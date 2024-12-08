<template>
  <div>
    <div class="flex justify-between pb-5 ml-8 mr-6">
      <RouterLink to="/artist" @mouseenter="isHoverPlaylist = true" @mouseleave="isHoverPlaylist = false"
        :class="isHoverPlaylist ? 'hover:text-[#EF5465]' : 'text-white'"
        class="flex items-center font-semibold text-xl cursor-pointer">
        {{ Playlist }}
        <ChevronRight :fillColor="isHoverPlaylist ? '#EF5465' : '#FFFFFF'" :size="25" class="mt-1" />
      </RouterLink>
      <div class="flex items-center">
        <button @click="slideTo(false)" class="rounded-full p-2 hover:bg-[#2b2b2b]">
          <ChevronLeft fillColor="#FFFFFF" :size="30" />
        </button>
        <div class="px-2"></div>
        <button @click="slideTo(true)" class="rounded-full p-2 hover:bg-[#2b2b2b]">
          <ChevronRight fillColor="#FFFFFF" :size="30" />
        </button>
      </div>
    </div>
    <Carousel class="mr-8" ref="carousel" v-model="currentSlide" :items-to-show="4" :items-to-scroll="4"
      :transition="800" snapAlign="start">
      <Slide v-for="slide in data" :key="slide" class="flex items-baseline">
        <div class="pl-8">
          <RouterLink to="/Playlist" class="cursor-pointer">
            <div class="relative" @mouseenter="isHover = true" @mouseleave="isHover = false">
              <div
                :class="isHover ? 'transition ease-in duration-150 bg-opacity-30' : 'transition ease-out duration-150 bg-opacity-5'"
                class="absolute w-full h-full bg-black z-10 rounded-md" />
              <div class="absolute z-50 bottom-3 left-3 rounded-full bg-white p-1.5">
                <Play :size="27" />
              </div>
              <img class="rounded-md aspect-square" :src="slide.image">
            </div>
            <div class="text-white text-left mt-2">
              <div class="text-sm hover:underline cursor-pointer">{{ slide.song }}</div>
            </div>
          </RouterLink>
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import { RouterLink } from 'vue-router'
import Play from 'vue-material-design-icons/Play.vue'
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
let currentSlide = ref(0)
let isHoverPlaylist = ref(false)
let isHover = ref(false)
const props = defineProps({ Playlist: String, data: Array, })
const { Playlist, data } = toRefs(props)

const slideTo = (val) => {
  if (val && currentSlide.value <= 7) {

    let res = currentSlide.value + 4
    if (res <= 12) {
      currentSlide.value = currentSlide.value + 4
    } else if (res > 12) {
      currentSlide.value = 12
    }

  } else if (!val) {
    let res = currentSlide.value - 4
    if (res > 0) {
      currentSlide.value = currentSlide.value - 4
    } else if (res < 1) {
      currentSlide.value = 0
    }

  }
}
</script>