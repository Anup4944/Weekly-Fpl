import type { FPLApiResponse } from "@/types/types";
import axios from "axios";

export default async function fetchFplData() {
  try {
    const response = await axios.get("http://localhost:3001/api/fpl");
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: FPLApiResponse = response.data;

    if (!data.success) {
      throw new Error(`API error: ${data.message}`);
    }

    return data;
  } catch (error) {
    console.error("Error fetching FPL data:", error);
    throw error;
  }
}
