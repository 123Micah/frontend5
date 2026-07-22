<template>
  <div class="max-w-3xl mx-auto py-8 px-4">
    <h1 class="text-2xl font-bold mb-6 text-center">My Test Results</h1>

    <div v-if="submissions.length > 0" class="space-y-4">
      <div
        v-for="submission in submissions"
        :key="submission._id"
        class="border bg-white p-4 rounded-lg shadow"
      >
        <h2 class="text-lg font-semibold">{{ submission.test?.title || 'Untitled Test' }}</h2>
        <p class="text-gray-700">Score: {{ submission.score }} / {{ submission.total }}</p>
        <p class="text-sm text-gray-500">Submitted on: {{ formatDate(submission.createdAt) }}</p>
      </div>
    </div>

    <div v-else class="text-center text-gray-500 py-10">No results yet.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import API from '../../services/api';

const submissions = ref([]);

const fetchSubmissions = async () => {
  try {
    const { data } = await API.get('/submissions/my');
    submissions.value = data;
  } catch (err) {
    console.error(err);
  }
};

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleString();
};

onMounted(fetchSubmissions);
</script>
