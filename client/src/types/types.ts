// types/fpl.d.ts or in your component file
export interface FPLApiResponse {
  success: boolean;
  message: string;
  results: {
    new_entries: {
      has_next: boolean;
      page: number;
      results: Array<unknown>;
    };
    last_updated_data: null | string; // Update with actual type if known
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
      results: Array<{
        id: number;
        event_total: number;
        player_name: string;
        rank: number;
        last_rank: number;
        rank_sort: number;
        total: number;
        entry: number;
        entry_name: string;
        has_played: boolean;
      }>; // Replace with specific type if known
    };
  };
}

export interface Manager {
  id: number;
  event_total: number;
  player_name: string;
  rank: number;
  last_rank: number;
  rank_sort: number;
  total: number;
  entry: number;
  entry_name: string;
  has_played: boolean;
}
export type ManagerApiResponse = Manager[];
