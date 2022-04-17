export const handleTimeLimit = (increment: number, timeLimit: number) => {
  const increaseOptions: Record<number, number> = {
    30: 1,
    60: 1.05,
    90: 1.1,
    120: 1.15,
    150: 1.2,
    180: 1.25,
    210: 1.3,
    240: 1.35,
    270: 1.4,
    300: 1.45,
  };

  increment *= increaseOptions[timeLimit];
  return increment;
};
