import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("workout.db");

// Types
export interface Workout {
  id?: number;
  date: string;
}

export interface Exercise {
  id?: number;
  workoutId: number;
  name: string;
  gifUrl: string;
  bodyParts: string;
  equipments: string;
  instructions: string;
  targetMuscles: string;
  secondaryMuscles: string;
}

// ===== WORKOUT CRUD OPERATIONS =====

/**
 * Create a new workout
 */
export const createWorkout = (date: string): number => {
  const result = db.runSync("INSERT INTO workouts (date) VALUES (?)", [date]);
  return result.lastInsertRowId;
};

/**
 * Get a workout by ID
 */
export const getWorkoutById = (id: number): Workout | null => {
  const result = db.getFirstSync<Workout>(
    "SELECT * FROM workouts WHERE id = ?",
    [id],
  );
  return result || null;
};

/**
 * Get all workouts
 */
export const getAllWorkouts = (): Promise<Workout[]> => {
  return db.getAllAsync<Workout>("SELECT * FROM workouts ORDER BY date DESC");
};

/**
 * Update a workout
 */
export const updateWorkout = (id: number, date: string): boolean => {
  const result = db.runSync("UPDATE workouts SET date = ? WHERE id = ?", [
    date,
    id,
  ]);
  return result.changes > 0;
};

/**
 * Delete a workout (and cascade delete its exercises)
 */
export const deleteWorkout = (id: number): boolean => {
  // First delete associated exercises
  db.runSync("DELETE FROM exercises WHERE workoutId = ?", [id]);
  // Then delete the workout
  const result = db.runSync("DELETE FROM workouts WHERE id = ?", [id]);
  return result.changes > 0;
};

// ===== EXERCISE CRUD OPERATIONS =====

/**
 * Create a new exercise
 */
export const createExercise = (exercise: Omit<Exercise, "id">): number => {
  const result = db.runSync(
    `INSERT INTO exercises (workoutId, name, gifUrl, bodyParts, equipments, instructions, targetMuscles, secondaryMuscles) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      exercise.workoutId,
      exercise.name,
      exercise.gifUrl,
      exercise.bodyParts,
      exercise.equipments,
      exercise.instructions,
      exercise.targetMuscles,
      exercise.secondaryMuscles,
    ],
  );
  return result.lastInsertRowId;
};

/**
 * Get an exercise by ID
 */
export const getExerciseById = (id: number): Exercise | null => {
  const result = db.getFirstSync<Exercise>(
    "SELECT * FROM exercises WHERE id = ?",
    [id],
  );
  return result || null;
};

/**
 * Get all exercises for a specific workout
 */
export const getExercisesByWorkoutId = (workoutId: number): Exercise[] => {
  const result = db.getAllSync<Exercise>(
    "SELECT * FROM exercises WHERE workoutId = ?",
    [workoutId],
  );
  return result;
};

/**
 * Get all exercises
 */
export const getAllExercises = (): Exercise[] => {
  const result = db.getAllSync<Exercise>("SELECT * FROM exercises");
  return result;
};

/**
 * Update an exercise
 */
export const updateExercise = (
  id: number,
  exercise: Omit<Exercise, "id">,
): boolean => {
  const result = db.runSync(
    `UPDATE exercises 
     SET workoutId = ?, name = ?, gifUrl = ?, bodyParts = ?, equipments = ?, 
         instructions = ?, targetMuscles = ?, secondaryMuscles = ? 
     WHERE id = ?`,
    [
      exercise.workoutId,
      exercise.name,
      exercise.gifUrl,
      exercise.bodyParts,
      exercise.equipments,
      exercise.instructions,
      exercise.targetMuscles,
      exercise.secondaryMuscles,
      id,
    ],
  );
  return result.changes > 0;
};

/**
 * Delete an exercise
 */
export const deleteExercise = (id: number): boolean => {
  const result = db.runSync("DELETE FROM exercises WHERE id = ?", [id]);
  return result.changes > 0;
};

// ===== ADDITIONAL UTILITY FUNCTIONS =====

/**
 * Get workout with all its exercises
 */
export const getWorkoutWithExercises = (
  workoutId: number,
): { workout: Workout | null; exercises: Exercise[] } => {
  const workout = getWorkoutById(workoutId);
  const exercises = workout ? getExercisesByWorkoutId(workoutId) : [];
  return { workout, exercises };
};

/**
 * Delete all workouts and exercises (use with caution)
 */
export const clearAllData = (): void => {
  db.runSync("DELETE FROM exercises");
  db.runSync("DELETE FROM workouts");
};
