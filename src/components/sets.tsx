import { useState } from "react";
import { WorkoutExercise } from "../types/workout";

const Sets = ({
  workoutExerciseCurrent,
}: {
  workoutExerciseCurrent: WorkoutExercise;
}) => {
  const [editing, setEditing] = useState(false);
  const [sets, setSets] = useState(workoutExerciseCurrent.sets);

  const updateSets = async () => {
    const workoutExercise = { ...workoutExerciseCurrent, sets };
    const updatedWorkoutExercise = await fetch(
      `${trackerUrl}/workout_exercises/${workoutExerciseCurrent.id}`,
      { method: "PUT", body: JSON.stringify(workoutExercise) }
    );
    if (updatedWorkoutExercise) {
      setEditing(false);
      console.log("updatedWorkoutExercise", updatedWorkoutExercise);
    }
  };

  const handleSetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSets = e?.target?.value;
    if (newSets) {
      const newSetsNum = parseInt(newSets);
      setSets(newSetsNum);
    }
  };

  return editing ? (
    <input
      className="rounded-sm p-1 my-1 w-10"
      type="text"
      onBlur={updateSets}
      onChange={(e) => handleSetsChange(e)}
      value={sets}
    />
  ) : (
    <div
      className="p-2 hover:bg-gray-50 rounded-sm p-1 my-1 w-10"
      onClick={() => setEditing(true)}
    >
      {sets}
    </div>
  );
};

export default Sets;
