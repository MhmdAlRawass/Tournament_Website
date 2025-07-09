import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-create-tournament',
  standalone: true, 
  imports: [CommonModule, FormsModule, QuillModule],
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.css'],
})
export class CreateTournamentComponent {
  // 📝 Basic Info
  description: string = '';
  tournamentName: string = '';
  category: string = '';
  maxTeams?: number;

  // ⚙️ Game Info
  tournamentType: 'single' | 'two' = 'single';
  format: 'single' | 'double' | 'round-robin' = 'single';

  // 🏆 Additional Format Options
  grandFinals: '1-2' | '1' | '0' = '1-2';

  // 🔁 Round Robin & Ranking
  participantsPlayCount: 'once' | 'twice' | 'three-times' = 'once';
  rankingCriteria:
    | 'match-wins'
    | 'set-wins'
    | 'set-win-percentage'
    | 'set-difference'
    | 'points-scored'
    | 'points-difference'
    | 'custom' = 'match-wins';

  // 👥 Group Info (for Two-Stage)
  groupParticipants?: number;
  advanceCount?: number;
  finalStageFormat: 'single' | 'double' | 'round-robin' = 'single';

  // 💸 Registration Info
  selectedFeeType: 'free' | 'paid' = 'free';
  entryFee?: number;
  prizePool?: number;
  startDate?: string;

  // Advanced Options
  isPressedAdvanced: boolean = false;
  advancedTab: 'tie-breaks' | 'group-tie' = 'tie-breaks';
  advancedRankingCriteria = ['win-tied', 'set-wins', 'points-scored'];

  onPressedFeeType(fee: 'free' | 'paid') {
    this.selectedFeeType = fee;
  }

  onPressedAdvanced() {
    this.isPressedAdvanced = !this.isPressedAdvanced;
  }

  onPressedTabAdvanced(tab: 'tie-breaks' | 'group-tie') {
    this.advancedTab = tab;
  }

  // 🚀 Submit Logic (stubbed)
  createTournament() {
    const data = {
      name: this.tournamentName,
      description: this.description,
      category: this.category,
      maxTeams: this.maxTeams,
      type: this.tournamentType,
      format: this.format,
      grandFinals: this.grandFinals,
      participantsPlayCount: this.participantsPlayCount,
      rankingCriteria: this.rankingCriteria,
      groupParticipants: this.groupParticipants,
      advanceCount: this.advanceCount,
      finalStageFormat: this.finalStageFormat,
      entryFee: this.entryFee,
      prizePool: this.prizePool,
      startDate: this.startDate,
      advancedRankingCriteria: this.advancedRankingCriteria,
    };

    console.log('Tournament Data:', data);
    // TODO: submit to backend
  }
}
