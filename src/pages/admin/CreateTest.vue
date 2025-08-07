<template>
  <div class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-10">
      <h1 class="text-3xl font-bold  bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent inline-block">
        Create New Test
      </h1>
      <p class="mt-2 text-lg text-gray-600">Design your assessment with questions, options, and time limits</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-8 bg-white rounded-xl shadow-lg p-6 sm:p-8">
      <!-- Timer Section -->
      <div class="bg-blue-50/50 p-5 rounded-lg border border-blue-100">
        <h2 class="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Test Duration
        </h2>
        <div class="flex flex-wrap items-center gap-6">
          <div class="flex-1 min-w-[120px]">
            <label class="block text-sm font-medium text-gray-700 mb-1">Hours</label>
            <input 
              v-model.number="duration.hours" 
              type="number" 
              min="0" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          <div class="flex-1 min-w-[120px]">
            <label class="block text-sm font-medium text-gray-700 mb-1">Minutes</label>
            <input 
              v-model.number="duration.minutes" 
              type="number" 
              min="0" 
              max="59" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          <div class="flex-1 min-w-[120px]">
            <label class="block text-sm font-medium text-gray-700 mb-1">Seconds</label>
            <input 
              v-model.number="duration.seconds" 
              type="number" 
              min="0" 
              max="59" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>
      </div>

      <!-- Test Title -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Test Title</label>
        <input 
          v-model="title" 
          type="text" 
          required 
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg"
          placeholder="Enter test title"
        />
      </div>

      <!-- Questions Section -->
      <div v-for="(q, index) in questions" :key="index" class="border rounded-xl p-6 bg-gray-50/50 space-y-5 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Question {{ index + 1 }}</span>
          </h2>
          <button 
            v-if="questions.length > 1" 
            @click="questions.splice(index, 1)" 
            type="button" 
            class="text-red-500 hover:text-red-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        <!-- Question Text -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Question Text</label>
          <textarea 
            v-model="q.questionText" 
            rows="3" 
            placeholder="Enter your question here..." 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[100px]"
          ></textarea>
        </div>

        <!-- Image Upload -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Or Upload Image</label>
          <div class="flex items-center gap-4">
            <label class="flex-1 cursor-pointer">
              <input 
                type="file" 
                @change="(e) => handleImageUpload(e, index)" 
                class="hidden"
                accept="image/*"
              />
              <div class="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors text-center">
                <span class="text-blue-600 font-medium">Choose File</span>
              </div>
            </label>
            <div v-if="q.questionImage" class="relative">
              <img :src="q.questionImage" class="w-24 h-24 object-cover rounded-lg border" />
              <button 
                @click="q.questionImage = ''" 
                type="button" 
                class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Options -->
        <div class="space-y-3">
          <label class="block text-sm font-medium text-gray-700">Options</label>
          <div v-for="i in 4" :key="i" class="flex items-center gap-3">
            <span class="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-sm">{{ i }}</span>
            <input 
              v-model="q.options[i - 1]" 
              type="text" 
              :placeholder="`Option ${i}`" 
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <!-- Correct Answer -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Correct Answer</label>
          <select 
            v-model="q.correctAnswer" 
            required 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            <option disabled value="">Select correct option</option>
            <option v-for="(opt, optIndex) in q.options" :key="optIndex" :value="opt">
              Option {{ optIndex + 1 }}: {{ opt || '[Not set]' }}
            </option>
          </select>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-4 pt-4">
        <button 
          type="button" 
          @click="addQuestion" 
          class="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Question
        </button>

        <button 
          type="submit" 
          class="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Save Test
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import API from '../../services/api';

const title = ref('');
const duration = ref({ hours: 0, minutes: 30, seconds: 0 });
const questions = ref([
  {
    questionText: '',
    questionImage: '',
    options: ['', '', '', ''],
    correctAnswer: '',
  },
]);

// Add a new blank question
const addQuestion = () => {
  questions.value.push({
    questionText: '',
    questionImage: '',
    options: ['', '', '', ''],
    correctAnswer: '',
  });
};

// Upload image to Cloudinary
const handleImageUpload = async (event, index) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'your_upload_preset'); // replace this
  formData.append('cloud_name', 'your_cloud_name'); // replace this

  try {
    const res = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    questions.value[index].questionImage = data.secure_url;
  } catch (err) {
    alert('Image upload failed');
    console.error(err);
  }
};

// Submit test
const handleSubmit = async () => {
  try {
    // Map frontend fields to backend fields
    const mappedQuestions = questions.value.map(q => ({
      text: q.questionText,
      image: q.questionImage,
      options: q.options.filter(opt => opt.trim() !== ''),
      correctAnswer: q.correctAnswer,
    }));
    
    await API.post('/tests/create-test', {
      title: title.value,
      questions: mappedQuestions,
      duration: duration.value,
    });
    
    alert('Test created successfully!');
    // Reset form
    title.value = '';
    duration.value = { hours: 0, minutes: 30, seconds: 0 };
    questions.value = [
      {
        questionText: '',
        questionImage: '',
        options: ['', '', '', ''],
        correctAnswer: '',
      },
    ];
  } catch (err) {
    alert('Error creating test');
    console.error(err);
  }
};
</script>