/*
 * Fetches a tracklist with a given query
 */
export const fetchTracklist = async (searchQuery: string) => {
  const apiUrl = process.env.API_URL;
  // format the query to be used in the api
  const formattedUrl = searchQuery.trim().replace(/\s+/g, "-").toLowerCase();

  try {
    const url = `${apiUrl}/api/search/${formattedUrl}`;
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
      return { data, loading: false };
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error(error);
    return { data: [], loading: false };
  }
};

/*
 * Warms up the server after a period of inactivity
 */
export const warmServer = async () => {
  const apiUrl = process.env.API_URL;
  const url = `${apiUrl}/api/warmup`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
