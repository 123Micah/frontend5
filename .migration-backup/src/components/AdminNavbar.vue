<template>
  <nav class="bg-gradient-to-r from-indigo-100 to-blue-100 shadow-lg px-6 py-4 flex justify-between items-center sticky top-0 z-50 backdrop-blur-sm bg-opacity-80">
    <router-link 
      to="/admin/dashboard" 
      class="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent transition-all hover:scale-105"
    >
      Admin Portal
    </router-link>

    <div class="flex items-center space-x-6">
      <router-link 
        to="/admin/dashboard" 
        class="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 flex items-center gap-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v4a1 1 0 001 1h3m10-5v4a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1V7a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Dashboard
      </router-link>
      <router-link 
        to="/admin/tests" 
        class="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 flex items-center gap-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Manage Tests
      </router-link>
      <router-link 
        to="/admin/submissions" 
        class="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 flex items-center gap-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17l4-4-4-4m8 8l-4-4 4-4" />
        </svg>
        Submissions
      </router-link>
      <button 
        @click="logout" 
        class="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 flex items-center gap-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Logout
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/admin/login');
};
</script>
