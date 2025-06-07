import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import {
  Match,
  MatchesByGroup,
  Participant,
} from '../../../../models/match.model';
import { CommonModule } from '@angular/common';
import { TournamentService } from '../../../../services/tournament.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-tournament-detail-bracket',
  imports: [CommonModule],
  templateUrl: './tournament-detail-bracket.component.html',
  styleUrl: './tournament-detail-bracket.component.css',
})
export class TournamentDetailBracketComponent implements OnInit {
  @Input() tournament: any;

  objectKeys = Object.keys;

  matches: Match[] = [];
  participants: Participant[] = [];
  groupedMatches: MatchesByGroup = {};

  constructor(private tournamentService: TournamentService) {
    console.log('COnstructor loaded');
  }

  ngOnInit(): void {
    if (!this.tournament.id) return;

    // forkJoin for loading both in same time
    forkJoin({
      matches: this.tournamentService.getMatches(this.tournament.id),
      participants: this.tournamentService.getParticipants(this.tournament.id),
    }).subscribe({
      next: ({ matches, participants }) => {
        this.matches = matches;
        this.groupedMatches =
          this.tournamentService.groupMatchesByGroupAndRound(matches);
        console.log(this.groupedMatches);
        this.participants = participants;
      },
      error: (err) => {
        console.error('Error loading data: ', err);
      },
    });

    // this.tournamentService.getMatches(this.tournament.id).subscribe({
    //   next: (matches) => {
    //     this.matches = matches;
    //   },
    //   error: (err) => {
    //     console.log(`Error Occured while loading matches :`, err);
    //   },
    // });

    // this.tournamentService.getParticipants(this.tournament.id).subscribe({
    //   next: (participants) => {
    //     console.log('parti: ' + this.tournamentService.participants);
    //   },
    //   error: (err) => {
    //     console.log('Error in loading participant: ', err);
    //   },
    // });
  }
  getPlayerName(playerId: number): string {
    const participant = this.participants.find(
      (p) => p.group_player_ids[0] === playerId
    );
    return participant ? participant.name : 'Unknown';
  }

  getSortedRounds(groupId: string): number[] {
    return Object.keys(this.groupedMatches[groupId])
      .map(Number)
      .sort((a, b) => a - b);
  }

  getSetScores(scores_csv: string): [string, string][] {
    if (!scores_csv) return [];

    return scores_csv.split(',').map((set) => {
      const [p1, p2] = set.split('-').map((s) => s.trim());
      return [p1 || '0', p2 || '0'];
    });
  }
}
