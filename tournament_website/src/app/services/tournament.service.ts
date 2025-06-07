import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Tournament } from '../models/tournament.model';
import { Match, MatchesByGroup, Participant } from '../models/match.model';

@Injectable({ providedIn: 'root' })
export class TournamentService {
  private tournaments: Tournament[] = [];
  public participants: Participant[] = [];
  private matches: Match[] = [];

  constructor(private http: HttpClient) {}

  getTournaments(): Observable<Tournament[]> {
    return this.http.get<any[]>('http://localhost:3000/api/tournaments').pipe(
      map((rawList) => rawList.map((raw) => this.mapToTournament(raw))),
      map((tournaments) => {
        this.tournaments = tournaments;
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

  // get participants
  private mapToParticipant(raw: any): Participant {
    return {
      id: raw.id,
      name: raw.name,
      seed: raw.seed,
      group_player_ids: raw.group_player_ids,
    };
  }

  getParticipants(tournamentId: number): Observable<Participant[]> {
    return this.http
      .get<any[]>(
        `http://localhost:3000/api/tournament/${tournamentId}/participants`
      )
      .pipe(
        map((res) => {
          const participants = res.map((item) =>
            this.mapToParticipant(item.participant)
          );
          this.participants = participants;
          return participants;
        })
      );
  }

  getParticipantById(pid: number): Participant | undefined {
    return (
      this.participants.find((p) => p.group_player_ids[0] === pid) ?? undefined
    );
  }

  // get matches
  private mapToMatch(raw: any): Match {
    return {
      id: raw.id,
      player1_id: raw.player1_id,
      player2_id: raw.player2_id,
      winner_id: raw.winner_id,
      round: raw.round,
      group_id: raw.group_id,
      scores_csv: raw.scores_csv,
      identifier: raw.identifier,
    };
  }

  getMatches(tournamentId: number): Observable<Match[]> {
    return this.http
      .get<any[]>(
        `http://localhost:3000/api/tournament/${tournamentId}/matches`
      )
      .pipe(
        map((res) => {
          const matches = res.map((item) => this.mapToMatch(item.match));
          this.matches = matches;
          return matches;
        })
      );
  }

  // for grouping matches
  groupMatchesByGroupAndRound(matches: Match[]): MatchesByGroup {
    const grouped: MatchesByGroup = {};

    matches.forEach((match) => {
      if (!grouped[match.group_id]) {
        grouped[match.group_id] = {};
      }
      if (!grouped[match.group_id][match.round]) {
        grouped[match.group_id][match.round] = [];
      }
      grouped[match.group_id][match.round].push(match);
    });

    return grouped;
  }
}
