"use client";

import { useState } from "react";
import TimePicker from "./TimePicker";

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  return (
    <main className="flex flex-col justify-between items-center p-24 min-h-screen">
      <TimePicker
        startTimer={startTimer}
        stopTimer={stopTimer}
        isRunning={isRunning}
      />
    </main>
  );
}
