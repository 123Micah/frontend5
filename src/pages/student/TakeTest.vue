<script setup>
import { onMounted, ref, computed, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import API from '../../services/api'

const route = useRoute()
const router = useRouter()
const test = ref(null)
const answers = ref([])
const score = ref(null)
const correctCount = ref(0)
const submitMessage = ref('')
const loading = ref(true)
const timeLeft = ref(null)
const correctAnswers = ref([])
const showMessage = ref(false)
let timerInterval = null

const formattedTime = computed(() => {
  if (timeLeft.value === null) return ''
  const h = Math.floor(timeLeft.value / 3600)
  const m = Math.floor((timeLeft.value % 3600) / 60)
  const s = timeLeft.value % 60
  return `${h > 0 ? h + 'h ' : ''}${m > 0 ? m + 'm ' : ''}${s}s`
})

function startTimer(durationSec) {
  timeLeft.value = durationSec
  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(timerInterval)
      timerInterval = null
      handleSubmit(true)
    }
  }, 1000)
}

function optionClass(qIdx, option) {
  if (score.value === null) {
    return {
      'border-blue-400 bg-blue-50': answers.value[qIdx] === option,
      'hover:shadow-sm': answers.value[qIdx] !== option
    }
  }
  
  const isSelected = answers.value[qIdx] === option
  const isCorrect = correctAnswers.value.length > 0
    ? correctAnswers.value[qIdx] === option
    : (test.value?.questions[qIdx]?.correctOption === option)
  
  if (isSelected && isCorrect) return 'border-green-500 bg-green-50'
  if (isSelected && !isCorrect) return 'border-red-500 bg-red-50'
  if (!isSelected && isCorrect) return 'border-green-200'
  return ''
}

onMounted(async () => {
  try {
    const { data } = await API.get(`/tests/${route.params.id}`)
    test.value = data
    
    // Initialize answers array
    answers.value = Array(data.questions?.length || 0).fill(null)
    
    // Initialize correct answers if available
    if (data.questions?.every(q => q.correctOption)) {
      correctAnswers.value = data.questions.map(q => q.correctOption)
    }
    
    // Start timer if duration exists
    if (data.duration) {
      const totalSec = (data.duration.hours || 0) * 3600 + 
                      (data.duration.minutes || 0) * 60 + 
                      (data.duration.seconds || 0)
      if (totalSec > 0) startTimer(totalSec)
    }
  } catch (err) {
    console.error('Error loading test:', err)
    submitMessage.value = 'Failed to load test. Please try again.'
    showMessage.value = true
  } finally {
    loading.value = false
  }
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})

const handleSubmit = async (auto = false) => {
  if (score.value !== null) return
  
  try {
    const payload = {
      testId: test.value._id,
      answers: test.value.questions.map((q, idx) => ({
        questionId: q._id,
        selectedOption: answers.value[idx]
      }))
    }
    
    const { data } = await API.post('/student/tests/submit', payload)
    score.value = data.score
    correctCount.value = data.correctCount || 0
    
    if (data.correctAnswers) {
      correctAnswers.value = data.correctAnswers
    }
    
    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }
    
    submitMessage.value = auto 
      ? '⏰ Time out! Your test was submitted automatically.'
      : '✅ Submitted successfully! Your results are ready.'
    showMessage.value = true
  } catch (err) {
    console.error('Submission failed:', err)
    submitMessage.value = 'Submission failed. Please try again.'
    showMessage.value = true
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    <!-- Navigation with Timer -->
    <nav class="bg-white shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center">
            <h1 class="text-xl font-bold text-gray-900" v-if="test">
              <span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {{ test.title }}
              </span>
            </h1>
          </div>
          
          <div v-if="timeLeft !== null" class="flex items-center space-x-4">
            <div class="relative">
              <div class="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur opacity-75"></div>
              <div class="relative bg-white rounded-md px-4 py-2 flex items-center border border-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="font-medium text-gray-800">{{ formattedTime }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Message Notification -->
    <div v-if="showMessage" class="fixed top-20 right-4 z-50">
      <div class="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden w-80">
        <div class="p-4 flex items-start">
          <div class="flex-shrink-0">
            <svg v-if="submitMessage.includes('✅') || submitMessage.includes('success')" 
                 xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <svg v-else-if="submitMessage.includes('⏰')" 
                 xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else 
                 xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div class="ml-3 flex-1 pt-0.5">
            <p class="text-sm font-medium text-gray-900">
              {{ submitMessage }}
            </p>
          </div>
          <div class="ml-4 flex-shrink-0 flex">
            <button @click="showMessage = false" class="inline-flex text-gray-400 hover:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <!-- Loading/Error States -->
      <div v-if="loading || !test" class="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100 text-center">
        <p v-if="loading" class="text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 animate-spin mx-auto text-blue-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span class="text-lg">Loading your test...</span>
        </p>
        <p v-if="!loading && !test" class="text-red-500 text-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {{ submitMessage || 'Test not found. Please check the URL and try again.' }}
        </p>
      </div>

      <!-- Test Questions -->
      <form @submit.prevent="handleSubmit" v-if="test && !loading" class="space-y-6">
        <div
          v-for="(question, index) in test.questions"
          :key="question._id"
          class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden"
        >
          <div class="p-6 sm:p-8">
            <div class="flex items-start space-x-4">
              <div class="bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                {{ index + 1 }}
              </div>
              <div class="flex-1">
                <p class="text-lg font-semibold text-gray-800 mb-4">{{ question.text }}</p>
                
                <img
                  v-if="question.image"
                  :src="question.image"
                  alt="Question Image"
                  class="w-full max-w-md mb-6 rounded-lg border border-gray-200 shadow-sm"
                />

                <div class="space-y-3">
                  <label
                    v-for="(option, i) in question.options"
                    :key="i"
                    class="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 transition-all cursor-pointer group"
                    :class="optionClass(index, option)"
                  >
                    <div class="flex items-center h-5">
                      <input
                        type="radio"
                        :name="'question_' + index"
                        :value="option"
                        v-model="answers[index]"
                        class="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                        required
                        :disabled="score !== null"
                      />
                    </div>
                    <span class="text-gray-700 group-hover:text-gray-900">{{ option }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center mt-10" v-if="score === null">
          <button
            class="relative group flex items-center space-x-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all shadow-md hover:shadow-lg"
          >
            <div class="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-200"></div>
            <span class="relative flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Submit Test
            </span>
          </button>
        </div>
      </form>

      <!-- Results Section -->
      <div v-if="score !== null" class="mt-10 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-sm p-8 border border-green-100">
        <div class="text-center space-y-4">
          <div class="inline-flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 text-green-800 rounded-full p-4 mb-4 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-800">
            Test Completed!
          </h2>
          <div class="text-2xl font-semibold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Your Score: {{ score }}/{{ test.questions.length }}
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto mt-6">
            <div class="bg-white p-4 rounded-lg border border-green-100 shadow-sm">
              <div class="text-green-600 font-medium">✅ Correct</div>
              <div class="text-2xl font-bold text-gray-800">{{ correctCount }}</div>
            </div>
            <div class="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
              <div class="text-red-600 font-medium">❌ Incorrect</div>
              <div class="text-2xl font-bold text-gray-800">{{ test.questions.length - correctCount }}</div>
            </div>
          </div>

          <div class="mt-6">
            <button 
              @click="router.go(0)"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Retake Test
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>