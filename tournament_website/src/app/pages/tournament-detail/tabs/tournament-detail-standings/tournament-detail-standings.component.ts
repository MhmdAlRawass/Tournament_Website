import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ParticipantStat,
  Participant,
  Match,
} from '../../../../models/match.model';
import { TournamentService } from '../../../../services/tournament.service';

@Component({
  selector: 'app-tournament-detail-standings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tournament-detail-standings.component.html',
  styleUrl: './tournament-detail-standings.component.css',
})
export class TournamentDetailStandingsComponent implements OnInit, OnChanges {
  @Input() tournament: any;
  @Input() groupedStats: { [groupId: string]: ParticipantStat[] };
  sortedGroupedStats: { [groupId: string]: ParticipantStat[] } = {};

  selectedGroup: string;

  objectKeys = Object.keys;

  constructor(private tournamentService: TournamentService) {}

  ngOnInit(): void {
    this.sortedGroupedStats = this.getSortedGroupStat(this.groupedStats);
    this.selectedGroup = this.objectKeys(this.groupedStats)[0];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['groupedStats'] && this.groupedStats) {
      this.sortedGroupedStats = this.getSortedGroupStat(this.groupedStats);

      const groupIds = this.objectKeys(this.sortedGroupedStats);
      if (!this.selectedGroup || !groupIds.includes(this.selectedGroup)) {
        this.selectedGroup = groupIds.length > 0 ? groupIds[0] : '';
      }
    }
  }

  selectGroup(id: string) {
    this.selectedGroup = id;
  }

  getSortedGroupStat(groupedStats: { [groupId: string]: ParticipantStat[] }): {
    [groupId: string]: ParticipantStat[];
  } {
    const sortedGroupedStats: { [groupId: string]: ParticipantStat[] } = {};

    Object.keys(groupedStats).forEach((groupId) => {
      sortedGroupedStats[groupId] = [...groupedStats[groupId]].sort((a, b) => {
        const aWins = a.history?.filter((h: string) => h === 'W').length || 0;
        const bWins = b.history?.filter((h: string) => h === 'W').length || 0;

        if (bWins !== aWins) {
          return bWins - aWins; // more wins first
        } else if (b.totalScore !== a.totalScore) {
          return b.totalScore - a.totalScore; // higher totalScore first
        } else {
          return (b.match_diffs || 0) - (a.match_diffs || 0); // higher match diffs first
        }
      });
    });

    return sortedGroupedStats;
  }

  getCustomGroupLabel(index: number): string {
    return 'Group ' + String.fromCharCode(65 + index);
  }

  getMatchDiff(wins: number, loses: number): any {
    return wins - loses;
  }
}
