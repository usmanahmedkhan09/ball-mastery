<template>
  <!-- Mobile: Full-screen overlay, Desktop: Card -->
  <div 
    :class="[
      trainingStatus !== 'idle' && isMobile 
        ? 'fixed inset-0 z-50 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 flex items-center justify-center p-4 overflow-y-auto' 
        : 'card bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200'
    ]"
  >
    <!-- Close button for mobile full-screen mode -->
    <button
      v-if="trainingStatus !== 'idle' && isMobile"
      @click="stopTraining"
      class="absolute top-4 right-4 z-10 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-all"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>

    <!-- Content wrapper -->
    <div :class="trainingStatus !== 'idle' && isMobile ? 'w-full max-w-md' : 'w-full'">
      <h2 
        :class="[
          'text-2xl font-bold mb-4 text-center',
          trainingStatus !== 'idle' && isMobile ? 'text-white' : 'text-indigo-900'
        ]"
      >
        🧠 Interactive Training Mode
      </h2>

    <!-- Training Status Display -->
    <div v-if="trainingStatus !== 'idle'" class="mb-6">
      <!-- Countdown Display -->
      <div v-if="trainingStatus === 'countdown'" class="text-center">
        <div 
          :class="[
            'text-8xl font-bold mb-4 animate-pulse',
            isMobile ? 'text-white' : 'text-primary-600'
          ]"
        >
          {{ countdownValue }}
        </div>
        <p :class="['text-xl', isMobile ? 'text-white' : 'text-gray-600']">Get Ready!</p>
      </div>

      <!-- Active Training Display -->
      <div v-else-if="trainingStatus === 'active'" class="text-center">
        <div class="mb-6">
          <div 
            :class="[
              'text-lg font-semibold mb-2',
              isMobile ? 'text-white' : 'text-gray-700'
            ]"
          >
            Set {{ currentSet }} of {{ totalSets }}
          </div>
          <div 
            :class="[
              'text-6xl font-bold mb-4',
              isMobile ? 'text-white' : 'text-green-600'
            ]"
          >
            {{ timeRemaining }}s
          </div>
          <div :class="['w-full rounded-full h-4 overflow-hidden', isMobile ? 'bg-white/20' : 'bg-gray-200']">
            <div
              :class="['h-4 transition-all duration-1000 ease-linear', isMobile ? 'bg-white' : 'bg-green-600']"
              :style="{ width: `${(timeRemaining / setDuration) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- Current Cue Display - Colors (for color-call drill) -->
        <div v-if="showsColors && currentCue" class="mt-6">
          <div class="w-64 h-64 mx-auto rounded-3xl shadow-2xl flex items-center justify-center transform transition-all duration-300 animate-pulse-scale"
               :style="{ 
                 backgroundColor: currentCue.value === 'red' ? '#ef4444' : 
                                 currentCue.value === 'blue' ? '#3b82f6' : 
                                 currentCue.value === 'green' ? '#10b981' : 
                                 currentCue.value === 'yellow' ? '#fbbf24' : '#6b7280'
               }">
            <div class="text-white text-6xl font-black uppercase tracking-wider drop-shadow-lg">
              {{ currentCue.text }}
            </div>
          </div>
        </div>
        
        <!-- Current Cue Display (only for other audio cue drills) -->
        <div v-else-if="usesAudioCues && currentCue && !showsColors" class="mt-6 p-8 bg-primary-50 rounded-lg">
          <div class="text-6xl mb-4">{{ currentCue.icon }}</div>
          <div class="text-3xl font-bold text-primary-900">
            {{ currentCue.text }}
          </div>
        </div>
        
        <!-- Training Message for non-audio drills -->
        <div v-else-if="!usesAudioCues" class="mt-6 p-6 bg-green-50 border-2 border-green-200 rounded-lg">
          <p class="text-lg font-semibold text-green-900">💪 Keep Going!</p>
          <p class="text-sm text-green-700 mt-2">Focus on proper form and intensity</p>
        </div>
      </div>

      <!-- Rest Period Display -->
      <div v-else-if="trainingStatus === 'rest'" class="text-center">
        <div 
          :class="[
            'text-lg font-semibold mb-2',
            isMobile ? 'text-white' : 'text-gray-700'
          ]"
        >
          Rest Period
        </div>
        <div 
          :class="[
            'text-6xl font-bold mb-4',
            isMobile ? 'text-white' : 'text-yellow-600'
          ]"
        >
          {{ timeRemaining }}s
        </div>
        <p :class="['text-xl', isMobile ? 'text-white' : 'text-gray-600']">Next set starting soon...</p>
      </div>

      <!-- Completed Display -->
      <div v-else-if="trainingStatus === 'completed'" class="text-center">
        <div class="text-6xl mb-4">🎉</div>
        <div 
          :class="[
            'text-3xl font-bold mb-2',
            isMobile ? 'text-white' : 'text-green-600'
          ]"
        >
          Training Complete!
        </div>
        <p 
          :class="[
            'text-xl mb-6',
            isMobile ? 'text-white' : 'text-gray-600'
          ]"
        >
          Great job! You completed all {{ totalSets }} sets.
        </p>
      </div>

      <!-- Control Buttons During Training -->
      <div class="flex justify-center gap-4 mt-6">
        <button
          v-if="trainingStatus === 'active' || trainingStatus === 'rest'"
          @click="pauseTraining"
          :class="[
            'px-6 py-3 rounded-lg font-semibold transition-colors',
            isMobile ? 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm' : 'btn-secondary'
          ]"
        >
          ⏸️ Pause
        </button>
        <button
          @click="stopTraining"
          :class="[
            'px-6 py-3 rounded-lg font-semibold transition-colors',
            isMobile ? 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm' : 'bg-red-500 hover:bg-red-600 text-white'
          ]"
        >
          ⏹️ Stop Training
        </button>
      </div>
    </div>

    <!-- Start Training Button -->
    <div v-else class="text-center">
      <div class="text-6xl mb-4">{{ drill?.icon || '🧠' }}</div>
      <h3 class="text-xl font-bold text-indigo-900 mb-3">
        {{ drill?.name || 'Ready to Train?' }}
      </h3>
      <p class="text-gray-600 mb-6">
        <template v-if="usesAudioCues">
          This drill uses <strong>audio cues</strong>. Make sure your volume is turned up!
        </template>
        <template v-else>
          Follow the drill instructions and complete each set with focus and intensity.
        </template>
      </p>

      <!-- Key Instructions -->
      <div v-if="drill" class="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6 text-left">
        <h4 class="font-semibold text-primary-900 mb-2 text-sm">📋 Quick Reminder:</h4>
        <ul class="text-sm text-primary-800 space-y-1">
          <li v-for="(instruction, idx) in drill.instructions.slice(0, 3)" :key="idx" class="flex items-start">
            <span class="mr-2">•</span>
            <span>{{ instruction }}</span>
          </li>
        </ul>
      </div>

      <button
        @click="startTraining"
        class="btn-primary bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-4 w-full"
      >
        🎯 Begin Training
      </button>
      
      <!-- Settings Preview -->
      <div class="mt-6 p-4 bg-white/50 rounded-lg text-left">
        <h3 class="font-semibold text-indigo-900 mb-3">Training Plan:</h3>
        <div class="grid grid-cols-2 gap-3 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-600">Sets:</span>
            <span class="font-medium text-gray-900">{{ totalSets }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Per Set:</span>
            <span class="font-medium text-gray-900">{{ setDuration }}s</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Rest:</span>
            <span class="font-medium text-gray-900">{{ restDuration }}s</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Total:</span>
            <span class="font-medium text-gray-900">~{{ Math.ceil((totalSets * setDuration + (totalSets - 1) * restDuration) / 60) }} min</span>
          </div>
        </div>
        <div v-if="usesAudioCues" class="mt-3 pt-3 border-t border-gray-200">
          <p class="text-xs text-gray-600">
            <span class="font-semibold">🔊 Audio cues:</span> Numbers (1-4) and directions (Left, Right, Forward, Backward)
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDrillStore } from '~/stores/drillStore';

