import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoutineList from "./routine-list/RoutineList";
import Routine from "./routine/Routine";
import ExerciseList from "./exercise-list/ExerciseList";

const Routing = () => (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoutineList />} />
        <Route path="/routines" element={<RoutineList />} />
        <Route path="/routines/:routineId" element={<Routine />} />
        <Route path="/exercises" element={<ExerciseList />} />
      </Routes>
    </BrowserRouter>
);

export default Routing;
