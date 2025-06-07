// import { Injectable } from '@angular/core';
// import { Tournament } from './tournament.model'; // Adjust path as needed

// @Injectable({
//   providedIn: 'root',
// })
// export class TournamentService {
//   private tournaments: Tournament[] = [
//     // {
//     //   id: 1,
//     //   name: 'Corporate Cup 2024',
//     //   category: 'A',
//     //   entryFee: 10,
//     //   prizePool: 100,
//     //   createdAt: '2024-07-01',
//     //   teams: [
//     //     { member1: 'Alice', member2: 'Bob' },
//     //     { member1: 'Carol', member2: 'Dave' },
//     //   ],
//     // },
//     // {
//     //   id: 2,
//     //   name: 'Winter League',
//     //   category: 'B',
//     //   entryFee: 20,
//     //   prizePool: 200,
//     //   createdAt: '2024-12-01',
//     //   teams: [],
//     // },
//   ];

//   getTournamentById(id: number): Tournament | null {
//     return this.tournaments.find((t) => t.id === id) || null;
//   }

//   getAllTournaments(): Tournament[] {
//     return this.tournaments;
//   }
// }
