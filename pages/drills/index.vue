<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-10 text-center">
        <h1 class="text-4xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight">
          Training <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Categories</span>
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose your path to excellence
        </p>
      </div>

      <!-- Categories Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Cognitive Fitness Card -->
        <NuxtLink
          to="/drills/section/fitness"
          class="group block relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
        >
          <div class="relative h-80 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
            <!-- Animated Background Pattern -->
            <div class="absolute inset-0 opacity-20">
              <div class="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
              <div class="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse" style="animation-delay: 0.5s;"></div>
            </div>
            
            <!-- Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent group-hover:from-black/40 transition-all duration-500"></div>
            
            <!-- Icon -->
            <div class="absolute top-6 left-6">
              <div class="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            
            <!-- Content -->
            <div class="relative h-full flex flex-col justify-end p-8 text-white">
              <div class="transform group-hover:translate-x-2 transition-transform duration-500">
                <h2 class="text-4xl font-black mb-3 leading-tight">Cognitive<br/>Fitness</h2>
                <p class="text-white/90 text-sm mb-4 leading-relaxed">Core strength, balance, and body control exercises</p>
                <div class="flex items-center gap-2">
                  <span class="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
                    For Everyone
                  </span>
                  <div class="flex items-center gap-1">
                    <div class="w-2 h-2 bg-white rounded-full"></div>
                    <span class="text-sm font-medium">{{ fitnessDrills.length }} Drills</span>
                  </div>
                </div>
              </div>
              
              <!-- Arrow -->
              <div class="absolute bottom-8 right-8 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-500">
                <svg class="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </NuxtLink>

        <!-- Athletic Intelligence Card -->
        <NuxtLink
          to="/drills/section/intelligence"
          class="group block relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
        >
          <div class="relative h-80 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <!-- Grid Pattern -->
            <div class="absolute inset-0 opacity-10" style="background-image: linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px); background-size: 20px 20px;"></div>
            
            <!-- Animated Shapes -->
            <div class="absolute top-20 right-10 w-20 h-20 border-4 border-white/20 rounded-lg transform rotate-12 group-hover:rotate-45 transition-transform duration-700"></div>
            <div class="absolute bottom-20 left-10 w-16 h-16 border-4 border-white/10 rounded-full group-hover:scale-125 transition-transform duration-700"></div>
            
            <!-- Logo/Badge -->
            <div class="absolute top-6 left-6">
              <div class="bg-white px-5 py-2 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-500">
                <span class="text-xl font-black text-slate-900 tracking-tight">SKLZ</span>
              </div>
            </div>
            
            <!-- Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/50 transition-all duration-500"></div>
            
            <!-- Content -->
            <div class="relative h-full flex flex-col justify-end p-8 text-white">
              <div class="transform group-hover:translate-x-2 transition-transform duration-500">
                <div class="flex items-center gap-3 mb-4">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span class="text-xs font-black uppercase tracking-widest text-yellow-400">Athletic Intelligence</span>
                </div>
                <h2 class="text-4xl font-black mb-3 leading-tight">Athletic<br/>Intelligence</h2>
                <p class="text-white/90 text-sm mb-4 leading-relaxed">Spatial awareness and decision-making</p>
                <div class="flex items-center gap-1">
                  <div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span class="text-sm font-medium">{{ intelligenceDrills.length }} Drills</span>
                </div>
              </div>
              
              <!-- Arrow -->
              <div class="absolute bottom-8 right-8 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-500">
                <svg class="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </NuxtLink>

        <!-- Reactive Agility Card -->
        <NuxtLink
          to="/drills/section/agility"
          class="group block relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
        >
          <div class="relative h-80 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600">
            <!-- Animated Background -->
            <div class="absolute inset-0 opacity-30">
              <div class="absolute top-1/4 left-1/4 w-40 h-40 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
              <div class="absolute bottom-1/4 right-1/4 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse" style="animation-delay: 0.7s;"></div>
            </div>
            
            <!-- Icon -->
            <div class="absolute top-6 left-6">
              <div class="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            
            <!-- Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent group-hover:from-black/40 transition-all duration-500"></div>
            
            <!-- Content -->
            <div class="relative h-full flex flex-col justify-end p-8 text-white">
              <div class="transform group-hover:translate-x-2 transition-transform duration-500">
                <h2 class="text-4xl font-black mb-3 leading-tight">Reactive<br/>Agility</h2>
                <p class="text-white/90 text-sm mb-4 leading-relaxed">Quick reactions and explosive movements</p>
                <div class="flex items-center gap-2">
                  <span class="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
                    For All Sports
                  </span>
                  <div class="flex items-center gap-1">
                    <div class="w-2 h-2 bg-white rounded-full"></div>
                    <span class="text-sm font-medium">{{ agilityDrills.length }} Drills</span>
                  </div>
                </div>
              </div>
              
              <!-- Arrow -->
              <div class="absolute bottom-8 right-8 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-500">
                <svg class="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </NuxtLink>

        <!-- Soccer Card -->
        <NuxtLink
          to="/drills/section/soccer"
          class="group block relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
        >
          <div class="relative h-80 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600">
            <!-- Soccer Pattern -->
            <div class="absolute inset-0 opacity-10">
              <svg class="absolute top-10 right-10 w-32 h-32 text-white transform rotate-12 group-hover:rotate-45 transition-transform duration-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <div class="absolute bottom-20 left-10 w-24 h-24 border-4 border-white rounded-full group-hover:scale-125 transition-transform duration-700"></div>
            </div>
            
            <!-- Sync Badge -->
            <div class="absolute top-6 right-6 group-hover:scale-105 transition-transform duration-500">
              <div class="flex items-center gap-2 bg-orange-500 px-5 py-3 rounded-full shadow-xl">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span class="text-white font-black text-sm tracking-wide">SYNC</span>
              </div>
            </div>
            
            <!-- Icon -->
            <div class="absolute top-6 left-6">
              <div class="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <span class="text-3xl">⚽</span>
              </div>
            </div>
            
            <!-- Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent group-hover:from-black/40 transition-all duration-500"></div>
            
            <!-- Content -->
            <div class="relative h-full flex flex-col justify-end p-8 text-white">
              <div class="transform group-hover:translate-x-2 transition-transform duration-500">
                <h2 class="text-4xl font-black mb-3">Soccer</h2>
                <p class="text-white/90 text-sm mb-4 leading-relaxed">Ball mastery with cognitive challenges</p>
                <div class="flex items-center gap-2">
                  <span class="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
                    Ball Required
                  </span>
                  <div class="flex items-center gap-1">
                    <div class="w-2 h-2 bg-white rounded-full"></div>
                    <span class="text-sm font-medium">{{ soccerDrills.length }} Drills</span>
                  </div>
                </div>
              </div>
              
              <!-- Arrow -->
              <div class="absolute bottom-8 right-8 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-500">
                <svg class="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </NuxtLink>

      </div>

      <!-- Empty State -->
      <div v-if="allDrills.length === 0" class="text-center py-12 mt-8">
        <div class="text-6xl mb-4">🎯</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No drills found</h3>
        <p class="text-gray-600">Check back soon for new training drills</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDrillStore } from '~/stores/drillStore';

const drillStore = useDrillStore();

// Get all cognitive drills
const allDrills = computed(() => 
  drillStore.drills.filter(drill => drill.category === 'cognitive')
);

// Filter drills by section
const fitnessDrills = computed(() => 
  allDrills.value.filter(drill => drill.section === 'fitness')
);

const intelligenceDrills = computed(() => 
  allDrills.value.filter(drill => drill.section === 'intelligence')
);

const agilityDrills = computed(() => 
  allDrills.value.filter(drill => drill.section === 'agility')
);

const soccerDrills = computed(() => 
  allDrills.value.filter(drill => drill.section === 'soccer')
);
</script>
