"use client";

import TimePicker from "./components/TimePicker";
import TimerContainer from "./components/TimerContainer";

export default function Home() {
  return (
    <main className="flex flex-col justify-between items-center p-24 min-h-screen">
      <TimePicker />
      <TimerContainer />
    </main>
  );
}
