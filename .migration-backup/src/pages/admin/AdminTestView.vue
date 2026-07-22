<template>
  <AdminNavbar />
  <div class="max-w-4xl mx-auto py-8 px-4">
    <div v-if="loading" class="text-center py-16">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading test details...</p>
    </div>
    <div v-else-if="error" class="text-center py-16 text-red-500">
      {{ error }}
      <button @click="fetchTest" class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Retry</button>
    </div>
    <div v-else-if="test" class="bg-white rounded-xl shadow-md p-8">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Edit Test</h1>
      <form @submit.prevent="handleEdit" class="mb-8 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input v-model="editTitle" type="text" class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea v-model="editDescription" class="w-full border rounded px-3 py-2" rows="2"></textarea>
        </div>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Changes</button>
        <span v-if="editError" class="text-red-500 ml-4">{{ editError }}</span>
        <span v-if="editSuccess" class="text-green-600 ml-4">Saved!</span>
      </form>
      <h2 class="text-lg font-semibold mb-2">Questions ({{ test.questions.length }})</h2>
      <ul class="space-y-4">
        <li v-for="(q, idx) in test.questions" :key="q._id" class="border rounded-lg p-4">
          <div class="font-semibold text-gray-800">{{ idx + 1 }}. {{ q.text }}</div>
          <div v-if="q.image" class="my-2">
            <img :src="q.image" alt="Question Image" class="w-32 h-32 object-contain rounded border" />
          </div>
          <div class="mt-2">
            <span class="font-medium text-gray-700">Options:</span>
            <ul class="list-disc ml-6">
              <li v-for="opt in q.options" :key="opt" :class="{'text-green-600 font-bold': opt === q.correctAnswer}">{{ opt }}</li>
            </ul>
          </div>
          <div class="mt-2 text-sm text-green-600">Correct Answer: {{ q.correctAnswer }}</div>
        </li>
      </ul>
    </div>
    <div v-else class="text-center py-16 text-gray-500">Test not found.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import API from '../../services/api';
import AdminNavbar from '../../components/AdminNavbar.vue';

const route = useRoute();
const test = ref(null);
const loading = ref(true);
const error = ref(null);
const editTitle = ref('');
const editDescription = ref('');
const editError = ref('');
const editSuccess = ref(false);

const fetchTest = async () => {
  loading.value = true;
  error.value = null;
  try {
    const { data } = await API.get(`/tests/${route.params.id}`);
    test.value = data;
    editTitle.value = data.title;
    editDescription.value = data.description || '';
  } catch (err) {
    error.value = 'Failed to load test details.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const handleEdit = async () => {
  editError.value = '';
  editSuccess.value = false;
  try {
    const update = { title: editTitle.value, description: editDescription.value };
    const { data } = await API.put(`/admin/tests/${route.params.id}`, update);
    test.value = data;
    editSuccess.value = true;
    setTimeout(() => { editSuccess.value = false; }, 2000);
  } catch (err) {
    editError.value = 'Failed to save changes.';
    console.error(err);
  }
};

onMounted(fetchTest);
</script>
