import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import supabase from "../supabase";

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const {data} = await supabase.from("workouts").select("*");
        if (data) {
          setWorkouts(data);
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="text-left min-w-sm">
      <div className="pb-3">
        <h1>Workouts</h1>
        {workouts.map((workout) => (
          <div key={workout.id}>
            <NavLink
              to={`/workouts/${workout.id}`}
              className="block text-xl rounded-md w-full p-3 text-black hover:bg-gray-50"
            >
              {workout.name}
            </NavLink>
          </div>
        ))}
      </div>
      <NavLink to={`/exercises`}>Exercise List</NavLink>
    </div>
  );
};

export default WorkoutList;
