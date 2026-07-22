<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
    <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100">
      <!-- Header with decorative element -->
      <div class="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-center">
        <h2 class="text-3xl font-bold text-white">Admin Portal</h2>
        <p class="text-indigo-100 mt-1">Access your administration dashboard</p>
      </div>

      <div class="p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email Field -->
          <div class="space-y-2">
            <label for="email" class=" text-sm font-medium text-gray-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400"
              placeholder="admin@example.com"
            />
          </div>

          <!-- Password Field -->
          <div class="space-y-2">
            <label for="password" class=" text-sm font-medium text-gray-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Password
            </label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400"
              placeholder="••••••••"
            />
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center"
          >
            <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{{ loading ? 'Authenticating...' : 'Login' }}</span>
          </button>

          <!-- Error Message -->
          <p v-if="error" class="mt-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ error }}
          </p>
        </form>
      </div>

      <!-- Footer Note -->
      <div class="bg-gray-50 px-8 py-4 text-center border-t border-gray-200">
        <p class="text-sm text-gray-500">For authorized personnel only</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import API from '../../services/api';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);
const router = useRouter();

const handleLogin = async () => {
  error.value = '';
  loading.value = true;
  
  try {
    const res = await API.post('/auth/admin/login', {
      email: email.value,
      password: password.value
    });
    
    if (res.data?.token) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      router.push('/admin/dashboard');
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed. Please check your credentials.';
  } finally {
    loading.value = false;
  }
};
</script>