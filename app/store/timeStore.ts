import { create } from "zustand";

interface TimeState {
  hours: string;
  minutes: string;
  seconds: string;
  isRunning: boolean;
  timeLeft: number;
  setHours: (hours: string) => void;
  setMinutes: (minutes: string) => void;
  setSeconds: (seconds: string) => void;
  startTimer: () => void;
  stopTimer: () => void;
  tick: () => void;
}

export const useTimeStore = create<TimeState>((set) => ({
  hours: "00",
  minutes: "00",
  seconds: "00",
  isRunning: false,
  timeLeft: 0,
  setHours: (hours) => set({ hours }),
  setMinutes: (minutes) => set({ minutes }),
  setSeconds: (seconds) => set({ seconds }),
  startTimer: () =>
    set((state) => {
      const totalSeconds =
        parseInt(state.hours) * 3600 +
        parseInt(state.minutes) * 60 +
        parseInt(state.seconds);
      return { isRunning: true, timeLeft: totalSeconds };
    }),
  stopTimer: () => set({ isRunning: false }),
  tick: () =>
    set((state) => {
      if (state.timeLeft <= 1) {
        return { isRunning: false, timeLeft: 0 };
      }
      return { timeLeft: state.timeLeft - 1 };
    }),
}));
