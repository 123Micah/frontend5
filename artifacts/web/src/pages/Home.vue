<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
    <div class="text-center bg-white p-8 sm:p-10 rounded-2xl shadow-lg max-w-md w-full transition-all hover:shadow-xl">
      <div class="mb-8">
        <div class="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Smart Exam Portal</h1>
        <p class="text-gray-500">Choose your role to get started</p>
      </div>

      <div class="space-y-4">
        <RouterLink
          to="/admin/login"
          class="block px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
        >
          Admin Login
        </RouterLink>

        <RouterLink
          to="/student/login"
          class="block px-6 py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white font-medium shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
        >
          Student Login
        </RouterLink>
      </div>
      
      <div class="mt-6 text-sm text-gray-400">
        Secure & reliable examination platform
      </div>
    </div>
  </div>
</template>

<script setup>
</script>