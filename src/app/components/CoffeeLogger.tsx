"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "../lib/supabase";

interface Coffee {
  id: string;
  type: string;
  mood: string;
  logged_at: string;
}

interface CoffeeLoggerProps {
  coffees: Coffee[];
  onDelete: (id: string) => void;
}

export default function CoffeeLogger({ coffees, onDelete }: CoffeeLoggerProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const logCoffee = async (type: string, mood: string) => {
    setLoading(true);
    const { error } = await supabase
      .from("coffees")
      .insert([{ type, mood, caffeine_mg: type === "espresso" ? 64 : 150 }]);

    if (error) {
      alert("Error logging coffee: " + error.message);
    } else {
      router.refresh();
    }
    setLoading(false);
  };

  const deleteCoffee = async (id: string) => {
    setDeletingId(id);

    const { error } = await supabase.from("coffees").delete().eq("id", id);
    if (!error) {
      onDelete(id);
    }
    setDeletingId(null);
  };

  const buttons = [
    { type: "espresso", mood: "productive", emoji: "⚡" },
    { type: "latte", mood: "chill", emoji: "😌" },
    { type: "cold_brew", mood: "creative", emoji: "🎨" },
    { type: "pour_over", mood: "anxious", emoji: "🌀" },
  ];

  return (
    <div className="space-y-4">
      <p className="text-gray-400">Click to log your coffee:</p>
      <div className="grid grid-cols-2 gap-4">
        {buttons.map((btn) => (
          <button
            key={btn.type}
            onClick={() => logCoffee(btn.type, btn.mood)}
            disabled={loading}
            className="bg-gray-800 hover:bg-gray-700 p-4 rounded transition-colors"
          >
            <div className="text-2xl">{btn.emoji}</div>
            <div className="font-bold">{btn.type}</div>
            <div className="text-sm text-gray-400">{btn.mood}</div>
          </button>
        ))}
      </div>

      <div className="space-y-4 mt-8">
        <h3 className="text-xl font-bold">Your Coffee History</h3>
        {coffees.map((coffee) => (
          <div
            key={coffee.id}
            className="bg-gray-800 p-4 rounded flex justify-between items-center"
          >
            <div>
              <p>
                <strong>Type:</strong> {coffee.type}
              </p>
              <p>
                <strong>Mood:</strong> {coffee.mood}
              </p>
              <p className="text-sm text-gray-400">
                {new Date(coffee.logged_at).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => deleteCoffee(coffee.id)}
              disabled={deletingId === coffee.id}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors disabled:opacity-50"
            >
              {deletingId === coffee.id ? "Deleting..." : "🗑️ Delete"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
