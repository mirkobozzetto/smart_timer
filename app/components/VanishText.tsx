import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const VanishText = () => {
  return (
    <div className="mb-12 px-4 w-2/3 text-5xl text-center">
      <h3 className="font-medium text-violet-400">
        Smart Timer
        <AnimatedText
          phrases={[
            "Make Your Dreams Come True !",
            "Create your custom smart timer",
            "Press Enter to Create a Timer",
            "You Can Rename Your Timer",
            "You Can Delete Your Timer",
            "All Your Timers Are Saved",
            "What are you waiting for ?",
            "Let's Go !",
          ]}
        />
      </h3>
    </div>
  );
};

const ONE_SECOND = 1000;
const WAIT_TIME = ONE_SECOND * 2;

const AnimatedText = ({ phrases }: { phrases: string[] }) => {
  const [active, setActive] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAnimationComplete) return;

    const intervalRef = setInterval(() => {
      setActive((pv) => {
        const nextIndex = pv + 1;
        if (nextIndex === phrases.length - 1) {
          setIsAnimationComplete(true);
          clearInterval(intervalRef);
        }
        return nextIndex % phrases.length;
      });
    }, WAIT_TIME);

    return () => clearInterval(intervalRef);
  }, [phrases, isAnimationComplete]);

  useEffect(() => {
    if (isAnimationComplete) {
      const timeoutId = setTimeout(() => {
        setIsAnimationComplete(false);
        setActive(0);
      }, WAIT_TIME * 5);

      return () => clearTimeout(timeoutId);
    }
  }, [isAnimationComplete]);

  return (
    <div className="relative mt-2 mb-14 w-full">
      {phrases.map((phrase, index) => {
        const isActive = active === index;
        return (
          <motion.div
            key={phrase}
            initial={false}
            animate={isActive ? "active" : "inactive"}
            style={{
              x: "-50%",
            }}
            variants={{
              active: {
                opacity: 1,
                scale: 1,
              },
              inactive: {
                opacity: 0,
                scale: 0,
              },
            }}
            className="top-0 left-1/2 absolute w-full text-violet-100 text-xl"
          >
            {phrase}
          </motion.div>
        );
      })}
    </div>
  );
};
