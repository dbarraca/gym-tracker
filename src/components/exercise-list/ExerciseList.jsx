import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import PageHeader from "../layout/PageHeader";
import Exercise from "./Exercise";
import supabase from "../../supabase";

const ExerciseList = () => {
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
        console.error("Error fetching routines:", error);
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

  const backToRoutines = (
    <NavLink
    to={`/routines`}
    className="p-1 text-blue-600 text-3xl absolute left-0"
    >
      &#8249;
    </NavLink>
  );

  return exercises ? (
    <div className="w-full pb-3">
      <PageHeader title="All Exercises" leftBtn={backToRoutines} />
      <div className="pb-3">
        {exercises.map((exercise) => (
          <div key={exercise.id}>
            <Exercise exerciseCurrent={exercise} />
          </div>
        ))}
      </div>
      <button onClick={addExercise} className="w-full hover:bg-gray-100">
        + Add Exercise Item
      </button>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default ExerciseList;
