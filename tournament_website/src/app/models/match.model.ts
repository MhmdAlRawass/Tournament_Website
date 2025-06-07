export interface Match {
  id: number;
  player1_id: number;
  player2_id: number;
  winner_id: number;
  round: number;
  group_id: number;
  scores_csv: string;
  identifier: string;
}

export interface Participant {
  id: number;
  group_player_ids: number[];
  name: string;
  seed: number;
}

export interface MatchesByGroup {
  [groupId: string]: {
    [round: number]: Match[];
  };
}
