<script setup>
import MixesInspiredBy from '@/components/MixesInspiredBy.vue';
import MultiArtistSelect from '@/components/MultiArtistSelect.vue';
import CustomCarousel from '@/components/CustomCarousel.vue';
</script>

<template>
  <div class="max-w-[1500px] mx-auto">
    <div class="px-8 mt-8 min-w-[800px] w-fill">
      <div class="text-white text-xl font-semibold inline-block">
        Mixes inspried by...
        <div class="text-sm font-light text-[#A2A2AD]">Discover new tracks similar to your favourites</div>
      </div>

      <div class="py-3"></div>

      <div class="flex justify-between w-full gap-8">
        <div class="xl:w-1/3 w-1/2">
          <MixesInspiredBy 
            class="pb-1.5"
            text="Đừng làm trái tim anh đau"
            by="Sơn Tùng M-TP" 
            to="/artist"
            image="http://picsum.photos/id/147/300/300"
          />

          <MixesInspiredBy 
            class="pb-1.5"
            text="Chúng ta của tương lai"
            by="Sơn Tùng M-TP"
            to="/artist"
            image="http://picsum.photos/id/147/300/300"
          />

          <MixesInspiredBy 
            class="pb-1.5"
            text="Chúng ta của tương lai"
            by="Sơn Tùng M-TP"
            to="/artist"
            image="http://picsum.photos/id/147/300/300"
          />
        </div>
        <div class="xl:w-1/3 w-1/2">
          <MixesInspiredBy 
            class="pb-1.5"
            text="Đừng làm trái tim anh đau"
            by="Sơn Tùng M-TP" 
            to="/artist"
            image="http://picsum.photos/id/147/300/300"
          />

          <MixesInspiredBy 
            class="pb-1.5"
            text="Chúng ta của tương lai"
            by="Sơn Tùng M-TP"
            to="/artist"
            image="http://picsum.photos/id/147/300/300"
          />

          <MixesInspiredBy 
            class="pb-1.5"
            text="Chúng ta của tương lai"
            by="Sơn Tùng M-TP"
            to="/artist"
            image="http://picsum.photos/id/147/300/300"
          />
          />
        </div>
        <div class="xl:w-1/3 w-1/2">
          <MixesInspiredBy 
            class="pb-1.5"
            text="Đừng làm trái tim anh đau"
            by="Sơn Tùng M-TP" 
            to="/artist"
            image="http://picsum.photos/id/147/300/300"
          />

          <MixesInspiredBy 
            class="pb-1.5"
            text="Chúng ta của tương lai"
            by="Sơn Tùng M-TP"
            to="/artist"
            image="http://picsum.photos/id/147/300/300"
          />

          <MixesInspiredBy 
            class="pb-1.5"
            text="Chúng ta của tương lai"
            by="Sơn Tùng M-TP"
            to="/artist"
            image="http://picsum.photos/id/147/300/300"
          />
        </div>
      </div>
    </div>

    <div class="px-8 mt-8 min-w-[800px]">
      <div class="text-white text-xl font-semibold inline-block">
        Made for you 
      </div>

      <div class="py-3"></div>

      <div class="flex justify-start gap-7">
        <MultiArtistSelect
          class="w-1/4"
          category="daily"
          text="Playlist Sơn Tùng"
          to="/artist"
          :images="{
            one: 'https://picsum.photos/id/45/300/300',
            two: 'https://picsum.photos/id/55/300/300',
            three: 'https://picsum.photos/id/54/300/300',
            four: 'https://picsum.photos/id/76/300/300',
          }"
        />
        <MultiArtistSelect
          class="w-1/4"
          category="daily"
          text="Fan J97 "
          to="/artist"
          :images="{
            one: 'https://picsum.photos/id/45/300/300',
            two: 'https://picsum.photos/id/55/300/300',
            three: 'https://picsum.photos/id/54/300/300',
            four: 'https://picsum.photos/id/76/300/300',
          }"
        />
        <MultiArtistSelect
          class="w-1/4"
          category="daily"
          text="Vinh què"
          to="/artist"
          :images="{
            one: 'https://picsum.photos/id/45/300/300',
            two: 'https://picsum.photos/id/55/300/300',
            three: 'https://picsum.photos/id/54/300/300',
            four: 'https://picsum.photos/id/76/300/300',
          }"
        />
        <MultiArtistSelect
          class="w-1/4"
          category="daily"
          text="Playlist"
          to="/artist"
          :images="{
            one: 'https://picsum.photos/id/45/300/300',
            two: 'https://picsum.photos/id/55/300/300',
            three: 'https://picsum.photos/id/54/300/300',
            four: 'https://picsum.photos/id/76/300/300',
          }"
        />
      </div>
    </div>

    <div class="px-8 mt-8 min-w-[800px]">
      <div class="py-3"></div>

      <p class="text-center pb-6 text-[#D1D1D6] text-sm">Unlock Flow by selecting your favourite artists for improved</p>

      <div class="flex justify-center gap-7 w-full">
        <div class="flex items-center justify-center relative">
          <img width="100" class="absolute -left-36 rounded-full z-0 cursor-pointer" src="https://picsum.photos/id/76/300/300">
          <img width="115" class="absolute -left-[80px] rounded-full z-10 cursor-pointer" src="https://picsum.photos/id/76/300/300">
          <img width="160" class="rounded-full z-0 cursor-pointer" src="https://picsum.photos/id/76/300/300">
          <img width="115" class="absolute -right-[80px] rounded-full z-10 cursor-pointer" src="https://picsum.photos/id/76/300/300">
          <img width="100" class="absolute -right-36 rounded-full z-0 cursor-pointer" src="https://picsum.photos/id/76/300/300">
        </div>
      </div>

      <div class="w-full flex justify-center p-3">
        <button
          type="button"
          class="text-white text-[15px] font-semibold rounded-full bg-[#EF5465] hover:bg-[#d8384a] px-8 py-2 text-center"
        >
          ADD ARTIST
        </button>
      </div>
    </div>

    <div class="mt-8 min-w-[800px]">
      <CustomCarousel 
        category="New releases for you"
        :data = "[
          { url: 'https://picsum.photos/id/45/300/300', song: 'Something', by: '', releasedOn: ''},
          { url: 'https://picsum.photos/id/45/300/300', song: 'Something', by: '', releasedOn: ''},
          { url: 'https://picsum.photos/id/45/300/300', song: 'Something', by: '', releasedOn: ''},
          { url: 'https://picsum.photos/id/45/300/300', song: 'Something', by: '', releasedOn: ''},
          { url: 'https://picsum.photos/id/45/300/300', song: 'Something', by: '', releasedOn: ''},
          { url: 'https://picsum.photos/id/45/300/300', song: 'Something', by: '', releasedOn: ''},
          { url: 'https://picsum.photos/id/45/300/300', song: 'Something', by: '', releasedOn: ''},
          { url: 'https://picsum.photos/id/45/300/300', song: 'Something', by: '', releasedOn: ''},
          { url: 'https://picsum.photos/id/45/300/300', song: 'Something', by: '', releasedOn: ''},
          { url: 'https://picsum.photos/id/45/300/300', song: 'Something', by: '', releasedOn: ''},
          { url: 'https://picsum.photos/id/45/300/300', song: 'Something', by: '', releasedOn: ''},
          { url: 'https://picsum.photos/id/45/300/300', song: 'Something', by: '', releasedOn: ''},
          { url: 'https://picsum.photos/id/45/300/300', song: 'Something', by: '', releasedOn: ''},
        ]"
      />
    </div>
  </div>
</template>
