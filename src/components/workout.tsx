import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  Workout as WorkoutType,
  WorkoutExercise,
  Exercise,
} from "../types/workout";
import api from "../api";
import Sets from "./sets";
import Reps from "./reps";
import { trackerUrl } from "../backend";

const Workout = () => {
  const [workout, setWorkout] = useState<WorkoutType>();
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exerciseToAdd, setExerciseToAdd] = useState<Exercise>();

  const { workoutId } = useParams();

  useEffect(() => {
    const fetchWorkout = async () => {
      const workoutResponse = await api.get<WorkoutType>(
        `${trackerUrl}/workouts/${workoutId}`
      );
      if (workoutResponse) {
        setWorkout(workoutResponse);
      }
    };
    fetchWorkout();

    const fetchExercises = async () => {
      const exercisesResponse = await api.get<Exercise[]>(
        `${trackerUrl}/exercises`
      );
      if (exercisesResponse) {
        setExercises(exercisesResponse);
      }
    };

    fetchExercises();
  }, []);

  useEffect(() => {
    // ToDo: Refactor to use api service later if valuable
    const fetchWorkoutExercises = async () => {
      if (workout?.id) {
        const workoutExercisesResponse = await api.get<WorkoutExercise[]>(
          `${trackerUrl}/workout_exercises?workout_id=${workout.id}`
        );
        if (workoutExercisesResponse) {
          setWorkoutExercises(workoutExercisesResponse);
        }
      }
    };
    fetchWorkoutExercises();
  }, [workout]);

  const addExerciseToWorkout = async () => {
    if (workout && exerciseToAdd) {
      const exercise = {
        workout_id: workout.id,
        exercise_id: exerciseToAdd.id,
        exercise_type_id: 1,
        sets: 3,
        reps: 10,
        time: 60,
        done: false,
        // Need to update order here
        order: 1,
      };
      await fetch(
        `${trackerUrl}/workout_exercises`,
        { method: "POST", body: JSON.stringify(exercise) }
      );
    }
  };

  const handleExerciseChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (e?.target?.value && exercises) {
        const id = e.target.value;
        const exercise = exercises.find((exer) => exer.id === id.toString());
        if (exercise) {
          setExerciseToAdd(exercise);
        }
      }
    },
    [exercises]
  );

  const removeExercise = async (workoutExerciseId: string) => {
    if (workout && workoutExerciseId) {
      await fetch(
        `${trackerUrl}/workout_exercises/${workoutExerciseId}`,
        { method: "DELETE" }
      );
    }
  };

  const sortExercise = (
    exerciseA: WorkoutExercise,
    exerciseB: WorkoutExercise
  ) => {
    return exerciseB.order - exerciseA.order;
  };

  return workout ? (
    <div className="text-left min-w-sm">
      <h1 className="text-left pb-2">{workout.name}</h1>
      {exercises &&
        workoutExercises?.sort(sortExercise)?.map((workoutExercise) => (
          <div key={workoutExercise.id} className="flex items-center">
            <div
              onClick={() => removeExercise(workoutExercise.id)}
              className="px-1 mr-5 bg-gray-50 hover:bg-gray-200 rounded-md"
            >
              X
            </div>
            <h2 className="text-xl w-full py-3 flex-1">
              {
                exercises?.find(
                  (exercise) => exercise.id === workoutExercise.exercise_id
                )?.name
              }
            </h2>
            {workoutExercise.exercise_type_id === 1 ? (
              <>
                <Sets workoutExerciseCurrent={workoutExercise} />
                <Reps workoutExerciseCurrent={workoutExercise} />
              </>
            ) : null}
          </div>
        ))}
      <div className="w-full flex flex-row">
        <select
          className="flex-1 mr-5"
          onChange={(e) => handleExerciseChange(e)}
        >
          {exercises.map((exercise) => (
            <option key={exercise.id} value={exercise.id}>
              {exercise.name}
            </option>
          ))}
        </select>
        <button onClick={addExerciseToWorkout}>+</button>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Workout;
