<template>
  <div class="max-w-4xl mx-auto py-8 px-4">
    <h1 class="text-2xl font-bold mb-6 text-center">Take Test</h1>

    <div v-if="test">
      <h2 class="text-xl font-semibold mb-4">{{ test.title }}</h2>

      <form @submit.prevent="submitAnswers" class="space-y-6">
        <div
          v-for="(question, index) in test.questions"
          :key="question._id"
          class="border rounded-lg p-4 bg-white shadow"
        >
          <div class="mb-2 font-medium">
            {{ index + 1 }}. {{ question.questionText }}
          </div>

          <div v-if="question.questionImage" class="mb-2">
            <img :src="question.questionImage" class="w-48" />
          </div>

          <div class="space-y-2">
            <div v-for="option in question.options" :key="option">
              <label class="flex items-center gap-2">
                <input
                  type="radio"
                  :name="'q' + question._id"
                  :value="option"
                  v-model="answers[question._id]"
                  class="accent-blue-600"
                  required
                />
                {{ option }}
              </label>
            </div>
          </div>
        </div>

        <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Submit Test
        </button>
      </form>
    </div>

    <div v-else class="text-center py-10 text-gray-500">
      Loading test...
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import API from '../../services/api';

const route = useRoute();
const router = useRouter();

const test = ref(null);
const answers = ref({});

const fetchTest = async () => {
  try {
    const { data } = await API.get(`/tests/${route.params.id}`);
    test.value = data;
  } catch (err) {
    console.error(err);
  }
};

const submitAnswers = async () => {
  try {
    // Map answers object to array of { questionId, selectedOption }
    const mappedAnswers = Object.entries(answers.value).map(([questionId, selectedOption]) => ({
      questionId,
      selectedOption
    }));
    const payload = {
      answers: mappedAnswers,
    };
    const { data } = await API.post(`/submissions/${route.params.id}`, payload);
    alert(`Test submitted! You scored ${data.score}/${data.total}`);
    router.push('/student/results');
  } catch (err) {
    alert('Error submitting test.');
    console.error(err);
  }
};

onMounted(fetchTest);
</script>
