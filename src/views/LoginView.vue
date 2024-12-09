<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { API_BASE_URL } from '../../constants';

const authStore = useAuthStore();

const router = useRouter();
const username = ref('');
const password = ref('');
const error = ref('');

const handleLogin = async () => {
  error.value = '';

  if (!username.value || !password.value) {
    error.value = 'Please fill in all fields.';
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}identity/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.message === 'Unauthenticated') {
        error.value = 'Incorrect username or password.';
      } else {
        error.value = errorData.message || 'Login failed. Please try again.';
      }
      return;
    }

    const data = await response.json();
    authStore.setAuthData(data.result.token, data.result.user);
    router.push('/home');
  } catch (err) {
    error.value = 'An error occurred. Please try again later.';
    console.error(err);
  }
};
</script>

<template>
  <div class="flex items-center justify-center h-screen bg-[#191922]">
    <div class="bg-[#32323D] p-8 rounded-lg w-full max-w-md">
      <h1 class="text-2xl font-bold text-white text-center mb-6">Login</h1>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-sm text-[#BEBEC7] mb-2" for="username">Username</label>
          <input id="username" v-model="username" type="text" placeholder="Enter your username"
            class="w-full p-3 rounded bg-[#191922] text-white placeholder-[#7E7E88] border border-[#32323D] focus:ring-2 focus:ring-[#EF5465] outline-none" />
        </div>

        <div class="mb-4">
          <label class="block text-sm text-[#BEBEC7] mb-2" for="password">Password</label>
          <input id="password" v-model="password" type="password" placeholder="Enter your password"
            class="w-full p-3 rounded bg-[#191922] text-white placeholder-[#7E7E88] border border-[#32323D] focus:ring-2 focus:ring-[#EF5465] outline-none" />
        </div>

        <p v-if="error" class="text-[#EF5465] text-sm mb-4">{{ error }}</p>
        <button type="submit"
          class="w-full py-3 rounded bg-[#EF5465] text-white font-bold hover:bg-[#D54558] transition">
          Login
        </button>
      </form>

      <p class="text-center text-sm text-[#A2A2AD] mt-6">
        Don't have an account?
        <RouterLink to="/register" class="text-[#EF5465] hover:underline">Register</RouterLink>
      </p>
    </div>
  </div>
</template>
