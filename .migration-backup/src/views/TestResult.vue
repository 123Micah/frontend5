<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-4">Test Result</h1>

    <div class="bg-white p-6 shadow rounded">
      <p class="text-xl font-semibold mb-2">Hello {{ studentName }},</p>
      <p class="text-lg mb-4">You scored: <span class="font-bold">{{ score }}</span> out of {{ total }}</p>

      <h2 class="text-lg font-semibold mb-2">Your Answers:</h2>
      <ul class="space-y-2">
        <li v-for="(answer, idx) in answers" :key="idx" class="border p-3 rounded">
          <p><strong>Q{{ idx + 1 }}:</strong> {{ questions[idx] }}</p>
          <p><strong>Your answer:</strong> {{ answer }}</p>
        </li>
      </ul>

      <router-link to="/student/tests" class="inline-block mt-6 text-blue-600 hover:underline">Back to Tests</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestResult',
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      studentName: this.result.studentName || 'Student',
      score: this.result.score,
      total: this.result.total,
      answers: this.result.answers,
      questions: this.result.questions
    };
  }
};
</script>
