<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <!-- Decorative Header -->
      <div class="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-center">
        <h2 class="text-3xl font-bold text-white">Create Account</h2>
        <p class="text-green-100 mt-1">Join our learning community</p>
      </div>

      <!-- Registration Form -->
      <div class="p-8">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <!-- Name Field -->
          <div>
            <label class=" text-sm font-medium text-gray-700 mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Full Name
            </label>
            <input
              v-model="name"
              type="text"
              placeholder="Your full name"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            />
          </div>

          <!-- Email Field -->
          <div>
            <label class=" text-sm font-medium text-gray-700 mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Email Address
            </label>
            <input
              v-model="email"
              type="email"
              placeholder="student@example.com"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <!-- Password Field -->
          <div>
            <label class=" text-sm font-medium text-gray-700 mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Password
            </label>
            <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <p class="mt-1 text-xs text-gray-500">Use 8 or more characters with a mix of letters, numbers & symbols</p>
          </div>

          <!-- Register Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center"
          >
            <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{{ loading ? 'Creating account...' : 'Register Now' }}</span>
          </button>

          <!-- Error Message -->
          <p v-if="error" class="mt-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ error }}
          </p>
        </form>

        <!-- Login Link -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Already have an account?
            <router-link to="/student/login" class="font-medium text-blue-600 hover:text-blue-700 hover:underline">
              Sign in here
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import API from '../../services/api';

const name = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);
const router = useRouter();

const handleRegister = async () => {
  error.value = '';
  loading.value = true;
  
  try {
    const res = await API.post('/auth/student/register', { 
      name: name.value, 
      email: email.value, 
      password: password.value 
    });
    
    if (res.data?.token) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      router.push('/student/dashboard');
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Registration failed. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>