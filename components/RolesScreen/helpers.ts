export const convertTime = (timeLimit: number) => {
  let time: string;
  if (timeLimit / 60 < 1) {
    time = "0";
  } else {
    time = Math.floor(timeLimit / 60).toString();
  }

  if (timeLimit % 60 === 0) {
    time = time + ":00";
  } else {
    time = time + ":30";
  }

  return time;
};
