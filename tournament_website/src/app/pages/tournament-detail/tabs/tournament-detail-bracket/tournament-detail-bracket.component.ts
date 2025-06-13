import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  Match,
  MatchesByGroup,
  Participant,
} from '../../../../models/match.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tournament-detail-bracket',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './tournament-detail-bracket.component.html',
  styleUrl: './tournament-detail-bracket.component.css',
})
export class TournamentDetailBracketComponent implements OnInit {
  @Input() tournament: any;
  @Input() matches!: Match[];
  @Input() participants!: Participant[];
  @Input() groupedMatches!: MatchesByGroup;

  @ViewChildren('matchRef') matchRefs!: QueryList<ElementRef>;

  stageTabs: string[] = ['group', 'final'];
  selectedStageTab: string = 'group';

  finalStageAvailable: boolean = false;

  ngOnInit(): void {
    this.finalStageAvailable = this.getFinalStageIds().length > 0;
  }

  changeStageTab(tab: string) {
    this.selectedStageTab = tab;
  }

  objectKeys = Object.keys;

  getGroupStageIds(): string[] {
    return this.objectKeys(this.groupedMatches).filter(
      (id) => id !== 'null' && id !== null && id !== undefined
    );
  }

  getFinalStageIds(): string[] {
    return this.objectKeys(this.groupedMatches).filter((id) => id === 'null');
  }

  getSortedRounds(groupId: string): number[] {
    return Object.keys(this.groupedMatches[groupId])
      .map(Number)
      .sort((a, b) => a - b);
  }

  getSetScores(scores_csv: string): [string, string][] {
    if (!scores_csv) return [['N/A', 'N/A']];
    return scores_csv.split(',').map((set) => {
      const [p1, p2] = set.split('-').map((s) => s.trim());
      return [p1 || '0', p2 || '0'];
    });
  }

  getPlayerName(playerId: number): string {
    const participant = this.participants.find(
      (p) => p.group_player_ids[0] === playerId
    );
    return participant ? participant.name : 'Unknown';
  }

  getFinalStagePlayerName(playerId: number): string {
    const participant = this.participants.find((p) => p.id === playerId);
    return participant ? participant.name : 'Unknown';
  }
}
