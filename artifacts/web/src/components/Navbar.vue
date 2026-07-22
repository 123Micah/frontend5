<template>
  <nav class="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg px-6 py-4 flex justify-between items-center sticky top-0 z-50 backdrop-blur-sm bg-opacity-80">
    <router-link 
      to="/" 
      class="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent transition-all hover:scale-105"
    >
     student ExamPortal
    </router-link>

    <div class="flex items-center space-x-6">
      <router-link 
        v-if="isStudent" 
        to="/student/dashboard" 
        class="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200 flex items-center gap-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Dashboard
      </router-link>
      
      <router-link 
        v-if="isAdmin" 
        to="/admin/dashboard" 
        class="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200 flex items-center gap-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Admin
      </router-link>
      
      <router-link 
        to="/" 
        class="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200 flex items-center gap-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Home
      </router-link>
      
      <router-link 
        to="/student/register" 
        class="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105"
      >
        Register
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
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const user = JSON.parse(localStorage.getItem('user') || '{}');

const isStudent = computed(() => user && user.role === 'student');
const isAdmin = computed(() => user && user.role === 'admin');

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/student/login');
};
</script>