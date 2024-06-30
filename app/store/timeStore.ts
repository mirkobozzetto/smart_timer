import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TimeUnit } from "../types/types";

export type Timer = {
  hours: string;
  minutes: string;
  seconds: string;
  timeLeft: number;
  isRunning: boolean;
  id: string;
  name: string;
};

export type TimeState = {
  inputHours: string;
  inputMinutes: string;
  inputSeconds: string;
  timers: Timer[];
  addTimer: (timer: Timer) => void;
  updateTimer: (id: string, updates: Partial<Timer>) => void;
  setInputTime: (unit: TimeUnit, value: string) => void;
  createTimer: (id: string) => void;
  startTimer: (id: string) => void;
  stopTimer: (id: string) => void;
  tick: (id: string) => void;
  resetTimer: (id: string) => void;
  deleteTimer: (id: string) => void;
  setTimeLeft: (id: string, value: number) => void;
  resetAndStartTimer: (id: string) => void;
  updateTimerName: (id: string, name: string) => void;
};

export const useTimeStore = create(
  persist<TimeState>(
    (set, get) => ({
      inputHours: "00",
      inputMinutes: "00",
      inputSeconds: "00",
      timers: [],
      addTimer: (timer) =>
        set((state) => ({ timers: [...state.timers, timer] })),
      updateTimer: (id: string, updates: Partial<Timer>) =>
        set((state) => ({
          timers: state.timers.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),
      setInputTime: (unit, value) =>
        set({
          [`input${unit.charAt(0).toUpperCase() + unit.slice(1)}`]: value,
        }),
      createTimer: (id) =>
        set((state) => ({
          timers: [
            ...state.timers,
            {
              id: Date.now().toString(),
              hours: state.inputHours,
              minutes: state.inputMinutes,
              seconds: state.inputSeconds,
              timeLeft:
                parseInt(state.inputHours) * 3600 +
                parseInt(state.inputMinutes) * 60 +
                parseInt(state.inputSeconds),
              isRunning: false,
              name: "",
            },
          ],
          inputHours: "00",
          inputMinutes: "00",
          inputSeconds: "00",
        })),
      startTimer: (id) =>
        set((state) => ({
          timers: state.timers.map((timer) =>
            timer.id === id ? { ...timer, isRunning: true } : timer
          ),
        })),
      stopTimer: (id) =>
        set((state) => ({
          timers: state.timers.map((timer) =>
            timer.id === id ? { ...timer, isRunning: false } : timer
          ),
        })),
      tick: (id) =>
        set((state) => ({
          timers: state.timers.map((timer) => {
            if (timer.id === id && timer.isRunning && timer.timeLeft > 0) {
              return {
                ...timer,
                timeLeft: timer.timeLeft - 1,
              };
            }
            return timer;
          }),
        })),
      resetTimer: (id) =>
        set((state) => ({
          timers: state.timers.map((timer) =>
            timer.id === id
              ? {
                  ...timer,
                  timeLeft:
                    parseInt(timer.hours) * 3600 +
                    parseInt(timer.minutes) * 60 +
                    parseInt(timer.seconds),
                  isRunning: false,
                }
              : timer
          ),
        })),
      deleteTimer: (id) =>
        set((state) => ({
          timers: state.timers.filter((timer) => timer.id !== id),
        })),
      setTimeLeft: (id: string, value: number) =>
        set((state) => ({
          timers: state.timers.map((timer) =>
            timer.id === id ? { ...timer, timeLeft: value } : timer
          ),
        })),
      resetAndStartTimer: (id: string) =>
        set((state) => ({
          timers: state.timers.map((timer) =>
            timer.id === id
              ? {
                  ...timer,
                  timeLeft:
                    parseInt(timer.hours) * 3600 +
                    parseInt(timer.minutes) * 60 +
                    parseInt(timer.seconds),
                  isRunning: true,
                }
              : timer
          ),
        })),
      updateTimerName: (id: string, name: string) =>
        set((state) => ({
          timers: state.timers.map((timer) =>
            timer.id === id ? { ...timer, name } : timer
          ),
        })),
    }),
    {
      name: "timer-storage",
      getStorage: () => localStorage,
    }
  )
);

export const useTimerTick = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      const state = useTimeStore.getState();
      state.timers.forEach((timer) => {
        if (timer.isRunning) {
          state.tick(timer.id);
          if (timer.timeLeft <= 0) {
            state.stopTimer(timer.id);
          }
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
};
