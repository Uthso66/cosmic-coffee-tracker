import { supabase } from "./lib/supabase";
import CoffeeLogger from "./components/CoffeeLogger";
import GalaxyViewer from "./components/GalaxyViewer";

export default async function Home() {
  const { data: coffees } = await supabase
    .from("coffees")
    .select("*")
    .order("logged_at", { ascending: false });

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Cosmic Coffee Tracker ☕🌌</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Log a Coffee</h2>
          <CoffeeLogger />

          <h2 className="text-2xl font-bold mb-4 mt-8">Recent Coffees</h2>
          <div className="space-y-4">
            {coffees?.map((coffee) => (
              <div key={coffee.id} className="bg-gray-800 p-4 rounded">
                <p>
                  <strong>Type:</strong> {coffee.type}
                </p>
                <p>
                  <strong>Mood:</strong> {coffee.mood}
                </p>
                <p>
                  <strong>Time:</strong>{" "}
                  {new Date(coffee.logged_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-125 border border-gray-700 rounded">
          <GalaxyViewer coffees={coffees || []} />
        </div>
      </div>
    </div>
  );
}
