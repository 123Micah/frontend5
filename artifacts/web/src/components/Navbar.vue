<template>
  <nav class="bg-white border-b border-gray-100 px-6 py-0 sticky top-0 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto flex items-center justify-between h-16">

      <!-- Brand -->
      <router-link to="/" class="flex items-center gap-2.5 group">
        <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow group-hover:shadow-md transition-shadow">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <span class="font-bold text-lg text-gray-800">Exam<span class="text-indigo-600">Portal</span></span>
      </router-link>

      <!-- Nav Links -->
      <div class="flex items-center gap-1">
        <router-link
          to="/"
          class="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
          :class="$route.path === '/'
            ? 'bg-indigo-50 text-indigo-600'
            : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Home
        </router-link>

        <router-link
          v-if="isStudent"
          to="/student/dashboard"
          class="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
          :class="$route.path === '/student/dashboard'
            ? 'bg-indigo-50 text-indigo-600'
            : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          My Tests
        </router-link>
      </div>

      <!-- Right side -->
      <div class="flex items-center gap-2">
        <template v-if="!isLoggedIn">
          <router-link
            to="/student/login"
            class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors rounded-lg hover:bg-gray-50"
          >
            Login
          </router-link>
          <router-link
            to="/student/register"
            class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            Register
          </router-link>
        </template>

        <template v-else>
          <div class="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg border border-green-100">
            <div class="w-2 h-2 rounded-full bg-green-500"></div>
            <span class="text-green-700 text-sm font-medium capitalize">{{ userRole }}</span>
          </div>
          <button
            @click="logout"
            class="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </template>
      </div>

    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = JSON.parse(localStorage.getItem('user') || 'null');
const token = localStorage.getItem('token');

const isLoggedIn = computed(() => !!token && !!user);
const isStudent = computed(() => user?.role === 'student');
const userRole = computed(() => user?.role || '');

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/');
};
</script>
