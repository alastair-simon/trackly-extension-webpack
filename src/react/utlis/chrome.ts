// Get current tab info
export const getTab = async (): Promise<any> => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
};

// Get mix name from tab
export const getMixName = async (
  tabId: number,
  tabUrl: "soundcloud" | "youtube"
): Promise<string | undefined> => {
  if (!tabId) return undefined;
  const response = await chrome.tabs.sendMessage(tabId, {
    greeting: tabUrl,
  });
  if (!response) return undefined;
  return response;
};
