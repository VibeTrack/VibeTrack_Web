<template>
  <div>
    <div class="flex justify-between pb-5 ml-8 mr-6">
      <div class="text-white items-center font-bold text-2xl mb-5">
        {{ Artist }}
      </div>
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
      <Slide v-for="slide in data" :key="slide.artistId" class="flex items-baseline">
        <div class="pl-8">
          <RouterLink @click="artistData(slide.artistId)" :to="`/artist/${artistStore.artistId}`"
            class="cursor-pointer">
            <div class="relative" @mouseenter="slide.isHover = true" @mouseleave="slide.isHover = false">
              <div
                :class="slide.isHover ? 'transition ease-in duration-150 bg-opacity-30' : 'transition ease-out duration-150 bg-opacity-5'"
                class="absolute w-full h-full bg-black z-10 rounded-md" />
              <img class="rounded-md aspect-square" :src="slide.imageUrl">
            </div>
            <div class="text-white text-left mt-2">
              <div class="text-sm hover:underline cursor-pointer">{{ slide.name }}</div>
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
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'
import 'vue3-carousel/dist/carousel.css'
import { useArtistStore } from '@/stores/auth'
import { Carousel, Slide } from 'vue3-carousel'
let currentSlide = ref(0)
const artistStore = useArtistStore()
const props = defineProps({ Artist: String, data: Array, })
const { Artist, data } = toRefs(props)

const artistData = (id) => {
  artistStore.setArtistData(id)
}

const slideTo = (val) => {
  if (val) {
    currentSlide.value += 4;
  } else {
    let res = currentSlide.value - 4;
    currentSlide.value = res > 0 ? res : 0;
  }
};


</script>