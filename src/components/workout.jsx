import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Sets from "./sets";
import Reps from "./reps";
import supabase from "../supabase";

const Workout = () => {
  const [workout, setWorkout] = useState();
  const [workoutExercises, setWorkoutExercises] = useState();
  const [exercises, setExercises] = useState([]);
  const [exerciseToAdd, setExerciseToAdd] = useState();

  const { workoutId } = useParams();

  useEffect(() => {
    const fetchWorkout = async () => {
      const { data, error } = await supabase
        .from("workouts")
        .select("*")
        .eq("id", workoutId)
        .maybeSingle();
      if (data) {
        setWorkout(data);
      }
    };
    fetchWorkout();

    const fetchExercises = async () => {
      const { data, error } = await supabase.from("exercises").select("*");
      if (data) {
        setExercises(data);
      }
    };

    fetchExercises();
  }, []);

  useEffect(() => {
    const fetchWorkoutExercises = async () => {
      if (workout?.id) {
        const { data } = await supabase
          // .from("exercises")
          // .select(
          //   "id, name, workout_exercises (id, workout_id, exercise_id, exercise_type_id, order)"
          // )
          // .eq("workout_exercises.workout_id", workout?.id)
          .from("workout_exercises")
          .select(
            "id, workout_id, exercise_id, exercise_type_id, sets, reps, time, done, order, exercises (name)"
          )
          .eq("workout_id", workout?.id)
          .order("order");
        if (data) {
          setWorkoutExercises(data);
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
      const { error } = await supabase
        .from("workout_exercises")
        .insert(exercise);

      if (error) {
        console.error(error);
      }
    }
  };

  const handleExerciseChange = useCallback(
    (e) => {
      if (e?.target?.value && exercises) {
        const id = e.target.value;
        const exercise = exercises.find((exer) => exer.id === parseInt(id));
        if (exercise) {
          setExerciseToAdd(exercise);
        }
      }
    },
    [exercises]
  );

  const removeExercise = async (workoutExerciseId) => {
    // if (workout && workoutExerciseId) {
    //   await fetch(`${trackerUrl}/workout_exercises/${workoutExerciseId}`, {
    //     method: "DELETE",
    //   });
    // }
  };

  const sortExercise = (exerciseA, exerciseB) => {
    return exerciseB.order - exerciseA.order;
  };

  return workout ? (
    <div className="text-left h-full md:min-w-sm flex flex-col items-start md:justify-center ">
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
          <option value="" />
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
