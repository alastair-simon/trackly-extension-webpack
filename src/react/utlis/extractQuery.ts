const PLATFORMS = {
  SOUNDCLOUD: "soundcloud",
  YOUTUBE: "youtube",
} as const;

/*
 * Extracts the query from a given tab title
 */
export const extractQuery = (title: string): string | null => {
  if (!title || typeof title !== "string") {
    return null;
  }

  try {
    let querySplit: string;

    if (title.includes(PLATFORMS.SOUNDCLOUD)) {
      // If soundcloud mix split the title by | and take the first part
      querySplit = title.split(" | ")[0].slice(7).trim();
    } else if (title.includes(PLATFORMS.YOUTUBE)) {
      // If youtube mix split the title by - and take the first part
      querySplit = title.split(" - ")[0];
    } else {
      return null;
    }

    // Remove duplicate words and validate final query
    const query = removeDuplicateWords(querySplit);
    return query.length > 0 ? query : null;
  } catch (err) {
    console.error("Error extracting query:", err);
    return null;
  }
};

/*
 * Removes duplicate words from a string
 */
export const removeDuplicateWords = (mixTitleClean: string) => {
  const words = mixTitleClean
    .split(/\s+/)
    .filter(
      (word: string, index: number, arr: string[]) =>
        arr.indexOf(word) === index
    );
  return words.join(" ");
};
