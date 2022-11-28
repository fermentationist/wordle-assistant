export const getRemainingWords = (possibleWords, filterMap) => {
  const remaining = possibleWords.filter(word => {
    for (const c in filterMap) {
      const filters = filterMap[c];
      const char = c.toLowerCase();
      const expectedNum = filters.filter(f => f.color === "yellow" || f.color === "green").length;
      const regex = new RegExp(char, "g");
      const actualNum = (word.match(regex) || []).length;
      if (expectedNum > actualNum) {
        return false;
      }
      for (const filter of filters) {
        if (filter.color === "green") {
          if (word[filter.index] !== char) {
            return false;
          }
        } else if (filter.color === "yellow") {
          if (!word.includes(char) || word[filter.index] === char) {
            return false;
          }
        } else { // filter.color === "gray"
          if (word[filter.index] === char || (expectedNum === 0 && word.includes(char))) {
            return false;
          }
        }
      }
    }
    return true;
  });
  return remaining;
}