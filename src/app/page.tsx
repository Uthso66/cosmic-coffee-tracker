// page.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import CoffeeLogger from "./components/CoffeeLogger";
import GalaxyViewer from "./components/GalaxyViewer";

interface Coffee {
  id: string;
  type: string;
  mood: string;
  logged_at: string;
}

export default function Home() {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchCoffees() {
      const { data, error } = await supabase
        .from("coffees")
        .select("*")
        .order("logged_at", { ascending: false });

      if (!error && data && isMounted) {
        setCoffees(data);
      }
      if (isMounted) {
        setLoading(false);
      }
    }

    fetchCoffees();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async (id: string) => {
    setCoffees((prev) => prev.filter((coffee) => coffee.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white p-8 flex items-center justify-center">
        <div className="text-2xl">Loading your coffee galaxy... ☕</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white p-8">
      <h1 className="text-4xl font-bold mb-2">Cosmic Coffee Tracker ☕🌌</h1>
      <p className="text-gray-400 mb-8">
        Click stars in the galaxy to delete them with an explosion!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <CoffeeLogger coffees={coffees} onDelete={handleDelete} />
        </div>

        <div className="h-125 border border-gray-700 rounded">
          <GalaxyViewer coffees={coffees} onStarDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}
