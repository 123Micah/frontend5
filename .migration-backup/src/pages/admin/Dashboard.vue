<template>
  <AdminNavbar />
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    <!-- Main Content -->
    <main class="container mx-auto p-6 space-y-6 max-w-4xl">
      <h2 class="text-xl font-semibold text-gray-700 mb-6">Management Tools</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Create Test Card -->
        <router-link
          to="/admin/create-test"
          class="group relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-100"
        >
          <div class="p-6 flex flex-col items-center">
            <div class="mb-4 p-3 bg-indigo-100 rounded-full group-hover:bg-indigo-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-1">Create New Test</h3>
            <p class="text-sm text-gray-500 text-center">Design and publish new examinations</p>
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </router-link>

        <!-- View Tests Card -->
        <router-link
          to="/admin/tests"
          class="group relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-100"
        >
          <div class="p-6 flex flex-col items-center">
            <div class="mb-4 p-3 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-1">View All Tests</h3>
            <p class="text-sm text-gray-500 text-center">Manage existing test papers and questions</p>
            <div class="absolute inset-0 bg-gradient-to-br from-green-50/50 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </router-link>

        <!-- View Submissions Card -->
        <router-link
          to="/admin/submissions"
          class="group relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-yellow-100"
        >
          <div class="p-6 flex flex-col items-center">
            <div class="mb-4 p-3 bg-yellow-100 rounded-full group-hover:bg-yellow-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-1">View Submissions</h3>
            <p class="text-sm text-gray-500 text-center">Review and grade student answers</p>
            <div class="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </router-link>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import AdminNavbar from '../../components/AdminNavbar.vue';

const router = useRouter();

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  router.push('/admin/login');
};
</script>