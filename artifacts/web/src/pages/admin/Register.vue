<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 p-4">
    <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100">
      <!-- Header with decorative element -->
      <div class="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-center">
        <h2 class="text-3xl font-bold text-white">Admin Registration</h2>
        <p class="text-purple-100 mt-1">Create a new admin account (TEMPORARY)</p>
      </div>

      <div class="p-8">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <!-- Email Field -->
          <div class="space-y-2">
            <label for="email" class="text-sm font-medium text-gray-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder-gray-400"
              placeholder="admin@example.com"
            />
          </div>

          <!-- Password Field -->
          <div class="space-y-2">
            <label for="password" class="text-sm font-medium text-gray-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Password
            </label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder-gray-400"
              placeholder="••••••••"
            />
          </div>

          <!-- Confirm Password Field -->
          <div class="space-y-2">
            <label for="confirmPassword" class="text-sm font-medium text-gray-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder-gray-400"
              placeholder="••••••••"
            />
          </div>

          <!-- Secret Key Field -->
          <div class="space-y-2">
            <label for="secretKey" class="text-sm font-medium text-gray-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              Admin Secret Key
            </label>
            <input
              type="password"
              id="secretKey"
              v-model="secretKey"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder-gray-400"
              placeholder="Enter the admin registration key"
            />
            <p class="text-xs text-gray-500 mt-1">⚠️ Temporary key: temp-admin-key-change-me</p>
          </div>

          <!-- Register Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-400 transition-all shadow-md hover:shadow-lg flex items-center justify-center"
          >
            <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{{ loading ? 'Registering...' : 'Create Admin Account' }}</span>
          </button>

          <!-- Error Message -->
          <p v-if="error" class="mt-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ error }}
          </p>

          <!-- Success Message -->
          <p v-if="success" class="mt-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg border border-green-100 flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ success }}
          </p>
        </form>

        <!-- Link to Login -->
        <div class="mt-6 pt-6 border-t border-gray-200">
          <p class="text-center text-sm text-gray-600">
            Already have an account?
            <router-link to="/admin/login" class="text-purple-600 hover:text-purple-700 font-medium">
              Login here
            </router-link>
          </p>
        </div>
      </div>

      <!-- Footer Note -->
      <div class="bg-yellow-50 px-8 py-4 border-t border-yellow-100">
        <p class="text-xs text-yellow-700">
          <strong>⚠️ Note:</strong> This is a temporary admin registration for development. Will be removed in production.
        </p>
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
const confirmPassword = ref('');
const secretKey = ref('');
const error = ref('');
const success = ref('');
const loading = ref(false);
const router = useRouter();

const handleRegister = async () => {
  error.value = '';
  success.value = '';
  
  // Validation
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match!';
    return;
  }

  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters!';
    return;
  }

  loading.value = true;
  
  try {
    const res = await API.post('/auth/admin/register', {
      email: email.value,
      password: password.value,
      secretKey: secretKey.value
    });
    
    if (res.data?.token) {
      success.value = 'Admin account created successfully! Redirecting to dashboard...';
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', 'admin');
      localStorage.setItem('user', JSON.stringify(res.data));
      
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 2000);
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Registration failed. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>