type TrainingStatus = 'idle' | 'countdown' | 'active' | 'rest' | 'completed';
type CueType = 'number' | 'direction';

interface Cue {
  type: CueType;
  value: string;
  text: string;
  icon: string;
}

const props = defineProps<{
  drillId: string;
}>();

const emit = defineEmits<{
  completed: [];
}>();

// Get drill data from store
const drillStore = useDrillStore();
const drill = computed(() => drillStore.drills.find(d => d.id === props.drillId));

// Check if this drill uses audio cues
const usesAudioCues = computed(() => {
  return props.drillId === 'touch-or-turn-audio-cue' || 
         props.drillId === 'color-call' ||
         props.drillId === 'scan-and-react';
});

// Check if this drill shows colors
const showsColors = computed(() => {
  return props.drillId === 'color-call';
});

// Training configuration - adapt based on drill
const totalSets = computed(() => {
  // Most drills have 3 sets, but can customize based on drill
  return 3;
});

const setDuration = computed(() => {
  // Use drill duration if available, otherwise default to 30 seconds per set
  if (drill.value) {
    return Math.floor((drill.value.duration * 60) / totalSets.value);
  }
  return 30;
});

const restDuration = 30; // seconds
const countdownDuration = 3; // seconds
const cueIntervalMs = 2000; // milliseconds between cues

