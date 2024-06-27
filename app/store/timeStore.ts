// TODO: version actuelle
import { create } from "zustand";
import { TimeUnit } from "../types/types";

export type Timer = {
  hours: string;
  minutes: string;
  seconds: string;
  timeLeft: number;
  isRunning: boolean;
  id: string;
};

export type TimeState = {
  inputHours: string;
  inputMinutes: string;
  inputSeconds: string;
  timers: Timer[];
  // timer: Timer | null;
  setInputTime: (unit: TimeUnit, value: string) => void;
  createTimer: (id: string) => void;
  startTimer: (id: string) => void;
  stopTimer: (id: string) => void;
  tick: (id: string) => void;
  resetTimer: (id: string) => void;
  deleteTimer: (id: string) => void;
  setTimeLeft: (id: string, value: number) => void;
};

export const useTimeStore = create<TimeState>((set) => ({
  inputHours: "00",
  inputMinutes: "00",
  inputSeconds: "00",
  timers: [],
  setInputTime: (unit, value) =>
    set({ [`input${unit.charAt(0).toUpperCase() + unit.slice(1)}`]: value }),

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
        },
      ],
      inputHours: "00",
      inputMinutes: "00",
      inputSeconds: "00",
    })),

  // createTimer: () =>
  //   set((state) => {
  //     if (state.timer) return state; // Ne rien faire si un timer existe déjà
  //     return {
  //       timer: {
  //         hours: state.inputHours,
  //         minutes: state.inputMinutes,
  //         seconds: state.inputSeconds,
  //         timeLeft:
  //           parseInt(state.inputHours) * 3600 +
  //           parseInt(state.inputMinutes) * 60 +
  //           parseInt(state.inputSeconds),
  //         isRunning: false,
  //       },
  //       inputHours: "00",
  //       inputMinutes: "00",
  //       inputSeconds: "00",
  //     };
  //   }),

  // startTimer: () =>
  //   set((state) => ({
  //     timer: state.timer ? { ...state.timer, isRunning: true } : null,
  //   })),
  // stopTimer: () =>
  //   set((state) => ({
  //     timer: state.timer ? { ...state.timer, isRunning: false } : null,
  //   })),

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
          const newTimeLeft = timer.timeLeft - 1;
          return {
            ...timer,
            timeLeft: newTimeLeft,
            hours: Math.floor(newTimeLeft / 3600)
              .toString()
              .padStart(2, "0"),
            minutes: Math.floor((newTimeLeft % 3600) / 60)
              .toString()
              .padStart(2, "0"),
            seconds: (newTimeLeft % 60).toString().padStart(2, "0"),
          };
        }
        return timer;
      }),
    })),

  // tick: () =>
  //   set((state) => {
  //     if (state.timer && state.timer.isRunning && state.timer.timeLeft > 0) {
  //       const newTimeLeft = state.timer.timeLeft - 1;
  //       return {
  //         timer: {
  //           ...state.timer,
  //           timeLeft: newTimeLeft,
  //           hours: Math.floor(newTimeLeft / 3600)
  //             .toString()
  //             .padStart(2, "0"),
  //           minutes: Math.floor((newTimeLeft % 3600) / 60)
  //             .toString()
  //             .padStart(2, "0"),
  //           seconds: (newTimeLeft % 60).toString().padStart(2, "0"),
  //         },
  //       };
  //     }
  //     return state;
  //   }),

  // setTimeLeft: (value: number) =>
  //   set((state) => ({
  //     timer: state.timer ? { ...state.timer, timeLeft: value } : null,
  //   })),

  setTimeLeft: (id: string, value: number) =>
    set((state) => ({
      timers: state.timers.map((timer) =>
        timer.id === id ? { ...timer, timeLeft: value } : timer
      ),
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
  //   resetTimer: () =>
  //     set((state) => ({
  //       timer: state.timer
  //         ? {
  //             ...state.timer,
  //             timeLeft:
  //               parseInt(state.timer.hours) * 3600 +
  //               parseInt(state.timer.minutes) * 60 +
  //               parseInt(state.timer.seconds),
  //             isRunning: false,
  //           }
  //         : null,
  //     })),
  //   deleteTimer: () => set({ timer: null }),
}));

// TODO: version précédente
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
