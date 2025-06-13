import { Component, Input, OnInit } from '@angular/core';
import { ParticipantStat } from '../../../../models/match.model';
import { TournamentService } from '../../../../services/tournament.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tournament-detail-matches',
  imports: [CommonModule],
  templateUrl: './tournament-detail-matches.component.html',
  styleUrl: './tournament-detail-matches.component.css',
})
export class TournamentDetailMatchesComponent implements OnInit {
  @Input() tournament: any;
  @Input() groupedStats!: { [groupId: string]: ParticipantStat[] };

  objectKeys = Object.keys;

  constructor(private tournamentService: TournamentService) {}

  ngOnInit(): void {
    this.tournamentService.getParticipantsStat(this.tournament.id).subscribe({
      next: (data) => {
        this.groupedStats = this.groupByGroupId(data);
      },
    });
  }

  // to sort participants by groupId
  groupByGroupId(stats: ParticipantStat[]): {
    [groupId: string]: ParticipantStat[];
  } {
    const grouped: {
      [groupId: string]: ParticipantStat[];
    } = {};

    stats.forEach((stat) => {
      if (!grouped[stat.group_id]) {
        grouped[stat.group_id] = [];
      }
      grouped[stat.group_id].push(stat);
    });
    return grouped;
  }

  getCustomGroupLabel(index: number): string {
    return 'Group ' + String.fromCharCode(65 + index);
  }
}
