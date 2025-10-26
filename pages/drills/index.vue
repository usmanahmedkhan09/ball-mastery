<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">🧠 Cognitive Training Drills</h1>
      <p class="text-xl text-gray-600">
        Elevate your game with our comprehensive cognitive training program. Click any section to explore drills.
      </p>
    </div>

    <!-- Section: Cognitive Fitness for Everyone -->
    <section class="mb-16">
      <NuxtLink
        to="/drills/section/fitness"
        class="group block card-hover p-6 transition-all"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
              <span class="text-3xl">💪</span>
            </div>
            <div>
              <h2 class="text-3xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                Cognitive Fitness for Everyone
              </h2>
              <p class="text-gray-600 mt-1">Core strength, balance, and body control exercises</p>
              <p class="text-sm text-gray-500 mt-2">{{ fitnessDrills.length }} drills available</p>
            </div>
          </div>
          <svg class="w-8 h-8 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-2 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </NuxtLink>
    </section>

    <!-- Section: Athletic Intelligence -->
    <section class="mb-16">
      <NuxtLink
        to="/drills/section/intelligence"
        class="group block card-hover p-6 transition-all"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
              <span class="text-3xl">🧠</span>
            </div>
            <div>
              <h2 class="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                Athletic Intelligence
              </h2>
              <p class="text-gray-600 mt-1">Spatial awareness, scanning, and decision-making under pressure</p>
              <p class="text-sm text-gray-500 mt-2">{{ intelligenceDrills.length }} drills available</p>
            </div>
          </div>
          <svg class="w-8 h-8 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </NuxtLink>
    </section>

    <!-- Section: Reactive Agility -->
    <section class="mb-16">
      <NuxtLink
        to="/drills/section/agility"
        class="group block card-hover p-6 transition-all"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
              <span class="text-3xl">⚡</span>
            </div>
            <div>
              <h2 class="text-3xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                Reactive Agility
              </h2>
              <p class="text-gray-600 mt-1">Quick reactions, explosive movements, and audio/visual cue response</p>
              <p class="text-sm text-gray-500 mt-2">{{ agilityDrills.length }} drills available</p>
            </div>
          </div>
          <svg class="w-8 h-8 text-gray-400 group-hover:text-orange-600 group-hover:translate-x-2 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </NuxtLink>
    </section>

    <!-- Section: Soccer-Specific -->
    <section class="mb-16">
      <NuxtLink
        to="/drills/section/soccer"
        class="group block card-hover p-6 transition-all"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
              <span class="text-3xl">⚽</span>
            </div>
            <div>
              <h2 class="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                Soccer-Specific Cognitive Drills
              </h2>
              <p class="text-gray-600 mt-1">Ball mastery, technical skills combined with cognitive challenges</p>
              <p class="text-sm text-gray-500 mt-2">{{ soccerDrills.length }} drills available</p>
            </div>
          </div>
          <svg class="w-8 h-8 text-gray-400 group-hover:text-green-600 group-hover:translate-x-2 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </NuxtLink>
    </section>

    <!-- Empty State -->
    <div v-if="allDrills.length === 0" class="text-center py-12">
      <div class="text-6xl mb-4">🎯</div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">No drills found</h3>
      <p class="text-gray-600">Check back soon for new training drills</p>
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
