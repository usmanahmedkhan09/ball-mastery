<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Your Training Progress</h1>
      <p class="text-xl text-gray-600">
        Track your completed drills and training sessions
      </p>
    </div>

    <!-- Overall Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div class="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium opacity-90">Total Completed</span>
          <span class="text-3xl">🎯</span>
        </div>
        <div class="text-4xl font-bold">{{ userStats.totalDrillsCompleted }}</div>
      </div>

      <div class="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium opacity-90">Available Drills</span>
          <span class="text-3xl">📚</span>
        </div>
        <div class="text-4xl font-bold">{{ totalDrills }}</div>
      </div>

      <div class="card bg-gradient-to-br from-green-500 to-green-600 text-white">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium opacity-90">Completion Rate</span>
          <span class="text-3xl">📈</span>
        </div>
        <div class="text-4xl font-bold">{{ completionRate }}%</div>
      </div>
    </div>

    <!-- By Category -->
    <div class="card mb-12">
      <h2 class="text-2xl font-bold mb-6">Completions by Category</h2>
      
      <div v-if="Object.keys(userStats.completionsByCategory).length > 0" class="space-y-4">
        <div
          v-for="(count, category) in userStats.completionsByCategory"
          :key="category"
          class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div class="flex items-center space-x-4">
            <span class="text-3xl">{{ getCategoryIcon(category) }}</span>
            <div>
              <div class="font-semibold text-gray-900 capitalize">{{ getCategoryName(category) }}</div>
              <div class="text-sm text-gray-600">{{ count }} drill{{ count > 1 ? 's' : '' }} completed</div>
            </div>
          </div>
          <div class="text-right">
            <div class="text-2xl font-bold text-primary-600">{{ count }}</div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-12">
        <div class="text-6xl mb-4">🎯</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No completed drills yet</h3>
        <p class="text-gray-600 mb-6">Complete your first drill to see your stats</p>
        <NuxtLink to="/drills" class="btn-primary">
          Start Training
        </NuxtLink>
      </div>
    </div>

    <!-- Recent Completions -->
    <div class="card">
      <h2 class="text-2xl font-bold mb-6">Recent Training Sessions</h2>
      
      <div v-if="userStats.recentCompletions.length > 0" class="space-y-3">
        <div
          v-for="(completion, idx) in userStats.recentCompletions"
          :key="idx"
          class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
        >
          <div class="flex items-center space-x-4">
            <span class="text-2xl">{{ getDrillIcon(completion.drillId) }}</span>
            <div>
              <div class="font-medium text-gray-900">{{ getDrillName(completion.drillId) }}</div>
              <div class="text-sm text-gray-500">{{ formatDate(completion.completedAt) }}</div>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <span class="text-green-600 font-medium">✓ Completed</span>
            <NuxtLink
              :to="`/drills/${completion.drillId}`"
              class="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View →
            </NuxtLink>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-12">
        <div class="text-6xl mb-4">📝</div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No training sessions yet</h3>
        <p class="text-gray-600">Your completed drills will appear here</p>
      </div>
    </div>

    <!-- Clear Data -->
    <div class="mt-12 text-center">
      <button
        v-if="userStats.totalDrillsCompleted > 0"
        @click="confirmClearData"
        class="text-red-600 hover:text-red-700 font-medium text-sm"
      >
        Clear All Data
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDrillStore } from '~/stores/drillStore';

const drillStore = useDrillStore();
const userStats = computed(() => drillStore.userStats);
const totalDrills = computed(() => drillStore.drills.length);
const completionRate = computed(() => {
  if (totalDrills.value === 0) return 0;
  return Math.round((userStats.value.totalDrillsCompleted / totalDrills.value) * 100);
});

const categoryMap: Record<string, { name: string; icon: string }> = {
  passing: { name: 'Passing', icon: '🔺' },
  shooting: { name: 'Shooting', icon: '🥅' },
  dribbling: { name: 'Dribbling', icon: '🎯' },
  agility: { name: 'Agility', icon: '⚡' },
  technical: { name: 'Technical', icon: '⚽' },
  smallSided: { name: 'Small-Sided Games', icon: '🏃' },
};

function getCategoryName(category: string): string {
  return categoryMap[category]?.name || category;
}

function getCategoryIcon(category: string): string {
  return categoryMap[category]?.icon || '🎯';
}

function getDrillIcon(drillId: string): string {
  const drill = drillStore.drills.find(d => d.id === drillId);
  return drill?.icon || '🎯';
}

function getDrillName(drillId: string): string {
  const drill = drillStore.drills.find(d => d.id === drillId);
  return drill?.name || drillId;
}

function formatDate(date: Date): string {
  const now = new Date();
  const completedDate = new Date(date);
  const diff = now.getTime() - completedDate.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours === 0) {
      const minutes = Math.floor(diff / (1000 * 60));
      return minutes === 0 ? 'Just now' : `${minutes} min ago`;
    }
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  
  return completedDate.toLocaleDateString();
}

function confirmClearData() {
  if (confirm('Are you sure you want to clear all your training data? This cannot be undone.')) {
    drillStore.clearAllData();
  }
}

useHead({
  title: 'Training Progress - InstinctFC',
});
</script>

