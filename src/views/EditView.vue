<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const newName = ref('');
const router = useRouter();

const handleSave = () => {
  if (!newName.value.trim()) {
    alert('Name cannot be empty!');
    return;
  }
  console.log('Saved name:', newName.value);
  router.push('/profile'); 
};

const handleCancel = () => {
  router.push('/profile');
};
</script>

<template>
  <div class="flex items-center justify-center h-screen bg-[#191922]">
    <div class="bg-[#32323D] p-8 rounded-lg w-full max-w-md">
      <h1 class="text-2xl font-bold text-white text-center mb-6">Edit Name</h1>

      <form @submit.prevent="handleSave">
        <div class="mb-4">
          <label class="block text-sm text-[#BEBEC7] mb-2" for="name">New Name</label>
          <input id="name" v-model="newName" type="text" placeholder="Enter your new name"
            class="w-full p-3 rounded bg-[#191922] text-white placeholder-[#7E7E88] border border-[#32323D] focus:ring-2 focus:ring-[#EF5465] outline-none" />
        </div>

        <div class="flex justify-between">
          <button type="button" @click="handleCancel"
            class="w-[48%] py-3 rounded bg-gray-600 text-white font-bold hover:bg-gray-500 transition">
            Cancel
          </button>
          <button type="submit"
            class="w-[48%] py-3 rounded bg-[#EF5465] text-white font-bold hover:bg-[#D54558] transition">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
