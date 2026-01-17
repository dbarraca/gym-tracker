import { useState, useEffect, useCallback } from "react";
import PageHeader from "../layout/PageHeader";
import { NavLink } from "react-router";
import { useParams } from "react-router-dom";
import Sets from "./Sets";
import Reps from "./Reps";
import supabase from "../../supabase";
import Loading from "../common/loading";

const Routine = () => {
  const [routine, setRoutine] = useState();
  const [routineExercises, setRoutineExercises] = useState();
  const [exercises, setExercises] = useState([]);
  const [exerciseToAdd, setExerciseToAdd] = useState();

  const { routineId } = useParams();

  useEffect(() => {
    const fetchRoutine = async () => {
      const { data, error } = await supabase
        .from("routines")
        .select("*")
        .eq("id", routineId)
        .maybeSingle();
      if (data) {
        setRoutine(data);
      }
    };
    fetchRoutine();

    const fetchExercises = async () => {
      const { data, error } = await supabase.from("exercises").select("*");
      if (data) {
        setExercises(data);
      }
    };

    fetchExercises();
  }, []);

  useEffect(() => {
    const fetchRoutineExercises = async () => {
      if (routine?.id) {
        const { data } = await supabase
          // .from("exercises")
          // .select(
          //   "id, name, routine_exercises (id, routine_id, exercise_id, exercise_type_id, order)"
          // )
          // .eq("routine_exercises.routine_id", routine?.id)
          .from("routine_exercises")
          .select(
            "id, routine_id, exercise_id, exercise_type_id, sets, reps, time, done, order, exercises (name)"
          )
          .eq("routine_id", routine?.id)
          .order("order");
        if (data) {
          setRoutineExercises(data);
        }
      }
    };
    fetchRoutineExercises();
  }, [routine]);

  const addExerciseToRoutine = async () => {
    console.log('addExerciseToRoutine');
    if (routine && exerciseToAdd) {
      const exercise = {
        routine_id: routine.id,
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
        .from("routine_exercises")
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

  const removeExercise = async (routineExerciseId) => {
    // if (routine && routineExerciseId) {
    //   await fetch(`${trackerUrl}/routine_exercises/${routineExerciseId}`, {
    //     method: "DELETE",
    //   });
    // }
  };

  const sortExercise = (exerciseA, exerciseB) => {
    return exerciseB.order - exerciseA.order;
  };

  const backToRoutines = (
    <NavLink
    to={`/routines`}
    className="p-1 text-blue-600 text-3xl absolute left-0"
    >
      &#8249;
    </NavLink>
  );

  return routine ? (
    <>
      <div className="w-full">
        <PageHeader title="Edit Routine" leftBtn={backToRoutines}/>
        <h2 className="text-xl px-2 py-3">{routine.name}</h2>
        {exercises ? 
          routineExercises?.sort(sortExercise)?.map((routineExercise) => (
            <div key={routineExercise.id} className="flex w-full items-center odd:bg-gray-100 p-2">
              <div
                onClick={() => removeExercise(routineExercise.id)}
                className="p-1 mr-5 hover:bg-gray-200 rounded-md"
              >
                X
              </div>
              <h2 className="py-1 flex-1">
                {
                  exercises?.find(
                    (exercise) => exercise.id === routineExercise.exercise_id
                  )?.name
                }
              </h2>
              {routineExercise.exercise_type_id === 1 ? (
                <>
                  <Sets routineExerciseCurrent={routineExercise} />
                  <Reps routineExerciseCurrent={routineExercise} />
                </>
              ) : null}
            </div>
          )): <Loading />
        }
      </div>
      <div className="w-full flex flex-row">
        <select
          className="flex-1 mr-5"
          onChange={(e) => handleExerciseChange(e)}
        >
          <option value="">Add an exercise</option>
          {exercises.map((exercise) => (
            <option key={exercise.id} value={exercise.id}>
              {exercise.name}
            </option>
          ))}
        </select>
        <button onClick={addExerciseToRoutine}>+</button>
      </div>
    </>
  ) : (
    // <Loading />
    null
  )
};

export default Routine;
