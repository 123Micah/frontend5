<template>
  <div class="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-10">
      <h1 class="text-3xl font-bold  bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent inline-block">
        Student Submissions
      </h1>
      <p class="mt-2 text-lg text-gray-600">Review and analyze student test performances</p>
    </div>

    <div v-if="submissions.length > 0" class="space-y-6">
      <div
        v-for="submission in submissions"
        :key="submission._id"
        class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden"
      >
        <div class="p-6">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <!-- Student Info -->
            <div class="flex items-center space-x-4">
              <div class="bg-indigo-100 text-indigo-800 rounded-full w-12 h-12 flex items-center justify-center font-bold">
                {{ submission.student?.name?.charAt(0) || '?' }}
              </div>
              <div>
                <h2 class="text-lg font-semibold text-gray-800">
                  {{ submission.student?.name || 'Unknown Student' }}
                </h2>
                <p class="text-sm text-gray-600">
                  {{ submission.test?.title || 'Unknown Test' }}
                </p>
              </div>
            </div>

            <!-- Score & Date -->
            <div class="flex flex-col sm:flex-row sm:items-center gap-4">
              <div class="flex items-center space-x-2">
                <div class="relative w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    class="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-blue-500"
                    :style="{ width: `${(submission.score / submission.total) * 100}%` }"
                  ></div>
                </div>
                <span class="text-sm font-medium text-gray-700">
                  {{ submission.score }}/{{ submission.total }}
                </span>
              </div>

              <div class="flex items-center text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ formatDate(submission.createdAt) }}
              </div>
            </div>

            <!-- Action Button -->
            <RouterLink
              v-if="false" <!-- Remove this line to enable the view button -->
              :to="`/admin/submission/${submission._id}`"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View Details
            </RouterLink>
          </div>
        </div>

        <!-- Progress Bar (full width) -->
        <div class="px-6 pb-4">
          <div class="flex justify-between text-xs text-gray-500 mb-1">
            <span>Performance</span>
            <span>{{ Math.round((submission.score / submission.total) * 100) }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div 
              class="h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500"
              :style="{ width: `${(submission.score / submission.total) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-16">
      <div class="mx-auto w-24 h-24 text-gray-400 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-1">No submissions found</h3>
      <p class="text-gray-500">Student test submissions will appear here once available</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import API from '../../services/api';

const submissions = ref([]);

const fetchSubmissions = async () => {
  try {
    // Fetch all submissions for admin
    const { data } = await API.get('/admin/submissions');
    submissions.value = data;
  } catch (err) {
    console.error(err);
  }
};

const formatDate = (dateStr) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateStr).toLocaleString(undefined, options);
};

onMounted(fetchSubmissions);
</script>