import { useState } from "react";
import { WorkoutExercise } from "../types/workout";
import { trackerUrl } from "../backend";

const Reps = ({
  workoutExerciseCurrent,
}: {
  workoutExerciseCurrent: WorkoutExercise;
}) => {
  const [editing, setEditing] = useState(false);
  const [reps, setReps] = useState(workoutExerciseCurrent.reps);

  const updateReps = async () => {
    const workoutExercise = { ...workoutExerciseCurrent, reps };
    const updatedWorkoutExercise = await fetch(
      `${trackerUrl}/workout_exercises/${workoutExerciseCurrent.id}`,
      { method: "PUT", body: JSON.stringify(workoutExercise) }
    );
    if (updatedWorkoutExercise) {
      setEditing(false);
      console.log("updatedWorkoutExercise", updatedWorkoutExercise);
    }
  };

  const handleRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newReps = e?.target?.value;
    if (newReps) {
      const newRepsNum = parseInt(newReps);
      setReps(newRepsNum);
    }
  };

  return editing ? (
    <input
      className="rounded-sm p-1 my-1 w-10"
      type="text"
      onBlur={updateReps}
      onChange={(e) => handleRepsChange(e)}
      value={reps}
    />
  ) : (
    <div
      className="p-2 hover:bg-gray-50 rounded-sm p-1 my-1 w-10"
      onClick={() => setEditing(true)}
    >
      {reps}
    </div>
  );
};

export default Reps;
