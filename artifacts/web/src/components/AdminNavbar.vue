<template>
  <nav class="bg-slate-900 px-6 py-0 sticky top-0 z-50 shadow-xl">
    <div class="max-w-7xl mx-auto flex items-center justify-between h-16">

      <!-- Brand -->
      <router-link to="/admin/dashboard" class="flex items-center gap-2.5 group">
        <div class="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-md group-hover:bg-indigo-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <span class="text-white font-bold text-lg tracking-tight">Admin <span class="text-indigo-400">Panel</span></span>
      </router-link>

      <!-- Nav Links -->
      <div class="flex items-center gap-1">
        <router-link
          to="/admin/dashboard"
          class="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
          :class="$route.path === '/admin/dashboard'
            ? 'bg-indigo-500/20 text-indigo-300'
            : 'text-slate-400 hover:text-white hover:bg-slate-800'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
          </svg>
          Dashboard
        </router-link>

        <router-link
          to="/admin/tests"
          class="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
          :class="$route.path.startsWith('/admin/tests') || $route.path === '/admin/create-test'
            ? 'bg-indigo-500/20 text-indigo-300'
            : 'text-slate-400 hover:text-white hover:bg-slate-800'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Tests
        </router-link>

        <router-link
          to="/admin/submissions"
          class="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
          :class="$route.path === '/admin/submissions'
            ? 'bg-indigo-500/20 text-indigo-300'
            : 'text-slate-400 hover:text-white hover:bg-slate-800'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Submissions
        </router-link>
      </div>

      <!-- Right side -->
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg border border-slate-700">
          <div class="w-2 h-2 rounded-full bg-emerald-400"></div>
          <span class="text-slate-300 text-sm font-medium">Admin</span>
        </div>
        <button
          @click="logout"
          class="flex items-center gap-1.5 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg text-sm font-medium transition-all duration-200 border border-red-500/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>

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
