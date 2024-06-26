import { create } from "zustand";
import { TimeUnit } from "../types/types";

interface TimeState {
  hours: string;
  minutes: string;
  seconds: string;
  isRunning: boolean;
  timeLeft: number;
  setTime: (unit: TimeUnit, value: string) => void;
  startTimer: () => void;
  stopTimer: () => void;
  tick: () => void;
  resetTimer: () => void;
  setTimeLeft: (value: number) => void;
  resetAll: () => void; // Nouvelle fonction
}

export const useTimeStore = create<TimeState>((set) => ({
  hours: "00",
  minutes: "00",
  seconds: "00",
  isRunning: false,
  timeLeft: 0,
  setTime: (unit, value) => set({ [unit]: value }),
  startTimer: () => set({ isRunning: true }),
  stopTimer: () => set({ isRunning: false }),
  tick: () =>
    set((state) => {
      if (state.timeLeft <= 1) {
        return { isRunning: false, timeLeft: 0 };
      }
      return { timeLeft: state.timeLeft - 1 };
    }),
  resetTimer: () =>
    set({
      isRunning: false,
      timeLeft: 0,
    }),
  setTimeLeft: (value) => set({ timeLeft: value }),
  resetAll: () =>
    set({
      // Nouvelle fonction
      hours: "00",
      minutes: "00",
      seconds: "00",
      isRunning: false,
      timeLeft: 0,
    }),
}));

// import { create } from "zustand";
// import { TimeUnit } from "../types/types";

// interface TimeState {
//   hours: string;
//   minutes: string;
//   seconds: string;
//   isRunning: boolean;
//   timeLeft: number;
//   setTime: (unit: TimeUnit, value: string) => void;
//   startTimer: () => void;
//   stopTimer: () => void;
//   tick: () => void;
//   resetTimer: () => void;
//   setTimeLeft: (value: number) => void;
// }

// export const useTimeStore = create<TimeState>((set) => ({
//   hours: "00",
//   minutes: "00",
//   seconds: "00",
//   isRunning: false,
//   timeLeft: 0,
//   setTime: (unit, value) => set({ [unit]: value }),
//   startTimer: () => set({ isRunning: true }),
//   stopTimer: () => set({ isRunning: false }),
//   tick: () =>
//     set((state) => {
//       if (state.timeLeft <= 1) {
//         return { isRunning: false, timeLeft: 0 };
//       }
//       return { timeLeft: state.timeLeft - 1 };
//     }),
//   resetTimer: () =>
//     set({
//       hours: "00",
//       minutes: "00",
//       seconds: "00",
//       isRunning: false,
//       timeLeft: 0,
//     }),
//   setTimeLeft: (value) => set({ timeLeft: value }),
// }));
