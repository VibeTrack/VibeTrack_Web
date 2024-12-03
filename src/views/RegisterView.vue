<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const firstName = ref('');
const lastName = ref('');
const error = ref('');

const handleRegister = async () => {
  // Field validation
  if (!username.value || !password.value || !confirmPassword.value || !firstName.value || !lastName.value) {
    error.value = 'Please fill in all fields.';
    return;
  }

  // Username length validation
  if (username.value.length < 4) {
    error.value = 'Username must be at least 4 characters long.';
    return;
  }

  // Password length validation
  if (password.value.length < 8) {
    error.value = 'Password must be at least 8 characters long.';
    return;
  }

  // Confirm password validation
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.';
    return;
  }

  try {
    const response = await fetch('http://localhost:8080/identity/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Username uniqueness validation based on server response
      if (data.message.includes('Username already exists')) {
        error.value = 'Username already exists. Please choose another one.';
      } else {
        error.value = data.message || 'Registration failed. Please try again.';
      }
      return;
    }

    // On successful registration, redirect to login page
    router.push('/login');
  } catch (err) {
    error.value = 'An error occurred. Please try again later.';
    console.error(err);
  }
};
</script>

<template>
  <div class="flex items-center justify-center h-screen bg-[#191922]">
    <div class="bg-[#32323D] p-8 rounded-lg w-full max-w-md">
      <h1 class="text-2xl font-bold text-white text-center mb-6">Register</h1>

      <form @submit.prevent="handleRegister">
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

        <div class="mb-4">
          <label class="block text-sm text-[#BEBEC7] mb-2" for="confirmPassword">Confirm Password</label>
          <input id="confirmPassword" v-model="confirmPassword" type="password" placeholder="Confirm your password"
            class="w-full p-3 rounded bg-[#191922] text-white placeholder-[#7E7E88] border border-[#32323D] focus:ring-2 focus:ring-[#EF5465] outline-none" />
        </div>

        <div class="mb-4">
          <label class="block text-sm text-[#BEBEC7] mb-2" for="firstName">First Name</label>
          <input id="firstName" v-model="firstName" type="text" placeholder="Enter your first name"
            class="w-full p-3 rounded bg-[#191922] text-white placeholder-[#7E7E88] border border-[#32323D] focus:ring-2 focus:ring-[#EF5465] outline-none" />
        </div>

        <div class="mb-4">
          <label class="block text-sm text-[#BEBEC7] mb-2" for="lastName">Last Name</label>
          <input id="lastName" v-model="lastName" type="text" placeholder="Enter your last name"
            class="w-full p-3 rounded bg-[#191922] text-white placeholder-[#7E7E88] border border-[#32323D] focus:ring-2 focus:ring-[#EF5465] outline-none" />
        </div>

        <p v-if="error" class="text-[#EF5465] text-sm mb-4">{{ error }}</p>

        <button type="submit"
          class="w-full py-3 rounded bg-[#EF5465] text-white font-bold hover:bg-[#D54558] transition">
          Register
        </button>
      </form>

      <p class="text-center text-sm text-[#A2A2AD] mt-6">
        Already have an account?
        <RouterLink to="/login" class="text-[#EF5465] hover:underline">Login</RouterLink>
      </p>
    </div>
  </div>
</template>