// Detect mobile device
const isMobile = ref(false);

// State
const trainingStatus = ref<TrainingStatus>('idle');
const currentSet = ref(0);
const timeRemaining = ref(0);
const countdownValue = ref(0);
const currentCue = ref<Cue | null>(null);

let trainingInterval: ReturnType<typeof setInterval> | null = null;
let cueIntervalHandle: ReturnType<typeof setInterval> | null = null;
let synth: SpeechSynthesis | null = null;

// Initialize speech synthesis and detect mobile
onMounted(() => {
  if (typeof window !== 'undefined') {
    if ('speechSynthesis' in window) {
      synth = window.speechSynthesis;
    }
    // Detect mobile device
    isMobile.value = window.innerWidth < 768;
    
    // Update on resize
    const handleResize = () => {
      isMobile.value = window.innerWidth < 768;
    };
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });
  }
});

// Cleanup on unmount
onUnmounted(() => {
  stopTraining();
});

// Possible cues
const numberCues: Cue[] = [
  { type: 'number', value: '1', text: 'ONE', icon: '1️⃣' },
  { type: 'number', value: '2', text: 'TWO', icon: '2️⃣' },
  { type: 'number', value: '3', text: 'THREE', icon: '3️⃣' },
  { type: 'number', value: '4', text: 'FOUR', icon: '4️⃣' },
];

const directionCues: Cue[] = [
  { type: 'direction', value: 'left', text: 'LEFT', icon: '⬅️' },
  { type: 'direction', value: 'right', text: 'RIGHT', icon: '➡️' },
  { type: 'direction', value: 'forward', text: 'FORWARD', icon: '⬆️' },
  { type: 'direction', value: 'backward', text: 'BACKWARD', icon: '⬇️' },
];

const colorCues: Cue[] = [
  { type: 'number', value: 'red', text: 'RED', icon: '🔴' },
  { type: 'number', value: 'blue', text: 'BLUE', icon: '🔵' },
  { type: 'number', value: 'green', text: 'GREEN', icon: '🟢' },
  { type: 'number', value: 'yellow', text: 'YELLOW', icon: '🟡' },
];

// Speech synthesis function
const speak = (text: string, rate: number = 1.0) => {
  if (!synth) return;
  
  // Cancel any ongoing speech
  synth.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;
  
  synth.speak(utterance);
};

// Get random cue
const getRandomCue = (): Cue => {
  // For color-call drill, only return color cues
  if (showsColors.value) {
    const index = Math.floor(Math.random() * colorCues.length);
    return colorCues[index]!;
  }
  
  // For other drills: 50/50 chance of number or direction
  const useNumber = Math.random() < 0.5;
  
  if (useNumber) {
    const index = Math.floor(Math.random() * numberCues.length);
    return numberCues[index]!;
  } else {
    const index = Math.floor(Math.random() * directionCues.length);
    return directionCues[index]!;
  }
};

