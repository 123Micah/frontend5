<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4 py-12">
    <div class="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <!-- Header with gradient background -->
      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">{{ test?.title }}</h1>
        <p class="text-lg text-blue-100">{{ test?.description }}</p>
      </div>

      <!-- Content area -->
      <div class="p-8 sm:p-10">
        <!-- Duration card -->
        <div 
          v-if="test?.duration && (test.duration.hours || test.duration.minutes || test.duration.seconds)"
          class="mb-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 flex items-center justify-center"
        >
          <div class="flex items-center space-x-3">
            <div class="bg-blue-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 class="text-sm font-semibold text-gray-500">TEST DURATION</h3>
              <p class="text-xl font-bold text-blue-800">
                <span v-if="test.duration.hours">{{ test.duration.hours }}h </span>
                <span v-if="test.duration.minutes">{{ test.duration.minutes }}m </span>
                <span v-if="test.duration.seconds">{{ test.duration.seconds }}s</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Start button with animated hover effect -->
        <div class="flex justify-center mt-8">
          <button
            @click="startTest"
            class="relative group flex items-center justify-center w-full sm:w-auto px-8 py-4 text-lg font-medium text-white rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span class="relative z-10 flex items-center">
              Start Test
              <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <span class="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-300"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import API from '../../services/api'

const route = useRoute()
const router = useRouter()
const test = ref(null)

onMounted(async () => {
  const { data } = await API.get(`/tests/${route.params.id}`)
  test.value = data
})

const startTest = () => {
  router.push({
    path: `/student/test/${route.params.id}`,
    state: { duration: test.value.duration }
  })
}
</script>