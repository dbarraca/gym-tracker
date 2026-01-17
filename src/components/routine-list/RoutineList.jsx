import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import PageHeader from "../layout/PageHeader";
import supabase from "../../supabase";

const RoutineList = () => {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const {data} = await supabase.from("routines").select("*");
        if (data) {
          setRoutines(data);
        }
      } catch (error) {
        console.error("Error fetching routines:", error);
      }
    };

    fetchRoutines();
  }, []);

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <div>
        <PageHeader title="Rountines" />
        {routines.map((routine) => (
            <div key={routine.id}>
            <NavLink
              to={`/routines/${routine.id}`}
              className="block text-l w-full p-4 hover:bg-gray-100 border-b-1 border-gray-200 hover:rounded-sm w-full"
            >
              {routine.name}
            </NavLink>
          </div>
        ))}
      </div>
      <NavLink className="self-center p-2" to={`/exercises`}>Exercise List</NavLink>
      </div>
  );
};

export default RoutineList;
