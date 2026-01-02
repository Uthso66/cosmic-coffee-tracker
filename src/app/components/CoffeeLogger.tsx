"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function CoffeeLogger() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    </div>
  );
}
