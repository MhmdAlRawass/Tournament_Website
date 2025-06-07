import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Tournament } from '../../models/tournament.model';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TournamentService } from '../../services/tournament.service';
// import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    // HttpClientModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  tournaments: Tournament[] = [
    // {
    //   id: 1,
    //   name: 'Corporate Cup 2024',
    //   category: 'A',
    //   entryFee: 10,
    //   prizePool: 100,
    //   createdAt: '2024-07-01',
    //   teams: [
    //     {
    //       member1: 'Alice',
    //       member2: 'Bob',
    //     },
    //   ],
    // },
    // {
    //   id: 2,
    //   name: 'Winter League',
    //   category: 'B',
    //   entryFee: 20,
    //   prizePool: 200,
    //   createdAt: '2024-12-01',
    //   teams: [],
    // },
    // {
    //   id: 2,
    //   name: 'Winter League',
    //   category: 'B',
    //   entryFee: 20,
    //   prizePool: 200,
    //   createdAt: '2024-12-01',
    //   teams: [],
    // },
    // {
    //   id: 2,
    //   name: 'Winter League',
    //   category: 'B',
    //   entryFee: 20,
    //   prizePool: 200,
    //   createdAt: '2024-12-01',
    //   teams: [],
    // },
  ];

  constructor(
    private router: Router,
    private tournamentService: TournamentService
  ) {}

  ngOnInit() {
    this.tournamentService.getTournaments().subscribe({
      next: (data) => {
        const now = new Date();
        this.tournaments = data.filter(
          (t: Tournament) => new Date(t.startTime) > now || new Date(t.startTime) < now
        );
      },
      error: (err) => console.error('Failed to load tournaments', err),
    });
  }

  viewTournamentDetails(tournament: Tournament) {
    this.router.navigate(['/tournament', tournament.id]);
  }
}
