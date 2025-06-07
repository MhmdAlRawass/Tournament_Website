export interface Team {
  member1: string;
  member2: string;
}

export interface Tournament {
  id: number;
  name: string;
  category: string;
  entryFee: number;
  prizePool: number;
  createdAt: Date;
  startTime: Date;
  teams: Team[];
  registeredParticipants: number;
  description?: string;
}

// export interface Participant {
//   id: number;
//   name: string;
// }
