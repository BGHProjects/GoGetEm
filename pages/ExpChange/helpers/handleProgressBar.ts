// Adjusts calculations based on if the user is level 0
export function accountForLevel0(
  value: number,
  userLevel: number,
  prevLevelExp: number
) {
  if (userLevel > 0) return value - prevLevelExp;
  return value;
}

// Calculates the bar's start and end positions
export const calculateBarPositions = (
  prevExp: number,
  newExp: number,
  nextLevelExp: number,
  userLevel: number,
  prevLevelExp: number
) => {
  // If the user is starting from 0, make the initial 0
  const initial =
    prevExp === 0
      ? 0
      : (accountForLevel0(prevExp, userLevel, prevLevelExp) /
          accountForLevel0(nextLevelExp, userLevel, prevLevelExp)) *
        100;

  // If the newExp is more than the nextLevelExp, the bar will be filled 100%
  const end =
    nextLevelExp > newExp
      ? (accountForLevel0(newExp, userLevel, prevLevelExp) /
          accountForLevel0(nextLevelExp, userLevel, prevLevelExp)) *
        100
      : 100;

  return { initialBarLength: initial, endBarLength: end };
};
