<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 sm:p-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold  bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent inline-block">
          Available Tests
        </h1>
        <p class="mt-3 text-lg text-gray-600">Select a test to begin your assessment</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>

      <!-- Empty State -->
      <div v-else-if="tests.length === 0" class="text-center py-16">
        <div class="mx-auto w-24 h-24 text-gray-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-medium text-gray-900 mb-2">No tests available</h3>
        <p class="text-gray-500">Check back later for new assessments</p>
      </div>

      <!-- Test Grid -->
      <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="test in tests"
          :key="test._id"
          class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer transform hover:-translate-y-1"
          @click="goToTest(test._id)"
        >
          <div class="p-6">
            <!-- Test Icon -->
            <div class="mb-4 p-3 bg-blue-100 rounded-lg inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>

            <!-- Test Title -->
            <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ test.title }}</h2>
            
            <!-- Test Description -->
            <p class="text-gray-600 mb-4">{{ test.description || 'No description provided' }}</p>
            
            <!-- Action Button -->
            <div class="flex items-center text-blue-600 font-medium">
              <span>Start Test</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import API from '../../services/api';

const tests = ref([]);
const loading = ref(true);
const router = useRouter();

const goToTest = (id) => {
  router.push(`/student/test/${id}/intro`);
};

onMounted(async () => {
  try {
    const res = await API.get('/student/tests');
    tests.value = res.data;
  } catch (err) {
    alert('Failed to load tests. Please try again later.');
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>