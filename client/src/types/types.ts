// types/fpl.d.ts or in your component file
export interface FPLApiResponse {
  success: boolean;
  message: string;
  results: {
    new_entries: {
      has_next: boolean;
      page: number;
      results: Array<{
        entry: number;
        entry_name: string;
        joined_time: string;
        player_first_name: string;
        player_last_name: string;
      }>;
    };
    last_updated_data: null | boolean; // Update with actual type if known
    league: {
      id: number;
      name: string;
      created: string;
      closed: boolean;
      max_entries: null | number;
      league_type: string;
      scoring: string;
      admin_entry: number;
      start_event: number;
      code_privacy: string;
      has_cup: boolean;
      cup_league: null | boolean; // Replace with specific type if known
      rank: null | number;
    };
    standings: {
      has_next: boolean;
      page: number;
      results: Array<unknown>; // Replace with specific type if known
    };
  };
}

export interface Manager {
  entry: number;
  entry_name: string;
  joined_time: string; // ISO 8601 format datetime string
  player_first_name: string;
  player_last_name: string;
}
export type ManagerApiResponse = Manager[];
