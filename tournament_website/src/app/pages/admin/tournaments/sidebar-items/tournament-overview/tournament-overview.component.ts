import { Component } from '@angular/core';
import { SidebarService } from '../../../../../services/sidebar.service';

@Component({
  selector: 'app-tournament-overview',
  imports: [],
  templateUrl: './tournament-overview.component.html',
  styleUrl: './tournament-overview.component.css',
})
export class TournamentOverviewComponent {
  tournament = {
    id: 12312,
    name: 'Corporate Cup 2024',
    groups: 4,
    teams: 16,
    category: 'A',
    entryFee: 10,
    pricePool: 100,
    createdAt: '2024-07-01',
    completed: true,
  };

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.tournamentSidebar(this.tournament.id);
  }
}
