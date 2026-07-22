<template>
  <div class="bg-white rounded-xl shadow p-4 hover:shadow-md transition">
    <h2 class="text-lg font-semibold text-indigo-700 mb-2">{{ test.title }}</h2>
    <p class="text-sm text-gray-600 mb-3">
      {{ test.description || 'No description provided.' }}
    </p>

    <div class="flex items-center justify-between text-sm text-gray-500">
      <span>Questions: {{ test.questions.length }}</span>
      <span>Created: {{ formatDate(test.createdAt) }}</span>
    </div>

    <div class="mt-4 flex justify-end space-x-2">
      <button
        v-if="showEdit"
        @click="$emit('edit', test)"
        class="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
      >
        Edit
      </button>
      <button
        v-if="showDelete"
        @click="$emit('delete', test._id)"
        class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
      <RouterLink
        :to="`/student/take/${test._id}`"
        class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
      >
        Take Test
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  test: Object,
  showEdit: Boolean,
  showDelete: Boolean,
});

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString();
};
</script>
