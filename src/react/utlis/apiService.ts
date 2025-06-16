// fetch a tracklist with a given query
export const fetchTracklist = async (searchQuery: string) => {
  console.log("fetch started...");

  const apiUrl = process.env.API_URL;
  const formattedUrl = searchQuery.split(" ").join("-").toLowerCase();
  console.log("formatted title: ", formattedUrl);

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

// warm up the server
export const warmServer = async () => {
  const apiUrl = process.env.API_URL;
  const url = `${apiUrl}/api/warmup`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
