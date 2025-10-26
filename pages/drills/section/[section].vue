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
    <div v-if="sectionInfo" class="mb-12">
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
          <p class="text-sm text-gray-500 mt-2">{{ sectionDrills.length }} drills available</p>
        </div>
      </div>
    </div>

    <!-- Drills Grid -->
    <div v-if="sectionDrills.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DrillsDrillCard 
        v-for="drill in sectionDrills" 
        :key="drill.id" 
        :drill="drill"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div class="text-6xl mb-4">🎯</div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">No drills found</h3>
      <p class="text-gray-600 mb-8">There are no drills in this section yet.</p>
      <NuxtLink to="/drills" class="btn-primary">
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

// Set page meta
useHead({
  title: sectionInfo.value ? `${sectionInfo.value.title} - InstinctFC` : 'Drills - InstinctFC',
});
</script>

