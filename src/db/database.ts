import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("workout.db");

export async function dbMigration() {
  try {
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS workouts (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   date TEXT)`,
    );

    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS exercises (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  workoutId INTEGER, 
  name TEXT,
  gifUrl TEXT,
  bodyParts TEXT,
  equipments TEXT,
  instructions TEXT,
  targetMuscles TEXT,
  secondaryMuscles TEXT,
  FOREIGN KEY(workoutId) REFERENCES workouts(id))`,
    );

    console.log("Database tables created successfully");
  } catch (error) {
    console.error("Database migration error:", error);
    throw error;
  }
}
