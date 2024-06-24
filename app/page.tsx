"use client";

import TimePicker from "./TimePicker";

export default function Home() {
  return (
    <main className="flex flex-col justify-between items-center p-24 min-h-screen">
      {/* <NumericInput /> */}
      <TimePicker />
    </main>
  );
}
