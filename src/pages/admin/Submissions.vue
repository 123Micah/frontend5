<script setup>
import { ref, onMounted } from 'vue';
import API from '../../services/api';
import AdminNavbar from '../../components/AdminNavbar.vue';

const submissions = ref([]);
const isLoading = ref(true);
const error = ref(null);
const isModalOpen = ref(false);
const selectedSubmission = ref(null);

const fetchSubmissions = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const { data } = await API.get('/admin/submissions');
    console.log('Submissions data:', JSON.stringify(data, null, 2)); // Debug line
    submissions.value = data;
  } catch (err) {
    console.error('Error fetching submissions:', err);
    error.value = 'Failed to load submissions. Please try again.';
  } finally {
    isLoading.value = false;
  }
};

const openModal = (sub) => {
  selectedSubmission.value = sub;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedSubmission.value = null;
};

const deleteSubmission = async (id) => {
  if (!confirm('Are you sure you want to delete this submission?')) return;
  try {
    await API.delete(`/admin/submissions/${id}`);
    await fetchSubmissions();
  } catch (err) {
    console.error('Error deleting submission:', err);
    alert('Failed to delete submission');
  }
};

const formatDate = (dateStr) => {
  try {
    if (!dateStr) return 'No date available';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'Invalid date';
    
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    console.error('Error formatting date:', e);
    return 'Date unavailable';
  }
};

onMounted(fetchSubmissions);
</script>

<template>
  <AdminNavbar />
  <main class="bg-gray-50 min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-12 text-center">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Student Submissions</h1>
        <p class="text-lg text-gray-600">Review and analyze student test performances</p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
        <div class="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p class="mt-4 text-gray-600">Loading submissions...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 rounded-lg p-6 max-w-md mx-auto text-center">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
          <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="mt-3 text-lg font-medium text-red-800">Error loading submissions</h3>
        <p class="mt-2 text-sm text-red-600">{{ error }}</p>
        <button @click="fetchSubmissions" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Retry
        </button>
      </div>

      <!-- Submissions Grid -->
      <div v-else-if="submissions.length" class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="sub in submissions" :key="sub._id" class="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
          <div class="p-6">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div class="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                  {{ sub.student?.name?.charAt(0) || '?' }}
                </div>
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-900">{{ sub.student?.name || 'Anonymous Student' }}</h3>
                <p class="text-sm text-gray-500">{{ sub.test?.title || 'Untitled Test' }}</p>
              </div>
            </div>

            <div class="mt-6">
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-medium text-gray-700">Performance</span>
                <span class="text-sm font-semibold text-gray-900">{{ sub.score }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  class="h-2.5 rounded-full bg-gradient-to-r from-green-400 to-blue-500" 
                  :style="{ width: `${sub.score}%` }"
                ></div>
              </div>
            </div>

            <div class="mt-4 flex items-center text-sm text-gray-500">
              <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
              {{ formatDate(sub.createdAt) }}
            </div>
          </div>

          <div class="bg-gray-50 px-6 py-4 flex justify-between">
            <button 
              @click="openModal(sub)"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View Details
            </button>
            <button 
              @click="deleteSubmission(sub._id)"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <div class="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gray-100">
          <svg class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="mt-5 text-lg font-medium text-gray-900">No submissions found</h3>
        <p class="mt-2 text-sm text-gray-500">Student test submissions will appear here once available.</p>
      </div>
    </div>

    <!-- Submission Details Modal -->
     <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeModal"></div>
        
        <!-- Modal container -->
        <div class="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
          <!-- Modal content -->
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 class="text-2xl leading-6 font-bold text-gray-900 mb-6">
                  Submission Details
                </h3>
                                <div v-if="selectedSubmission" class="space-y-6">
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                      {{ selectedSubmission.student?.name?.charAt(0) || '?' }}
                    </div>
                    <div>
                      <h4 class="text-lg font-medium text-gray-900">{{ selectedSubmission.student?.name || 'Anonymous Student' }}</h4>
                      <p class="text-sm text-gray-500">{{ selectedSubmission.test?.title || 'Untitled Test' }}</p>
                      <p class="text-sm text-gray-500">{{ formatDate(selectedSubmission.createdAt) }}</p>
                    </div>
                  </div>

                  <div class="bg-gray-50 p-4 rounded-lg">
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-sm font-medium text-gray-700">Score: {{ selectedSubmission.score }}%</span>
                      <span class="text-xs font-medium px-2.5 py-0.5 rounded-full" 
                        :class="{
                          'bg-green-100 text-green-800': selectedSubmission.score >= 70,
                          'bg-yellow-100 text-yellow-800': selectedSubmission.score >= 50 && selectedSubmission.score < 70,
                          'bg-red-100 text-red-800': selectedSubmission.score < 50
                        }">
                        {{ selectedSubmission.score >= 70 ? 'Excellent' : 
                           selectedSubmission.score >= 50 ? 'Average' : 'Poor' }}
                      </span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        class="h-2.5 rounded-full" 
                        :class="{
                          'bg-green-500': selectedSubmission.score >= 70,
                          'bg-yellow-500': selectedSubmission.score >= 50 && selectedSubmission.score < 70,
                          'bg-red-500': selectedSubmission.score < 50
                        }"
                        :style="{ width: `${selectedSubmission.score}%` }"
                      ></div>
                    </div>
                  </div>

                <div class="space-y-4 max-h-96 overflow-y-auto pr-2">
                  <div v-for="(ans, idx) in selectedSubmission.answers" :key="idx" class="border-b border-gray-200 pb-4 last:border-0">
                    <div class="flex items-start">
                      <span class="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-1"
                        :class="{
                          'bg-green-100 text-green-800': ans.isCorrect,
                          'bg-red-100 text-red-800': !ans.isCorrect
                        }">
                        <svg v-if="ans.isCorrect" class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        <svg v-else class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </span>
                      <div>
                        <p class="font-medium text-gray-900">Question {{ idx + 1 }}</p>
                        <!-- Check different possible question text properties -->
                        <p class="text-gray-600 mt-1">
                          {{ ans.questionText || ans.question?.text || ans.text || 'Question details not available' }}
                        </p>
                        <p class="text-sm mt-2">
                          <span class="font-medium">Student's answer:</span> 
                          <span :class="{'text-green-600': ans.isCorrect, 'text-red-600': !ans.isCorrect}">
                            {{ ans.selectedOption || ans.answer || 'No answer provided' }}
                          </span>
                        </p>
                        <!-- Show correct answer if available -->
                        <p v-if="ans.correctAnswer" class="text-sm mt-1">
                          <span class="font-medium">Correct answer:</span> 
                          <span class="text-green-600">{{ ans.correctAnswer }}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              @click="closeModal"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>