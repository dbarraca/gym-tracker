export interface Workout {
    id: number;
    name: string;
    created_at: string
};

export interface Exercise {
    id: string;
    name: string;
};

export interface WorkoutExercise {
    id: string;
    workout_id: string,
    exercise_id: string,
    exercise_type_id: number 
    sets: number,
    reps: number,
    time: number,
    done: false,
    order: 1
};