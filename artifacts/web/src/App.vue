<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 font-sans">
    <AdminNavbar v-if="isAdminRoute" />
    <Navbar v-else />
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
import AdminNavbar from './components/AdminNavbar.vue';

const route = useRoute();
const isAdminRoute = computed(() => route.path.startsWith('/admin'));
</script>
