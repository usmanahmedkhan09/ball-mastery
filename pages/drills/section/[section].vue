<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Back Button -->
    <NuxtLink
      to="/drills"
      class="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
    >
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Back to All Sections
    </NuxtLink>

    <!-- Section Header -->
    <div v-if="sectionInfo" class="mb-8">
      <div class="flex items-center mb-6">
        <div 
          class="flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center mr-6 shadow-lg"
          :class="sectionInfo.bgColor"
        >
          <span class="text-4xl">{{ sectionInfo.icon }}</span>
        </div>
        <div>
          <h1 class="text-4xl font-bold text-gray-900">{{ sectionInfo.title }}</h1>
          <p class="text-xl text-gray-600 mt-2">{{ sectionInfo.description }}</p>
          <p class="text-sm text-gray-500 mt-2">{{ filteredDrills.length }} of {{ sectionDrills.length }} drills</p>
        </div>
      </div>
    </div>

    <!-- Difficulty Filter -->
    <div class="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-1">Filter by Difficulty</h3>
          <p class="text-sm text-gray-600">Choose your skill level</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <button
            @click="selectedDifficulty = 'all'"
            :class="[
              'px-6 py-2.5 rounded-lg font-medium transition-all duration-200',
              selectedDifficulty === 'all'
                ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            All Levels
            <span class="ml-2 text-xs opacity-80">({{ sectionDrills.length }})</span>
          </button>
          <button
            @click="selectedDifficulty = 'beginner'"
            :class="[
              'px-6 py-2.5 rounded-lg font-medium transition-all duration-200',
              selectedDifficulty === 'beginner'
                ? 'bg-green-600 text-white shadow-md hover:bg-green-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            🌱 Beginner
            <span class="ml-2 text-xs opacity-80">({{ beginnerCount }})</span>
          </button>
          <button
            @click="selectedDifficulty = 'intermediate'"
            :class="[
              'px-6 py-2.5 rounded-lg font-medium transition-all duration-200',
              selectedDifficulty === 'intermediate'
                ? 'bg-yellow-600 text-white shadow-md hover:bg-yellow-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            ⚡ Intermediate
            <span class="ml-2 text-xs opacity-80">({{ intermediateCount }})</span>
          </button>
          <button
            @click="selectedDifficulty = 'advanced'"
            :class="[
              'px-6 py-2.5 rounded-lg font-medium transition-all duration-200',
              selectedDifficulty === 'advanced'
                ? 'bg-orange-600 text-white shadow-md hover:bg-orange-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            🔥 Advanced
            <span class="ml-2 text-xs opacity-80">({{ advancedCount }})</span>
          </button>
          <button
            @click="selectedDifficulty = 'pro'"
            :class="[
              'px-6 py-2.5 rounded-lg font-medium transition-all duration-200',
              selectedDifficulty === 'pro'
                ? 'bg-purple-600 text-white shadow-md hover:bg-purple-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            👑 Pro
            <span class="ml-2 text-xs opacity-80">({{ proCount }})</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Drills Grid -->
    <div v-if="filteredDrills.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DrillsDrillCard 
        v-for="drill in filteredDrills" 
        :key="drill.id" 
        :drill="drill"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div class="text-6xl mb-4">🎯</div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">No drills found</h3>
      <p class="text-gray-600 mb-8">
        {{ selectedDifficulty === 'all' 
          ? 'There are no drills in this section yet.' 
          : `No ${selectedDifficulty} drills available. Try a different difficulty level.` 
        }}
      </p>
      <button 
        v-if="selectedDifficulty !== 'all'"
        @click="selectedDifficulty = 'all'"
        class="btn-primary mr-3"
      >
        Show All Drills
      </button>
      <NuxtLink to="/drills" class="btn-secondary">
        Browse All Sections
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDrillStore } from '~/stores/drillStore';

const route = useRoute();
const drillStore = useDrillStore();

const sectionSlug = computed(() => route.params.section as string);

// Difficulty filter state
const selectedDifficulty = ref<'all' | 'beginner' | 'intermediate' | 'advanced' | 'pro'>('all');

// Section information
const sections = {
  fitness: {
    title: 'Cognitive Fitness for Everyone',
    description: 'Core strength, balance, and body control exercises',
    icon: '💪',
    bgColor: 'bg-gradient-to-br from-purple-500 to-pink-500',
  },
  intelligence: {
    title: 'Athletic Intelligence',
    description: 'Spatial awareness, scanning, and decision-making under pressure',
    icon: '🧠',
    bgColor: 'bg-gradient-to-br from-blue-500 to-cyan-500',
  },
  agility: {
    title: 'Reactive Agility',
    description: 'Quick reactions, explosive movements, and audio/visual cue response',
    icon: '⚡',
    bgColor: 'bg-gradient-to-br from-orange-500 to-red-500',
  },
  soccer: {
    title: 'Soccer-Specific Cognitive Drills',
    description: 'Ball mastery, technical skills combined with cognitive challenges',
    icon: '⚽',
    bgColor: 'bg-gradient-to-br from-green-500 to-emerald-500',
  },
};

const sectionInfo = computed(() => {
  return sections[sectionSlug.value as keyof typeof sections] || null;
});

// Get drills for this section
const sectionDrills = computed(() => {
  return drillStore.drills.filter(
    drill => drill.category === 'cognitive' && drill.section === sectionSlug.value
  );
});

// Filter drills by difficulty
const filteredDrills = computed(() => {
  if (selectedDifficulty.value === 'all') {
    return sectionDrills.value;
  }
  return sectionDrills.value.filter(
    drill => drill.difficulty === selectedDifficulty.value
  );
});

// Count drills by difficulty
const beginnerCount = computed(() => 
  sectionDrills.value.filter(d => d.difficulty === 'beginner').length
);
const intermediateCount = computed(() => 
  sectionDrills.value.filter(d => d.difficulty === 'intermediate').length
);
const advancedCount = computed(() => 
  sectionDrills.value.filter(d => d.difficulty === 'advanced').length
);
const proCount = computed(() => 
  sectionDrills.value.filter(d => d.difficulty === 'pro').length
);

// Set page meta
useHead({
  title: sectionInfo.value ? `${sectionInfo.value.title} - InstinctFC` : 'Drills - InstinctFC',
});
</script>

