// Remove duplicate words from a string
export const removeDuplicateWords = (mixTitleClean: string) => {
  const words = mixTitleClean
    .split(/\s+/)
    .filter(
      (word: string, index: number, arr: string[]) => arr.indexOf(word) === index
    );
  return words.join(" ");
};
