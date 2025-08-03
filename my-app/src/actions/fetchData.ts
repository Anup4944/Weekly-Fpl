import type { FPLApiResponse } from "@/types/types";

export default async function fetchFplData() {
  try {
    const response = await fetch(`http://localhost:3001/api/fpl`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: FPLApiResponse = await response.json();

    console.log("standing data", data.standings.results);
    const info = data.new_entries.results;
    return info;
  } catch (error) {
    console.error("Error fetching FPL data:", error);
    throw error;
  }
}
