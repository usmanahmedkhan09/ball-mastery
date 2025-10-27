<template>
  <!-- Mobile: Full-screen overlay, Desktop: Card -->
  <div 
    :class="[
      trainingStatus !== 'idle' && isMobile 
        ? 'fixed inset-0 z-50 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 flex items-center justify-center overflow-hidden' 
        : 'card bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200'
    ]"
  >
    <!-- Close button for mobile full-screen mode (only during countdown/rest/completed) -->
    <button
      v-if="trainingStatus !== 'idle' && isMobile && trainingStatus !== 'active'"
      @click="stopTraining"
      class="absolute top-4 right-4 z-10 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-all"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>

    <!-- Content wrapper -->
    <div :class="trainingStatus !== 'idle' && isMobile && trainingStatus !== 'active' ? 'w-full max-w-md px-4' : 'w-full'">
      <h2 
        v-if="!(isMobile && trainingStatus === 'active')"
        :class="[
          'text-2xl font-bold mb-4 text-center',
          trainingStatus !== 'idle' && isMobile ? 'text-white' : 'text-indigo-900'
        ]"
      >
        🎯 Interactive Training Mode
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
      <div 
        v-else-if="trainingStatus === 'active'" 
        :class="isMobile ? 'fixed inset-0 flex items-center justify-center' : 'text-center'"
        @click="isMobile ? toggleMobileControls() : null"
      >
        <!-- Mobile: Floating exit button (shows/hides on tap) -->
        <button
          v-if="isMobile && showMobileControls"
          @click.stop="stopTraining"
          class="fixed top-4 right-4 z-50 p-4 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full text-white transition-all shadow-2xl"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <!-- Desktop: Set Details -->
        <div v-if="!isMobile" class="mb-6">
          <div class="text-lg font-semibold mb-2 text-gray-700">
            Set {{ currentSet }} of {{ totalSets }}
          </div>
          <div class="text-6xl font-bold mb-4 text-green-600">
            {{ timeRemaining }}s
          </div>
          <div class="w-full rounded-full h-4 overflow-hidden bg-gray-200">
            <div
              class="h-4 transition-all duration-1000 ease-linear bg-green-600"
              :style="{ width: `${(timeRemaining / setDuration) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- Current Cue Display - Dynamic based on cue type -->
        <div v-if="currentCue">
          <!-- COLOR CUES -->
          <div 
            v-if="isColorCue(currentCue)"
            :class="isMobile ? 'w-screen h-screen flex items-center justify-center' : 'mt-6'"
            :style="isMobile ? { 
              backgroundColor: currentCue.value === 'red' ? '#ef4444' : 
                              currentCue.value === 'blue' ? '#3b82f6' : 
                              currentCue.value === 'green' ? '#10b981' : 
                              currentCue.value === 'yellow' ? '#fbbf24' : '#6b7280'
            } : {}"
          >
            <!-- Desktop: Rounded box -->
            <div 
              v-if="!isMobile"
              class="w-64 h-64 mx-auto rounded-3xl shadow-2xl transform transition-all duration-300 animate-pulse-scale"
              :style="{ 
                backgroundColor: currentCue.value === 'red' ? '#ef4444' : 
                                currentCue.value === 'blue' ? '#3b82f6' : 
                                currentCue.value === 'green' ? '#10b981' : 
                                currentCue.value === 'yellow' ? '#fbbf24' : '#6b7280'
              }"
            >
            </div>
          </div>
          
          <!-- ARROW CUES -->
          <div 
            v-else-if="isArrowCue(currentCue)"
            :class="[
              'flex items-center justify-center',
              isMobile ? 'w-screen h-screen bg-gradient-to-br from-green-400 to-green-600' : 'mt-6'
            ]"
          >
            <div :class="[
              'font-black',
              isMobile ? 'text-[20rem] text-white' : 'text-[15rem] text-green-600'
            ]">
              {{ currentCue.icon }}
            </div>
          </div>
          
          <!-- NUMBER CUES -->
          <div 
            v-else-if="isNumberCue(currentCue)"
            :class="[
              'flex items-center justify-center',
              isMobile ? 'w-screen h-screen bg-gradient-to-br from-indigo-500 to-purple-600' : 'mt-6'
            ]"
          >
            <div :class="[
              'font-black',
              isMobile ? 'text-[20rem] text-white' : 'text-[15rem] text-indigo-600'
            ]">
              {{ currentCue.icon }}
            </div>
          </div>
          
          <!-- DIRECTION CUES (Default fallback) -->
          <div 
            v-else
            :class="[
              'flex flex-col items-center justify-center',
              isMobile ? 'w-screen h-screen bg-gradient-to-br from-indigo-500 to-purple-600' : 'mt-6 p-8 rounded-lg bg-primary-50'
            ]"
          >
            <div :class="[isMobile ? 'text-[15rem]' : 'text-6xl mb-4']">{{ currentCue.icon }}</div>
            <div :class="[
              'font-bold',
              isMobile ? 'text-7xl text-white mt-8' : 'text-3xl text-primary-900'
            ]">
              {{ currentCue.text }}
            </div>
          </div>
        </div>
        
        <!-- Training Message for non-audio drills (Desktop only) -->
        <div v-else-if="!usesAudioCues && !isMobile" class="mt-6 p-6 bg-green-50 border-2 border-green-200 rounded-lg">
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

      <!-- Control Buttons During Training (hidden on mobile during active training) -->
      <div 
        v-if="!(isMobile && trainingStatus === 'active')"
        :class="[
          'flex justify-center gap-4 mt-6'
        ]"
      >
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
            isMobile 
              ? 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
              : 'bg-red-500 hover:bg-red-600 text-white'
          ]"
        >
          ⏹️ Stop Training
        </button>
      </div>
    </div>

    <!-- Start Training Button -->
    <div v-else class="text-center">
      <div class="text-6xl mb-4">{{ drill?.icon || '🎯' }}</div>
      <h3 class="text-xl font-bold text-indigo-900 mb-3">
        {{ drill?.name || 'Ready to Train?' }}
      </h3>
      <p class="text-gray-600 mb-6">
        <template v-if="usesAudioCues">
          This drill uses <strong>visual/audio cues</strong>. Make sure your volume is turned up!
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
        <div v-if="cueTypes.length > 0" class="mt-3 pt-3 border-t border-gray-200">
          <p class="text-xs text-gray-600">
            <span class="font-semibold">🎯 Cue Types:</span> 
            {{ cueTypes.join(', ').toUpperCase() }}
          </p>
        </div>
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

