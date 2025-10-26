<template>
  <div class="overflow-hidden">
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 text-white overflow-hidden">
      <!-- Animated Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
        <div class="absolute top-0 right-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
        <div class="absolute bottom-0 left-1/2 w-96 h-96 bg-green-200 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <!-- Soccer Ball Pattern -->
      <div class="absolute inset-0 opacity-5">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="soccer-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="30" fill="none" stroke="white" stroke-width="2"/>
            <path d="M 50 20 L 35 45 L 50 80 L 65 45 Z" fill="white" opacity="0.3"/>
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#soccer-pattern)"/>
        </svg>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div class="text-center">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in-down">
            <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span class="text-sm font-semibold">Professional Training Platform</span>
          </div>

          <!-- Main Heading -->
          <h1 class="text-5xl md:text-7xl lg:text-8xl font-black mb-6 animate-fade-in-up leading-tight">
            <span class="inline-block animate-gradient bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
              Elevate Your Game
            </span>
            <br/>
            <span class="text-green-200">Train Like a Pro</span>
          </h1>

          <!-- Subheading -->
          <p class="text-xl md:text-2xl lg:text-3xl mb-12 text-green-50 max-w-4xl mx-auto animate-fade-in leading-relaxed">
            Master cognitive drills, technical skills, and tactical awareness with our comprehensive training platform
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up animation-delay-300">
            <NuxtLink to="/drills" class="group relative px-8 py-4 bg-white text-green-700 rounded-xl font-bold text-lg shadow-2xl hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
              <span>🚀 Start Training</span>
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </NuxtLink>
            <NuxtLink to="/stats" class="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold text-lg border-2 border-white/20 hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
              📊 View Progress
            </NuxtLink>
          </div>

          <!-- Scroll Indicator -->
          <div class="animate-bounce mt-12">
            <svg class="w-6 h-6 mx-auto text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Overview -->
    <section class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 mb-20">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Stat Card 1 -->
        <div class="group relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-2xl hover:shadow-blue-500/50 transform hover:-translate-y-2 transition-all duration-300 overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div class="relative">
            <div class="text-5xl mb-4">🎯</div>
            <div class="text-5xl font-black mb-2">{{ userStats.totalDrillsCompleted }}</div>
            <div class="text-blue-100 font-semibold">Drills Completed</div>
          </div>
        </div>

        <!-- Stat Card 2 -->
        <div class="group relative bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white shadow-2xl hover:shadow-purple-500/50 transform hover:-translate-y-2 transition-all duration-300 overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div class="relative">
            <div class="text-5xl mb-4">📹</div>
            <div class="text-5xl font-black mb-2">{{ totalDrills }}</div>
            <div class="text-purple-100 font-semibold">Video Drills Available</div>
          </div>
        </div>

        <!-- Stat Card 3 -->
        <div class="group relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white shadow-2xl hover:shadow-orange-500/50 transform hover:-translate-y-2 transition-all duration-300 overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <div class="relative">
            <div class="text-5xl mb-4">🏆</div>
            <div class="text-5xl font-black mb-2">{{ totalCategories }}</div>
            <div class="text-orange-100 font-semibold">Training Categories</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Drill Categories -->
    <section class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <!-- Background decoration -->
      <div class="absolute inset-0 -z-10">
        <div class="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div class="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div class="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div class="text-center mb-16">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full mb-6">
          <span class="text-2xl">⚡</span>
          <span class="text-sm font-bold text-green-800">7 Powerful Training Paths</span>
        </div>

        <h2 class="text-4xl md:text-6xl font-black text-gray-900 mb-6">
          Pick Your
          <span class="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Training Zone
          </span>
        </h2>
        <p class="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
          Every champion starts with a choice. What will yours be today?
        </p>
        
        <!-- Quick stats -->
        <div class="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          <div class="flex items-center gap-2">
            <span class="text-green-600">✓</span>
            <span>Video Guided</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-green-600">✓</span>
            <span>Professional Level</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-green-600">✓</span>
            <span>Progress Tracking</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Passing -->
        <NuxtLink to="/drills?category=passing" class="group relative bg-gradient-to-br from-red-50 via-red-50 to-red-100 rounded-3xl p-8 hover:shadow-2xl hover:shadow-red-300/60 transform hover:-translate-y-3 hover:rotate-1 transition-all duration-300 overflow-hidden border-2 border-red-100 hover:border-red-300">
          <!-- Animated background circles -->
          <div class="absolute top-0 right-0 w-40 h-40 bg-red-200/30 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500"></div>
          <div class="absolute bottom-0 left-0 w-32 h-32 bg-red-300/20 rounded-full -ml-16 -mb-16 group-hover:scale-125 transition-transform duration-700"></div>
          
          <!-- Popular Badge (optional, can be shown conditionally) -->
          <div class="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            Popular
          </div>
          
          <div class="relative">
            <div class="text-7xl mb-5 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">🔺</div>
            <div class="flex items-center gap-2 mb-3">
              <h3 class="text-2xl font-bold text-gray-900 group-hover:text-red-700 transition-colors">Passing</h3>
              <span class="text-xs font-bold text-red-700 bg-red-200 px-2.5 py-1 rounded-lg shadow-sm">All Levels</span>
            </div>
            <p class="text-gray-700 mb-5 leading-relaxed text-sm">
              Master the fundamentals with triangles, rondos, and possession drills. Perfect your accuracy and vision.
            </p>
            
            <!-- Features -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="text-xs bg-white/60 text-gray-700 px-2 py-1 rounded-md">Triangles</span>
              <span class="text-xs bg-white/60 text-gray-700 px-2 py-1 rounded-md">Rondos</span>
              <span class="text-xs bg-white/60 text-gray-700 px-2 py-1 rounded-md">Vision</span>
            </div>
            
            <div class="flex items-center justify-between pt-3 border-t border-red-200">
              <div class="flex items-center gap-2">
                <div class="flex gap-1">
                  <span class="w-2 h-2 bg-red-500 rounded-full group-hover:animate-pulse"></span>
                  <span class="w-2 h-2 bg-red-500 rounded-full group-hover:animate-pulse animation-delay-100"></span>
                  <span class="w-2 h-2 bg-red-500 rounded-full group-hover:animate-pulse animation-delay-200"></span>
                  <span class="w-2 h-2 bg-red-300 rounded-full"></span>
                </div>
                <span class="text-xs text-gray-600 font-medium">Intensity</span>
              </div>
              <div class="flex items-center gap-2 text-red-600 font-semibold group-hover:gap-3 transition-all">
                <span class="text-sm">Start</span>
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </div>
            </div>
          </div>
        </NuxtLink>

        <!-- Shooting -->
        <NuxtLink to="/drills?category=shooting" class="group relative bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-3xl p-8 hover:shadow-2xl hover:shadow-yellow-200/50 transform hover:-translate-y-2 transition-all duration-300 overflow-hidden">
          <div class="absolute top-0 right-0 w-40 h-40 bg-yellow-200/30 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500"></div>
          <div class="relative">
            <div class="text-6xl mb-4 transform group-hover:scale-110 transition-transform">🥅</div>
            <div class="flex items-center gap-2 mb-3">
              <h3 class="text-2xl font-bold text-gray-900">Shooting</h3>
              <span class="text-xs font-semibold text-yellow-700 bg-yellow-200 px-2 py-1 rounded-md">Intermediate</span>
            </div>
            <p class="text-gray-700 mb-4 leading-relaxed">
              Improve finishing, power, and placement from different angles
            </p>
            <div class="flex items-center justify-between">
              <div class="flex gap-1">
                <span class="w-2 h-2 bg-yellow-400 rounded-full"></span>
                <span class="w-2 h-2 bg-yellow-400 rounded-full"></span>
                <span class="w-2 h-2 bg-yellow-200 rounded-full"></span>
                <span class="w-2 h-2 bg-yellow-200 rounded-full"></span>
              </div>
              <svg class="w-6 h-6 text-yellow-600 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </div>
          </div>
        </NuxtLink>

        <!-- Dribbling -->
        <NuxtLink to="/drills?category=dribbling" class="group relative bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 hover:shadow-2xl hover:shadow-green-200/50 transform hover:-translate-y-2 transition-all duration-300 overflow-hidden">
          <div class="absolute top-0 right-0 w-40 h-40 bg-green-200/30 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500"></div>
          <div class="relative">
            <div class="text-6xl mb-4 transform group-hover:scale-110 transition-transform">🎯</div>
            <div class="flex items-center gap-2 mb-3">
              <h3 class="text-2xl font-bold text-gray-900">Dribbling</h3>
              <span class="text-xs font-semibold text-green-700 bg-green-200 px-2 py-1 rounded-md">Advanced</span>
            </div>
            <p class="text-gray-700 mb-4 leading-relaxed">
              Develop close control, quick feet, and 1v1 skills
            </p>
            <div class="flex items-center justify-between">
              <div class="flex gap-1">
                <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                <span class="w-2 h-2 bg-green-300 rounded-full"></span>
              </div>
              <svg class="w-6 h-6 text-green-600 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </div>
          </div>
        </NuxtLink>

        <!-- Agility -->
        <NuxtLink to="/drills?category=agility" class="group relative bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-8 hover:shadow-2xl hover:shadow-orange-200/50 transform hover:-translate-y-2 transition-all duration-300 overflow-hidden">
          <div class="absolute top-0 right-0 w-40 h-40 bg-orange-200/30 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500"></div>
          <div class="relative">
            <div class="text-6xl mb-4 transform group-hover:scale-110 transition-transform">⚡</div>
            <div class="flex items-center gap-2 mb-3">
              <h3 class="text-2xl font-bold text-gray-900">Agility</h3>
              <span class="text-xs font-semibold text-orange-700 bg-orange-200 px-2 py-1 rounded-md">All Levels</span>
            </div>
            <p class="text-gray-700 mb-4 leading-relaxed">
              Speed, coordination, and footwork exercises
            </p>
            <div class="flex items-center justify-between">
              <div class="flex gap-1">
                <span class="w-2 h-2 bg-orange-400 rounded-full"></span>
                <span class="w-2 h-2 bg-orange-400 rounded-full"></span>
                <span class="w-2 h-2 bg-orange-300 rounded-full"></span>
                <span class="w-2 h-2 bg-orange-200 rounded-full"></span>
              </div>
              <svg class="w-6 h-6 text-orange-600 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </div>
          </div>
        </NuxtLink>

        <!-- Technical -->
        <NuxtLink to="/drills?category=technical" class="group relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 hover:shadow-2xl hover:shadow-blue-200/50 transform hover:-translate-y-2 transition-all duration-300 overflow-hidden">
          <div class="absolute top-0 right-0 w-40 h-40 bg-blue-200/30 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500"></div>
          <div class="relative">
            <div class="text-6xl mb-4 transform group-hover:scale-110 transition-transform">⚽</div>
            <div class="flex items-center gap-2 mb-3">
              <h3 class="text-2xl font-bold text-gray-900">Technical</h3>
              <span class="text-xs font-semibold text-blue-700 bg-blue-200 px-2 py-1 rounded-md">Beginner+</span>
            </div>
            <p class="text-gray-700 mb-4 leading-relaxed">
              Ball mastery, first touch, and control training
            </p>
            <div class="flex items-center justify-between">
              <div class="flex gap-1">
                <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
              </div>
              <svg class="w-6 h-6 text-blue-600 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </div>
          </div>
        </NuxtLink>

        <!-- Small-Sided Games -->
        <NuxtLink to="/drills?category=smallSided" class="group relative bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl p-8 hover:shadow-2xl hover:shadow-pink-200/50 transform hover:-translate-y-2 transition-all duration-300 overflow-hidden">
          <div class="absolute top-0 right-0 w-40 h-40 bg-pink-200/30 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500"></div>
          <div class="relative">
            <div class="text-6xl mb-4 transform group-hover:scale-110 transition-transform">🏃</div>
            <div class="flex items-center gap-2 mb-3">
              <h3 class="text-2xl font-bold text-gray-900">Small-Sided</h3>
              <span class="text-xs font-semibold text-pink-700 bg-pink-200 px-2 py-1 rounded-md">Team</span>
            </div>
            <p class="text-gray-700 mb-4 leading-relaxed">
              Game-realistic training with maximum touches
            </p>
            <div class="flex items-center justify-between">
              <div class="flex gap-1">
                <span class="w-2 h-2 bg-pink-400 rounded-full"></span>
                <span class="w-2 h-2 bg-pink-400 rounded-full"></span>
                <span class="w-2 h-2 bg-pink-300 rounded-full"></span>
                <span class="w-2 h-2 bg-pink-200 rounded-full"></span>
              </div>
              <svg class="w-6 h-6 text-pink-600 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </div>
          </div>
        </NuxtLink>

        <!-- Cognitive Fitness -->
        <NuxtLink to="/drills?category=cognitive" class="group relative bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8 hover:shadow-2xl hover:shadow-purple-200/50 transform hover:-translate-y-2 transition-all duration-300 overflow-hidden">
          <div class="absolute top-0 right-0 w-40 h-40 bg-purple-200/30 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500"></div>
          <div class="relative">
            <div class="text-6xl mb-4 transform group-hover:scale-110 transition-transform">🧠</div>
            <div class="flex items-center gap-2 mb-3">
              <h3 class="text-2xl font-bold text-gray-900">Cognitive</h3>
              <span class="text-xs font-semibold text-purple-700 bg-purple-200 px-2 py-1 rounded-md">Pro Edge</span>
            </div>
            <p class="text-gray-700 mb-4 leading-relaxed">
              Reaction time, decision making, and mental sharpness drills
            </p>
            <div class="flex items-center justify-between">
              <div class="flex gap-1">
                <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
              </div>
              <svg class="w-6 h-6 text-purple-600 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Features -->
    <section class="relative py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      <!-- Decorative Elements -->
      <div class="absolute top-0 left-0 w-96 h-96 bg-green-200/20 rounded-full -ml-48 -mt-48 blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full -mr-48 -mb-48 blur-3xl"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <h2 class="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Why Choose InstinctFC?
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to take your training to the next level
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <!-- Feature 1 -->
          <div class="group text-center">
            <div class="relative mb-8 mx-auto w-32 h-32">
              <div class="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
              <div class="relative bg-white rounded-3xl w-full h-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                <span class="text-6xl">📹</span>
              </div>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Video Demonstrations</h3>
            <p class="text-gray-600 leading-relaxed text-lg">
              Watch professional demonstrations before you practice on the field. Learn proper technique and form.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="group text-center">
            <div class="relative mb-8 mx-auto w-32 h-32">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
              <div class="relative bg-white rounded-3xl w-full h-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                <span class="text-6xl">🎒</span>
              </div>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Complete Equipment Lists</h3>
            <p class="text-gray-600 leading-relaxed text-lg">
              Know exactly what you need before heading to the training ground. Never miss essential equipment again.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="group text-center">
            <div class="relative mb-8 mx-auto w-32 h-32">
              <div class="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
              <div class="relative bg-white rounded-3xl w-full h-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                <span class="text-6xl">📱</span>
              </div>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Works Offline</h3>
            <p class="text-gray-600 leading-relaxed text-lg">
              Download drills and access them anywhere, even without internet. Train anytime, anywhere.
            </p>
          </div>
        </div>

        <!-- Additional Features Grid -->
        <div class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div class="text-center">
            <div class="text-4xl mb-2">✅</div>
            <div class="text-sm font-semibold text-gray-700">Progress Tracking</div>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-2">🏅</div>
            <div class="text-sm font-semibold text-gray-700">Achievement System</div>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-2">📈</div>
            <div class="text-sm font-semibold text-gray-700">Performance Stats</div>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-2">🎯</div>
            <div class="text-sm font-semibold text-gray-700">Skill Focused</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="relative py-20 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 rounded-3xl shadow-2xl overflow-hidden">
          <!-- Animated Background -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
            <div class="absolute bottom-0 left-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
          </div>

          <div class="relative px-8 py-20 md:py-28 text-center">
            <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span class="text-sm font-semibold text-white">Join Thousands of Players</span>
            </div>
            
            <h2 class="text-4xl md:text-6xl font-black text-white mb-6">
              Ready to Elevate Your Game?
            </h2>
            <p class="text-xl md:text-2xl text-green-50 mb-12 max-w-3xl mx-auto">
              Start your journey to becoming a better player today. Access professional drills instantly.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <NuxtLink to="/drills" class="group px-10 py-5 bg-white text-green-700 rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                <span>🚀 Browse All Drills</span>
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </NuxtLink>
              <NuxtLink to="/stats" class="px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold text-lg border-2 border-white/20 hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
                View My Progress
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useDrillStore } from '~/stores/drillStore';

const drillStore = useDrillStore();
const userStats = computed(() => drillStore.userStats);
const totalDrills = computed(() => drillStore.drills.length);
const totalCategories = 7;
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(20px, -50px) scale(1.1);
  }
  50% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  75% {
    transform: translate(50px, 50px) scale(1.05);
  }
}

@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.animate-fade-in-down {
  animation: fade-in-down 0.8s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out;
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-100 {
  animation-delay: 0.1s;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}
</style>
