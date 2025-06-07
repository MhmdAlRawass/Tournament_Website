import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Participant } from '../../../../models/tournament.model';
import { TournamentService } from '../../../../services/tournament.service';

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
          this.participants = data.map((p: any) => ({
            id: p.participant.id,
            name: p.participant.name,
          }));
        },
        error: (err) => {
          console.error('Error fetching participants:', err);
        },
      });
    }
  }
}
