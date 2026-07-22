<template>
  <div class="p-6 bg-white shadow rounded">
    <h2 class="text-2xl font-bold mb-4">Student Submissions</h2>

    <div v-if="loading">Loading...</div>
    <div v-else-if="submissions.length === 0" class="text-gray-500">No submissions yet.</div>
    <div v-else>
      <div
        v-for="(submission, index) in submissions"
        :key="submission._id"
        class="border p-4 mb-4 rounded shadow-sm"
      >
        <p><strong>#{{ index + 1 }}</strong></p>
        <p><strong>Student:</strong> {{ submission.studentName }}</p>
        <p><strong>Score:</strong> {{ submission.score }}</p>
        <p><strong>Answers:</strong></p>
        <ul class="list-disc ml-6">
          <li v-for="(answer, idx) in submission.answers" :key="idx">
            Q{{ idx + 1 }}: {{ answer }}
          </li>
        </ul>
        <p class="text-sm text-gray-500 mt-2">
          Submitted on: {{ formatDate(submission.submittedAt) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SubmissionsList',
  props: {
    testId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      submissions: [],
      loading: true
    };
  },
  methods: {
    async fetchSubmissions() {
      try {
        const res = await axios.get(`/admin/submissions/${this.testId}`);
        this.submissions = res.data;
      } catch (err) {
        console.error('Error fetching submissions:', err);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateStr) {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    }
  },
  mounted() {
    this.fetchSubmissions();
  }
};
</script>

<style scoped>
/* Optional styling */
</style>
