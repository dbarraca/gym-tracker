import { useState, useEffect } from "react";
import ExerciseItem from "./exercise-item";
import supabase from "../../supabase";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    // ToDo: Refactor to use api service later if valuable
    const fetchExercises = async () => {
      try {
        const { data } = await supabase.from("exercises").select("*");
        console.log("data", data);
        if (data) {
          setExercises(data);
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchExercises();
  }, []);

  const addExercise = async () => {
    // const exerciseToAdd = {
    //   name: "Exercise",
    // };
    // const addedExercise = await fetch(`${trackerUrl}/exercises`, {
    //   method: "POST",
    //   body: JSON.stringify(exerciseToAdd),
    // });
    // if (addedExercise) {
    //   console.log("addedExercise");
    // }
  };

  return exercises ? (
    <div className="min-w-sm">
      <h1 className="text-left">Exercises</h1>
      <div className="pb-3">
        {exercises.map((exercise) => (
          <div key={exercise.id}>
            <ExerciseItem exerciseCurrent={exercise} />
          </div>
        ))}
      </div>
      <button onClick={addExercise} className="bg-blue-500 w-full">
        + Add Exercise Item
      </button>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Exercises;
