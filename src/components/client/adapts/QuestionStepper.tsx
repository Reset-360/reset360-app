'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Direction = 1 | -1;

interface QuestionStepperProps {
  index: number;              // currentQuestion index from Zustand
  direction: Direction;       // 1 for next, -1 for previous
  children: React.ReactNode;  // your list of QuestionSlide components
}

const variants = {
  enter: (direction: Direction) => ({
    x: direction === 1 ? 40 : -40,
    opacity: 0,
    position: 'absolute' as const,
  }),
  center: {
    x: 0,
    opacity: 1,
    position: 'relative' as const,
  },
  exit: (direction: Direction) => ({
    x: direction === 1 ? -40 : 40,
    opacity: 0,
    position: 'absolute' as const,
  }),
};

export const QuestionStepper: React.FC<QuestionStepperProps> = ({
  index,
  direction,
  children,
}) => {
  const items = React.Children.toArray(children);
  const current = items[index];

  if (!current) {
    return null;
  }

  return (
    <div className="relative w-full">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.25 }}
          className="w-full"
        >
          {current}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
