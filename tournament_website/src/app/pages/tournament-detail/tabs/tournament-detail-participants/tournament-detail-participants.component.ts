import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TournamentService } from '../../../../services/tournament.service';
import { Participant } from '../../../../models/match.model';

@Component({
  selector: 'app-tournament-detail-participants',
  imports: [CommonModule],
  templateUrl: './tournament-detail-participants.component.html',
  styleUrl: './tournament-detail-participants.component.css',
})
export class TournamentDetailParticipantsComponent implements OnInit {
  @Input() tournament: any;
  participants: Participant[] = [];

  constructor(private tournamentService: TournamentService) {}

  ngOnInit(): void {
    if (this.tournament.id) {
      this.tournamentService.getParticipants(this.tournament.id).subscribe({
        next: (data) => {
          this.participants = data;
        },
        error: (err) => {
          console.error('Error fetching participants:', err);
        },
      });
    }
  }
}
