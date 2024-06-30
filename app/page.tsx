"use client";

import dynamic from "next/dynamic";
import TimePicker from "./components/TimePicker";
import { VanishText } from "./components/VanishText";

const TimerContainer = dynamic(() => import("./components/TimerContainer"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex flex-col justify-between items-center pt-4">
      <VanishText />
      <TimePicker />
      <TimerContainer />
    </main>
  );
}
