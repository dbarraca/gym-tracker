import { useState } from "react";

const ExerciseItem = ({ exerciseCurrent }) => {
  const [editing, setEditing] = useState(false);
  const [exercise, setExercise] = useState(exerciseCurrent);

  const updateName = async () => {
    // const updatedExercise = await fetch(
    //   `${trackerUrl}/exercises/${exercise.id}`,
    //   { method: "PUT", body: JSON.stringify(exercise) }
    // );
    // if (updatedExercise) {
    //   console.log("updatedExercise", updatedExercise);
    // }
  };

  const handleNameChange = (updatedExercise) => {
    const newName = e?.target?.value;
    console.log("newName", newName);
    setExercise({ ...exercise, name: newName });
  };

  return editing ? (
    <input
      className="w-full py-1"
      type="text"
      onBlur={updateName}
      onChange={(e) => handleNameChange(e)}
      value={exercise.name}
    />
  ) : (
    <h2
      className="w-full text-left hover:bg-gray-50 rounded-sm p-1 my-1"
      onClick={() => setEditing(true)}
    >
      {exercise.name}
    </h2>
  );
};

export default ExerciseItem;
