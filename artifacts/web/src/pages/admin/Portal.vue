<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
    <!-- Header Section -->
    <div class="mb-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Admin Portal</h1>
        <p class="text-gray-600">Welcome back, {{ adminName }}! Manage your examination system.</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Total Tests</p>
              <p class="text-3xl font-bold text-gray-800 mt-1">{{ stats.totalTests }}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-500 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Students</p>
              <p class="text-3xl font-bold text-gray-800 mt-1">{{ stats.totalStudents }}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-green-500 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-2a6 6 0 0112 0v2zm0 0h6v-2a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Submissions</p>
              <p class="text-3xl font-bold text-gray-800 mt-1">{{ stats.totalSubmissions }}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-purple-500 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Avg Score</p>
              <p class="text-3xl font-bold text-gray-800 mt-1">{{ stats.avgScore }}%</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-orange-500 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Create Test Card -->
          <router-link to="/admin/create-test" class="group">
            <div class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-t-4 border-blue-500 cursor-pointer">
              <div class="flex items-center mb-4">
                <div class="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-1">Create New Test</h3>
              <p class="text-gray-600 text-sm">Add questions and set up a new examination</p>
            </div>
          </router-link>

          <!-- View Tests Card -->
          <router-link to="/admin/tests" class="group">
            <div class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-t-4 border-green-500 cursor-pointer">
              <div class="flex items-center mb-4">
                <div class="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-1">View All Tests</h3>
              <p class="text-gray-600 text-sm">Manage, edit, and delete existing tests</p>
            </div>
          </router-link>

          <!-- View Submissions Card -->
          <router-link to="/admin/submissions" class="group">
            <div class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-t-4 border-purple-500 cursor-pointer">
              <div class="flex items-center mb-4">
                <div class="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-1">View Submissions</h3>
              <p class="text-gray-600 text-sm">Review student answers and results</p>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Recent Tests -->
        <div class="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-gray-800">Recent Tests</h3>
            <router-link to="/admin/tests" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All →
            </router-link>
          </div>

          <div v-if="recentTests.length > 0" class="space-y-4">
            <div v-for="test in recentTests" :key="test.id" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
              <div>
                <p class="font-medium text-gray-800">{{ test.title }}</p>
                <p class="text-sm text-gray-600">{{ test.questionsCount }} questions</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-700">{{ test.submissions }} submissions</p>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8">
            <p class="text-gray-500 mb-4">No tests created yet</p>
            <router-link to="/admin/create-test" class="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium">
              Create First Test
            </router-link>
          </div>
        </div>

        <!-- Notifications -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4">Notifications</h3>
          <div class="space-y-4">
            <div class="flex items-start p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div class="ml-3">
                <p class="text-sm font-medium text-blue-800">Admin Portal Active</p>
                <p class="text-xs text-blue-600 mt-1">Your dashboard is fully operational</p>
              </div>
            </div>

            <div class="flex items-start p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div class="ml-3">
                <p class="text-sm font-medium text-green-800">System Healthy</p>
                <p class="text-xs text-green-600 mt-1">All services running smoothly</p>
              </div>
            </div>

            <div class="flex items-start p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div class="ml-3">
                <p class="text-sm font-medium text-yellow-800">Temporary Features</p>
                <p class="text-xs text-yellow-600 mt-1">Remove admin registration in production</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import API from '../../services/api';

const adminName = ref('Admin');
const stats = ref({
  totalTests: 0,
  totalStudents: 0,
  totalSubmissions: 0,
  avgScore: 0
});

const recentTests = ref([
  { id: 1, title: 'Mathematics Final Exam', questionsCount: 50, submissions: 120 },
  { id: 2, title: 'Science Quiz', questionsCount: 30, submissions: 95 },
  { id: 3, title: 'Programming Challenge', questionsCount: 25, submissions: 60 }
]);

onMounted(async () => {
  // Get admin name from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.email) {
    adminName.value = user.email.split('@')[0];
  }

  // Fetch stats from backend
  try {
    const testsRes = await API.get('/admin/tests');
    const submissionsRes = await API.get('/admin/submissions');
    
    if (testsRes.data) {
      stats.value.totalTests = testsRes.data.length || 0;
    }
    
    if (submissionsRes.data) {
      stats.value.totalSubmissions = submissionsRes.data.length || 0;
      // Calculate average score if available
      if (submissionsRes.data.length > 0) {
        const avgScore = submissionsRes.data.reduce((sum, sub) => sum + (sub.score || 0), 0) / submissionsRes.data.length;
        stats.value.avgScore = Math.round(avgScore);
      }
    }
  } catch (err) {
    console.error('Error fetching stats:', err);
  }
});
</script>
