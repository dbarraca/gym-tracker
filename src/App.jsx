import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorkoutList from "./components/workout-list";
import Workout from "./components/workout";
import Exercises from "./components/exercises";

function App() {
  return (
    <div className="bg-white text-black h-full w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WorkoutList />} />
          <Route path="/workouts" element={<WorkoutList />} />
          <Route path="/workouts/:workoutId" element={<Workout />} />
          <Route path="/exercises" element={<Exercises />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
