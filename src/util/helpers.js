export const randomNum = (min, max, exclude = []) => {
  let output = Math.floor(Math.random() * (max - min + 1)) + min;
  while (exclude.includes(output)) {
    output = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return output;
};

export const getRandomArrayMembers = (array, num) => {
  const arrayCopy = [...array];
  const outputArray = [];
  for (let i = 0; i < num; i++) {
    const randomIndex = randomNum(0, arrayCopy.length - 1);
    const item = arrayCopy.splice(randomIndex, 1);
    outputArray.push(...item);
  }
  return outputArray;
};