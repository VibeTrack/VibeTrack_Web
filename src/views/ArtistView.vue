<script setup>
import SongRow from '../components/SongRow.vue';

import Play from 'vue-material-design-icons/Play.vue';
import Pause from 'vue-material-design-icons/Pause.vue';
import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue';
import HeartOutline from 'vue-material-design-icons/HeartOutline.vue';
import ClockTimeFiveOutline from 'vue-material-design-icons/ClockTimeFiveOutline.vue';
import artist from '../artist.json'

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

</script>

<template>
  <div class="border border-gray-700 rounded-lg m-2">
    <div id="HeaderSection" class="max-w-[1500px] mx-auto">
      <div class="flex items-center w-full relative h-full px-8 mt-6 min-w-[650px]">
        <img width="175" class="rounded-full" :src="artist.albumCover">

        <div class="ml-8">
          <div class="text-white text-3xl w-full hover:underline cursor-pointer font-semibold">
            {{ artist.name }}
          </div>

          <div class="py-1.5"></div>

          <div class="flex gap-4 items-center justify-start bottom-0 mb-1.5">
            <button class="p-2.5 px-6 rounded-full bg-[#EF5465]" @click="playFunc()">
              <div v-if="!isPlaying" class="flex items-center">
                <Play fillColor="#FFFFFF" :size="20" />
                <div class="text-white font-bold text-xs pr-1">PLAY</div>
              </div>
              <div v-else class="flex items-center">
                <Pause fillColor="#FFFFFF" :size="20" />
                <div class="text-white font-bold text-xs pr-1">PAUSE</div>
              </div>
            </button>
            <button type="button" class="rounded-full p-2 border border-[#52525D] hover:bg-[#2b2b30]">
              <HeartOutline fillColor="#EAEAEA" :size="20" />
            </button>
            <button type="button" class="rounded-full p-2 border border-[#52525D] hover:bg-[#2b2b30]">
              <DotsHorizontal fillColor="#EAEAEA" :size="20" />
            </button>
          </div>
        </div>
      </div>

      <div class="mt-8"></div>
    </div>

    <div class="border-b border-b-[#302d2d]"></div>
    <div class="mb-5"></div>

    <div id="SongsSection" class="max-w-[1500px] mx-auto">

      <div class="mb-4"></div>

      <div class="flex items-center justify-between min-w-[590px] mx-4 border-b border-b-[#302d2d] py-2.5 px-1.5">
        <div class="text-xs font-light text-[#aeaeae]">TRACK</div>
        <ClockTimeFiveOutline fillColor="#aeaeae" :size="20" />
      </div>

      <ul class="w-full mx-4 pr-16 min-w-[650px]" v-for="track in artist.tracks" :key="track">
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
</style>
