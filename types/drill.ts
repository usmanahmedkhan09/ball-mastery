export type DrillCategory = 'passing' | 'shooting' | 'dribbling' | 'agility' | 'technical' | 'smallSided' | 'cognitive';

export type DrillDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'pro';

export type DrillSection = 'fitness' | 'intelligence' | 'agility' | 'soccer';

export type CueType = 'colors' | 'arrows' | 'numbers' | 'audio';

export interface DrillConfig
{
    id: string;
    name: string;
    category: DrillCategory;
    difficulty: DrillDifficulty;
    section?: DrillSection; // For cognitive drills: fitness, intelligence, agility, soccer
    description: string;
    instructions: string[];
    icon: string;
    color: string;
    duration: number; // in minutes for field drills
    playersNeeded: string; // e.g., "1-2", "3-5", "6+"
    spaceRequired: string; // e.g., "10x10m", "Half pitch"
    videoUrl?: string; // YouTube video ID
    equipment: string[]; // List of required equipment
    keyPoints: string[]; // Important coaching points
    progressions?: string[]; // Ways to make it harder
    benefits?: string[]; // What players will gain from this drill
    cueType?: CueType[]; // Types of cues to display during training (colors, arrows, numbers, audio)
    audioForCues?: CueType[]; // Which specific cue types should have audio (e.g., ['arrows'] means only arrows speak, not colors/numbers)
    completed?: boolean; // Track completion
}

export interface DrillCompletion
{
    drillId: string;
    completedAt: Date;
    notes?: string;
    rating?: number; // 1-5 stars
}

export interface UserStats
{
    totalDrillsCompleted: number;
    completionsByCategory: Record<string, number>;
    recentCompletions: DrillCompletion[];
    favoriteDrillIds: string[];
}
