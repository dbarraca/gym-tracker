import supabase from '../supabase';

export default async function handler(req, res) {
  const { data } = await supabase.from("workouts").select();
  res.status(200).json({ data});
}
