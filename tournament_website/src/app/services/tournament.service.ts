import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Tournament } from '../models/tournament.model';

@Injectable({ providedIn: 'root' })
export class TournamentService {
  private tournaments: Tournament[] = [];

  constructor(private http: HttpClient) {}

  getTournaments(): Observable<Tournament[]> {
    return this.http.get<any[]>('http://localhost:3000/api/tournaments').pipe(
      map((rawList) => rawList.map((raw) => this.mapToTournament(raw))),
      map((tournaments) => {
        this.tournaments = tournaments; // store locally
        return tournaments;
      })
    );
  }

  getTournamentList(): Tournament[] {
    return this.tournaments;
  }

  getTournamentById(id: number): Tournament | undefined {
    return this.tournaments.find((t) => t.id === id);
  }

  private mapToTournament(raw: any): Tournament {
    const t = raw.tournament || raw;

    return {
      id: t.id,
      name: t.name,
      category: t.category ?? 'N/A',
      entryFee: parseFloat(t.registration_fee) || 0,
      prizePool: 0,
      createdAt: t.created_at,
      registeredParticipants: t.participants_count || 0,
      teams: (t.teams || []).map((team: any) => ({
        member1: team.member1 ?? '',
        member2: team.member2 ?? '',
      })),
      startTime: t.start_at ?? new Date(),
      description: t.description ?? '',
    };
  }

  //get participants
  getParticipants(tournamentId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `http://localhost:3000/api/tournament/${tournamentId}/participants`
    );
  }

  // get matches
  getMatches(tournamentId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `http://localhost:3000/api/tournament/${tournamentId}/matches`
    );
  }
}
