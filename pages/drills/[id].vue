<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div v-if="drill">
      <!-- Header -->
      <div class="flex items-center space-x-4 mb-8">
        <NuxtLink
          :to="backLink"
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </NuxtLink>
        <div class="flex-1">
          <div class="flex items-center space-x-3">
            <span class="text-4xl">{{ drill.icon }}</span>
            <div>
              <h1 class="text-3xl font-bold text-gray-900">{{ drill.name }}</h1>
              <div class="flex items-center space-x-3 mt-2">
                <span :class="difficultyColors[drill.difficulty]" class="px-3 py-1 rounded-full text-xs font-semibold uppercase">
                  {{ drill.difficulty }}
                </span>
                <span class="text-sm text-gray-600">{{ drill.duration }} minutes</span>
                <span v-if="isCompleted" class="text-green-600 flex items-center text-sm">
                  <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  Completed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="mb-6">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              @click="activeTab = 'details'"
              :class="[
                activeTab === 'details'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg'
              ]"
            >
              📋 Drill Details
            </button>
            <button
              @click="activeTab = 'training'"
              :class="[
                activeTab === 'training'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg'
              ]"
            >
              🎯 Training Setup
            </button>
          </nav>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="space-y-6">
        
        <!-- DETAILS TAB -->
        <div v-show="activeTab === 'details'" class="space-y-6">

      <!-- Video -->
      <div v-if="drill.videoUrl" class="card">
        <h2 class="text-xl font-bold mb-4">📹 Video Demonstration</h2>
        <UiYoutubeEmbed :video-id="drill.videoUrl" />
      </div>

      <!-- Description -->
      <div class="card">
        <h2 class="text-xl font-bold mb-3">About This Drill</h2>
        <p class="text-gray-700 text-lg">{{ drill.description }}</p>
      </div>

      <!-- Quick Info -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="card text-center">
          <div class="text-3xl mb-2">👥</div>
          <div class="text-sm text-gray-600">Players</div>
          <div class="font-bold">{{ drill.playersNeeded }}</div>
        </div>
        <div class="card text-center">
          <div class="text-3xl mb-2">📏</div>
          <div class="text-sm text-gray-600">Space</div>
          <div class="font-bold text-sm">{{ drill.spaceRequired }}</div>
        </div>
        <div class="card text-center">
          <div class="text-3xl mb-2">⏱️</div>
          <div class="text-sm text-gray-600">Duration</div>
          <div class="font-bold">{{ drill.duration }} min</div>
        </div>
        <div class="card text-center">
          <div class="text-3xl mb-2">⚙️</div>
          <div class="text-sm text-gray-600">Difficulty</div>
          <div class="font-bold capitalize">{{ drill.difficulty }}</div>
        </div>
      </div>

      <!-- Equipment -->
      <div class="card">
        <h2 class="text-xl font-bold mb-4">🎒 Equipment Needed</h2>
        <ul class="space-y-2">
          <li v-for="(item, idx) in drill.equipment" :key="idx" class="flex items-center space-x-3">
            <svg class="w-5 h-5 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span class="text-gray-700">{{ item }}</span>
          </li>
        </ul>
      </div>

      <!-- Instructions -->
      <div class="card">
        <h2 class="text-xl font-bold mb-4">📋 Setup & Instructions</h2>
        <ol class="space-y-3">
          <li v-for="(instruction, idx) in drill.instructions" :key="idx" class="flex space-x-3">
            <span class="flex-shrink-0 w-7 h-7 rounded-full bg-primary-500 text-white flex items-center justify-center font-semibold text-sm">
              {{ idx + 1 }}
            </span>
            <span class="text-gray-700 pt-0.5">{{ instruction }}</span>
          </li>
        </ol>
      </div>

      <!-- Key Coaching Points -->
      <div class="card bg-blue-50 border-2 border-blue-200">
        <h2 class="text-xl font-bold mb-4 text-blue-900">💡 Key Coaching Points</h2>
        <ul class="space-y-2">
          <li v-for="(point, idx) in drill.keyPoints" :key="idx" class="flex items-start space-x-3">
            <span class="text-blue-600 font-bold">•</span>
            <span class="text-blue-900">{{ point }}</span>
          </li>
        </ul>
      </div>

      <!-- Benefits -->
      <div v-if="drill.benefits && drill.benefits.length > 0" class="card bg-green-50 border-2 border-green-200">
        <h2 class="text-xl font-bold mb-4 text-green-900">🎯 What You'll Gain (Benefits)</h2>
        <ul class="space-y-2">
          <li v-for="(benefit, idx) in drill.benefits" :key="idx" class="flex items-start space-x-3">
            <span class="text-green-600 font-bold text-xl">✓</span>
            <span class="text-green-900">{{ benefit }}</span>
          </li>
        </ul>
      </div>

      <!-- Progressions -->
      <div v-if="drill.progressions && drill.progressions.length > 0" class="card bg-purple-50 border-2 border-purple-200">
        <h2 class="text-xl font-bold mb-4 text-purple-900">📈 Make It Harder (Progressions)</h2>
        <ul class="space-y-2">
          <li v-for="(progression, idx) in drill.progressions" :key="idx" class="flex items-start space-x-3">
            <span class="text-purple-600 font-bold">{{ idx + 1 }}.</span>
            <span class="text-purple-900">{{ progression }}</span>
          </li>
        </ul>
      </div>

        </div>
        <!-- END DETAILS TAB -->

        <!-- TRAINING SETUP TAB -->
        <div v-show="activeTab === 'training'" class="space-y-6">
          
          <!-- Interactive Training Mode for Cognitive Drills -->
          <div v-if="drill.category === 'cognitive'">
            <DrillsDrillTrainer 
              :drill-id="drill.id"
              @completed="handleTrainingCompleted"
            />
          </div>

          <!-- Quick Actions for Non-Cognitive Drills -->
          <div v-else>
            <div class="card bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-200 max-w-2xl mx-auto">
              <h2 class="text-2xl font-bold mb-6 text-primary-900 text-center">⚡ Ready to Train?</h2>
              
              <!-- Drill Summary in Training Tab -->
              <div class="bg-white/50 rounded-lg p-4 mb-6">
                <h3 class="font-semibold text-gray-900 mb-3 text-center">📊 Training Overview</h3>
                <div class="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div class="text-2xl font-bold text-primary-600">{{ drill.duration }}</div>
                    <div class="text-xs text-gray-600">Minutes</div>
                  </div>
                  <div>
                    <div class="text-2xl font-bold text-primary-600">{{ drill.playersNeeded }}</div>
                    <div class="text-xs text-gray-600">Players</div>
                  </div>
                  <div>
                    <div class="text-2xl font-bold text-primary-600 capitalize">{{ drill.difficulty }}</div>
                    <div class="text-xs text-gray-600">Level</div>
                  </div>
                  <div>
                    <div class="text-2xl font-bold text-primary-600">{{ drill.spaceRequired }}</div>
                    <div class="text-xs text-gray-600">Space</div>
                  </div>
                </div>
              </div>

              <!-- Equipment Checklist -->
              <div class="bg-white/50 rounded-lg p-4 mb-6">
                <h3 class="font-semibold text-gray-900 mb-3">✅ Equipment Checklist</h3>
                <ul class="space-y-2">
                  <li v-for="(item, idx) in drill.equipment" :key="idx" class="flex items-center space-x-2">
                    <input type="checkbox" class="w-4 h-4 text-primary-600 rounded">
                    <span class="text-gray-700">{{ item }}</span>
                  </li>
                </ul>
              </div>

              <!-- Action Buttons -->
              <div class="space-y-3">
                <button
                  v-if="!isCompleted"
                  @click="markAsComplete"
                  class="btn-primary w-full text-lg py-4"
                >
                  <svg class="w-6 h-6 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  Mark as Completed
                </button>
                <button
                  v-else
                  @click="markAsComplete"
                  class="btn-primary w-full text-lg py-4 bg-green-600 hover:bg-green-700"
                >
                  ✓ Completed - Train Again?
                </button>
                <NuxtLink :to="backLink" class="btn-secondary w-full text-center block">
                  Back to Drills
                </NuxtLink>
              </div>
            </div>
          </div>

        </div>
        <!-- END TRAINING SETUP TAB -->

      </div>
      <!-- END Tab Content -->
    </div>

    <!-- Not Found -->
    <div v-else class="text-center py-12">
      <div class="text-6xl mb-4">❌</div>
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Drill Not Found</h2>
      <p class="text-gray-600 mb-8">The drill you're looking for doesn't exist.</p>
      <NuxtLink to="/drills" class="btn-primary">
        Back to Drills
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDrillStore } from '~/stores/drillStore';

const route = useRoute();
const drillStore = useDrillStore();

const drillId = computed(() => route.params.id as string);
const drill = computed(() => 
  drillStore.drills.find(d => d.id === drillId.value)
);

const isCompleted = computed(() => drillStore.isCompleted(drillId.value));

// Back link - navigate to section page if drill has a section, otherwise main drills page
const backLink = computed(() => {
  if (drill.value?.section) {
    return `/drills/section/${drill.value.section}`;
  }
  return '/drills';
});

// Tab state
const activeTab = ref<'details' | 'training'>('details');

const difficultyColors: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-orange-100 text-orange-700',
  pro: 'bg-red-100 text-red-700',
};

function markAsComplete() {
  if (drill.value) {
    drillStore.markComplete(drill.value.id);
  }
}

function handleTrainingCompleted() {
  // Automatically mark as complete when training session finishes
  if (drill.value) {
    drillStore.markComplete(drill.value.id);
  }
}

// Set page meta
useHead({
  title: drill.value ? `${drill.value.name} - InstinctFC` : 'Drill - InstinctFC',
});
</script>
