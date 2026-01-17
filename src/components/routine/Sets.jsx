import { useState } from "react";

const Sets = ({ routineExerciseCurrent }) => {
  const [editing, setEditing] = useState(false);
  const [sets, setSets] = useState(routineExerciseCurrent.sets);

  const updateSets = async () => {
    // const routineExercise = { ...routineExerciseCurrent, sets };
    // const updatedRoutineExercise = await fetch(
    //   `${trackerUrl}/routine_exercises/${routineExerciseCurrent.id}`,
    //   { method: "PUT", body: JSON.stringify(routineExercise) }
    // );
    // if (updatedRoutineExercise) {
    //   setEditing(false);
    //   console.log("updatedRoutineExercise", updatedRoutineExercise);
    // }
  };

  const handleSetsChange = (e) => {
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
      className="p-1 hover:bg-gray-200 rounded-sm p-1 my-1 w-10"
      onClick={() => setEditing(true)}
    >
      {sets}
    </div>
  );
};

export default Sets;
