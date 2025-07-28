// Save the new query to localStorage (avoid duplicates, limit to 5)
export const saveQueryToLocalStorage = (query: string) => {
  const existing = JSON.parse(localStorage.getItem("recentQueries") || "[]");
  const updated = [query, ...existing.filter((q: string) => q !== query)].slice(0, 5);
  localStorage.setItem("recentQueries", JSON.stringify(updated));
};

// Fetch saved queries from localStorage
export const getQueriesFromLocalStorage = (): string[] => {
  return JSON.parse(localStorage.getItem("recentQueries") || "[]");
};
