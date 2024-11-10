<script setup>
import MixesInspiredBy from '@/components/MixesInspiredBy.vue';
import MultiArtistSelect from '@/components/MultiArtistSelect.vue';
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
  </div>
</template>