// Get cue types directly from drill data
const cueTypes = computed(() => {
  return drill.value?.cueType || [];
});

// Check if this drill uses audio/visual cues
const usesAudioCues = computed(() => {
  return cueTypes.value.length > 0;
});

// Check if this drill shows colors
const showsColors = computed(() => {
  return cueTypes.value.includes('colors');
});

// Check if this drill shows arrows
const showsArrows = computed(() => {
  return cueTypes.value.includes('arrows');
});

// Check if this drill shows numbers
const showsNumbers = computed(() => {
  return cueTypes.value.includes('numbers');
});

// Check if this drill uses audio (for speaking cues)
const usesAudio = computed(() => {
  return cueTypes.value.includes('audio');
});

// Helper functions to detect cue types based on actual cue
const isColorCue = (cue: Cue): boolean => {
  return ['red', 'green', 'blue', 'yellow'].includes(cue.value);
};

const isArrowCue = (cue: Cue): boolean => {
  return ['up', 'down', 'left', 'right'].includes(cue.value);
};

const isNumberCue = (cue: Cue): boolean => {
  return ['1', '2', '3', '4'].includes(cue.value);
};

// Get which cue types should have audio
const audioForCues = computed(() => {
  return drill.value?.audioForCues || (usesAudio.value ? cueTypes.value : []);
});

// Check if current cue should have audio
const shouldPlayAudio = (cue: Cue): boolean => {
  if (!usesAudio.value) return false;
  
  // If audioForCues is specified, check if this cue type should have audio
  if (drill.value?.audioForCues) {
    if (isColorCue(cue)) return audioForCues.value.includes('colors');
    if (isArrowCue(cue)) return audioForCues.value.includes('arrows');
    if (isNumberCue(cue)) return audioForCues.value.includes('numbers');
    return audioForCues.value.includes('audio'); // For direction cues
  }
  
  // Default: play audio for all cues if 'audio' is in cueType
  return true;
};

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
const showMobileControls = ref(false);

// Toggle mobile controls visibility
const toggleMobileControls = () => {
  showMobileControls.value = !showMobileControls.value;
  
  // Auto-hide after 3 seconds
  if (showMobileControls.value) {
    setTimeout(() => {
      showMobileControls.value = false;
    }, 3000);
  }
};

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
  { type: 'number', value: '1', text: 'ONE', icon: '1' },
  { type: 'number', value: '2', text: 'TWO', icon: '2' },
  { type: 'number', value: '3', text: 'THREE', icon: '3' },
  { type: 'number', value: '4', text: 'FOUR', icon: '4' },
];

const directionCues: Cue[] = [
  { type: 'direction', value: 'left', text: 'LEFT', icon: '←' },
  { type: 'direction', value: 'right', text: 'RIGHT', icon: '→' },
  { type: 'direction', value: 'forward', text: 'FORWARD', icon: '↑' },
  { type: 'direction', value: 'backward', text: 'BACKWARD', icon: '↓' },
];

// Available colors for color drills (randomly selected): Red, Green, Blue, Yellow ONLY
const colorCues: Cue[] = [
  { type: 'number', value: 'red', text: 'RED', icon: '🔴' },
  { type: 'number', value: 'green', text: 'GREEN', icon: '🟢' },
  { type: 'number', value: 'blue', text: 'BLUE', icon: '🔵' },
  { type: 'number', value: 'yellow', text: 'YELLOW', icon: '🟡' },
];

const arrowCues: Cue[] = [
  { type: 'direction', value: 'up', text: 'UP', icon: '↑' },
  { type: 'direction', value: 'down', text: 'DOWN', icon: '↓' },
  { type: 'direction', value: 'left', text: 'LEFT', icon: '←' },
  { type: 'direction', value: 'right', text: 'RIGHT', icon: '→' },
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

// Get random cue based on drill type (only red, green, blue, yellow for colors)
const getRandomCue = (): Cue => {
  const availableCues: Cue[] = [];
  
  // Build available cues based on detected cue types
  if (showsColors.value) {
    // Only these 4 colors: red, green, blue, yellow
    availableCues.push(...colorCues);
  }
  if (showsArrows.value) {
    availableCues.push(...arrowCues);
  }
  if (cueTypes.value.includes('numbers')) {
    availableCues.push(...numberCues);
  }
  
  // If no specific cues detected, use both numbers and directions (default behavior)
  if (availableCues.length === 0) {
    availableCues.push(...numberCues, ...directionCues);
  }
  
  // Return random cue from available options
  const index = Math.floor(Math.random() * availableCues.length);
  return availableCues[index]!;
};

// Play random cue
const playRandomCue = () => {
  const cue = getRandomCue();
  currentCue.value = cue;
  
  // Check if this specific cue should have audio
  if (shouldPlayAudio(cue)) {
    speak(cue.text, 1.2); // Slightly faster speech
  }
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
  showMobileControls.value = false;
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