// Play random cue
const playRandomCue = () => {
  const cue = getRandomCue();
  currentCue.value = cue;
  speak(cue.text, 1.2); // Slightly faster speech
};

// Start countdown
const startCountdown = () => {
  trainingStatus.value = 'countdown';
  countdownValue.value = countdownDuration;
  
  // Speak the initial countdown value immediately
  speak(countdownValue.value.toString(), 1.0);
  
  const countdownInterval = setInterval(() => {
    countdownValue.value--;
    
    if (countdownValue.value > 0) {
      speak(countdownValue.value.toString(), 1.0);
    } else {
      speak('GO!', 1.2);
      clearInterval(countdownInterval);
      
      // Start first set after "GO!"
      setTimeout(() => {
        startSet();
      }, 1000);
    }
  }, 1000);
};

// Start a training set
const startSet = () => {
  currentSet.value++;
  trainingStatus.value = 'active';
  timeRemaining.value = setDuration.value;
  currentCue.value = null;
  
  // Start the timer
  trainingInterval = setInterval(() => {
    timeRemaining.value--;
    
    if (timeRemaining.value <= 0) {
      endSet();
    }
  }, 1000);
  
  // Start playing random cues ONLY for drills that use them
  if (usesAudioCues.value) {
    playRandomCue(); // Play first cue immediately
    cueIntervalHandle = setInterval(() => {
      playRandomCue();
    }, cueIntervalMs);
  } else {
    // For non-audio cue drills, just announce the set
    speak('Set ' + currentSet.value, 1.0);
  }
};

// End current set
const endSet = () => {
  if (trainingInterval) clearInterval(trainingInterval);
  if (cueIntervalHandle) clearInterval(cueIntervalHandle);
  
  currentCue.value = null;
  
  if (currentSet.value >= totalSets.value) {
    // Training complete
    completeTraining();
  } else {
    // Start rest period
    startRest();
  }
};

// Start rest period
const startRest = () => {
  trainingStatus.value = 'rest';
  timeRemaining.value = restDuration;
  
  speak('Rest', 1.0);
  
  trainingInterval = setInterval(() => {
    timeRemaining.value--;
    
    // Countdown last 3 seconds
    if (timeRemaining.value <= 3 && timeRemaining.value > 0) {
      speak(timeRemaining.value.toString(), 1.0);
    }
    
    if (timeRemaining.value <= 0) {
      if (trainingInterval) clearInterval(trainingInterval);
      speak('GO!', 1.2);
      setTimeout(() => {
        startSet();
      }, 1000);
    }
  }, 1000);
};

// Complete training
const completeTraining = () => {
  trainingStatus.value = 'completed';
  speak('Training complete! Great job!', 1.0);
  emit('completed');
};

// Start training
const startTraining = () => {
  currentSet.value = 0;
  startCountdown();
};

// Pause training
const pauseTraining = () => {
  if (trainingInterval) clearInterval(trainingInterval);
  if (cueIntervalHandle) clearInterval(cueIntervalHandle);
  if (synth) synth.cancel();
  
  // For now, just stop (we can add resume later)
  alert('Training paused. Click "Stop Training" to reset.');
};

// Stop training
const stopTraining = () => {
  if (trainingInterval) clearInterval(trainingInterval);
  if (cueIntervalHandle) clearInterval(cueIntervalHandle);
  if (synth) synth.cancel();
  
  trainingStatus.value = 'idle';
  currentSet.value = 0;
  timeRemaining.value = 0;
  currentCue.value = null;
};
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.animate-pulse {
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse-scale {
  0% { 
    transform: scale(0.95);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  }
  50% { 
    transform: scale(1.05);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }
  100% { 
    transform: scale(0.95);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  }
}

.animate-pulse-scale {
  animation: pulse-scale 1.5s ease-in-out infinite;
}
</style>

