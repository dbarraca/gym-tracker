import { useState } from "react";

const Reps = ({ routineExerciseCurrent }) => {
  const [editing, setEditing] = useState(false);
  const [reps, setReps] = useState(routineExerciseCurrent.reps);

  const updateReps = async () => {
    // const routineExercise = { ...routineExerciseCurrent, reps };
    // const updatedRoutineExercise = await fetch(
    //   `${trackerUrl}/routine_exercises/${routineExerciseCurrent.id}`,
    //   { method: "PUT", body: JSON.stringify(routineExercise) }
    // );
    // if (updatedRoutineExercise) {
    //   setEditing(false);
    //   console.log("updatedRoutineExercise", updatedRoutineExercise);
    // }
  };

  const handleRepsChange = (e) => {
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
      className="p-1 hover:bg-gray-200 rounded-sm p-1 my-1 w-10"
      onClick={() => setEditing(true)}
    >
      {reps}
    </div>
  );
};

export default Reps;
