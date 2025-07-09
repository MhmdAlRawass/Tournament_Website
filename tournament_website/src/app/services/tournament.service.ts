import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { Tournament } from '../models/tournament.model';
import { Match, MatchesByGroup, Participant } from '../models/match.model';

@Injectable({ providedIn: 'root' })
export class TournamentService {
  private baseUrl = 'https://padelhive-node.onrender.com/api';

  private tournaments: Tournament[] = [];
  private tournamentCache = new Map<number, Tournament>();
  private matchesCache = new Map<number, Match[]>();
  private participantsCache = new Map<number, Participant[]>();
  private statsCache = new Map<number, any[]>();

  private participantsStat: any[] = [];

  private matchesSubject = new BehaviorSubject<Match[]>([]);
  matches$ = this.matchesSubject.asObservable();

  private participantsSubject = new BehaviorSubject<Participant[]>([]);
  participants$ = this.participantsSubject.asObservable();

  private statsSubject = new BehaviorSubject<any[]>([]);
  stats$ = this.statsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getTournaments(): Observable<Tournament[]> {
    if (this.tournaments.length) return of(this.tournaments);

    return this.http.get<any[]>(`${this.baseUrl}/tournaments`).pipe(
      map((rawList) => rawList.map((raw) => this.mapToTournament(raw))),
      map((tournaments) => {
        this.tournaments = tournaments;
        tournaments.forEach((t) => this.tournamentCache.set(t.id, t));
        return tournaments;
      })
    );
  }

  getTournamentList(): Tournament[] {
    return this.tournaments;
  }

  getTournamentById(id: number): Tournament | undefined {
    return this.tournamentCache.get(id);
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

  fetchMatches(tid: number): Observable<Match[]> {
    if (this.matchesCache.has(tid)) {
      const cached = this.matchesCache.get(tid)!;
      this.matchesSubject.next(cached);
      return of(cached);
    }

    return this.http
      .get<any[]>(`${this.baseUrl}/tournament/${tid}/matches`)
      .pipe(
        map((res) => res.map((item) => this.mapToMatch(item.match))),
        map((matches) => {
          this.matchesCache.set(tid, matches);
          this.matchesSubject.next(matches);
          return matches;
        })
      );
  }

  fetchParticipants(tid: number): Observable<Participant[]> {
    if (this.participantsCache.has(tid)) {
      const cached = this.participantsCache.get(tid)!;
      this.participantsSubject.next(cached);
      return of(cached);
    }

    return this.http
      .get<any[]>(`${this.baseUrl}/tournament/${tid}/participants`)
      .pipe(
        map((res) =>
          res.map((item) => this.mapToParticipant(item.participant))
        ),
        map((participants) => {
          this.participantsCache.set(tid, participants);
          this.participantsSubject.next(participants);
          return participants;
        })
      );
  }

  fetchStats(tid: number): Observable<any[]> {
    if (this.statsCache.has(tid)) {
      const cached = this.statsCache.get(tid)!;
      this.statsSubject.next(cached);
      return of(cached);
    }

    return this.http
      .get<any[]>(`${this.baseUrl}/tournament/${tid}/group-standings`)
      .pipe(
        map((res) => {
          this.statsCache.set(tid, res);
          this.statsSubject.next(res);
          return res;
        })
      );
  }

  private mapToParticipant(raw: any): Participant {
    return {
      id: raw.id,
      name: raw.name,
      seed: raw.seed,
      group_player_ids: raw.group_player_ids,
      group_id: raw.group_id,
    };
  }

  getParticipants(tournamentId: number): Observable<Participant[]> {
    if (this.participantsCache.has(tournamentId)) {
      return of(this.participantsCache.get(tournamentId)!);
    }

    return this.http
      .get<any[]>(`${this.baseUrl}/tournament/${tournamentId}/participants`)
      .pipe(
        map((res) => {
          const participants = res.map((item) =>
            this.mapToParticipant(item.participant)
          );
          this.participantsCache.set(tournamentId, participants);
          return participants;
        })
      );
  }

  getParticipantById(pid: number): Participant | undefined {
    return Array.from(this.participantsCache.values())
      .flat()
      .find((p) => p.group_player_ids[0] === pid);
  }

  getParticipantByIdForFinalStage(pid: number): Participant | undefined {
    return Array.from(this.participantsCache.values())
      .flat()
      .find((p) => p.id === pid);
  }

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
    if (this.matchesCache.has(tournamentId)) {
      return of(this.matchesCache.get(tournamentId)!);
    }

    return this.http
      .get<any[]>(`${this.baseUrl}/tournament/${tournamentId}/matches`)
      .pipe(
        map((res) => {
          const matches = res.map((item) => this.mapToMatch(item.match));
          this.matchesCache.set(tournamentId, matches);
          return matches;
        })
      );
  }

  groupMatchesByGroupAndRound(matches: Match[]): MatchesByGroup {
    const grouped: MatchesByGroup = {};

    matches.forEach((match) => {
      if (!grouped[match.group_id]) grouped[match.group_id] = {};
      if (!grouped[match.group_id][match.round])
        grouped[match.group_id][match.round] = [];
      grouped[match.group_id][match.round].push(match);
    });

    return grouped;
  }

  getParticipantsStat(tid: number): Observable<any[]> {
    if (this.statsCache.has(tid)) {
      return of(this.statsCache.get(tid)!);
    }

    return this.http
      .get<any[]>(`${this.baseUrl}/tournament/${tid}/group-standings`)
      .pipe(
        map((res) => {
          this.statsCache.set(tid, res);
          this.participantsStat = res;
          return res;
        })
      );
  }

  getParticipantStatById(pid: number) {
    return this.participantsStat.find((p) => pid === p.group_player_ids[0]);
  }
}
