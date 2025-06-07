import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tournament-detail-matches',
  imports: [],
  templateUrl: './tournament-detail-matches.component.html',
  styleUrl: './tournament-detail-matches.component.css'
})
export class TournamentDetailMatchesComponent {

  @Input() tournament: any;
}
