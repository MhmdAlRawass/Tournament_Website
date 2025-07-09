import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { TournamentDialogComponent } from './tournament-dialog/tournament-dialog.component';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Router, RouterModule } from '@angular/router';
import { SidebarService } from '../../../services/sidebar.service';

@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [
    MatIconModule,
    MatDialogModule,
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './tournaments.component.html',
  styleUrl: './tournaments.component.css',
  animations: [
    trigger('filterToggle', [
      state('open', style({ height: '*', opacity: 1, transform: 'scaleY(1)' })),
      state(
        'closed',
        style({
          height: '0px',
          opacity: 0,
          transform: 'scaleY(0.95)',
          overflow: 'hidden',
        })
      ),
      transition('open <=> closed', animate('200ms ease-in-out')),
    ]),
  ],
})
export class TournamentsComponent implements OnInit {
  showFilters: boolean = false;

  tournaments = [
    {
      id: 12312,
      name: 'Corporate Cup 2024',
      groups: 4,
      teams: 16,
      category: 'A',
      entryFee: 10,
      pricePool: 100,
      createdAt: '2024-07-01',
      completed: true,
    },
    {
      id: 12313,
      name: 'Winter League',
      groups: 4,
      teams: 16,
      category: 'A',
      entryFee: 10,
      pricePool: 100,
      createdAt: '2024-12-15',
      completed: false,
    },
    {
      id: 12314,
      name: 'Spring Games',
      groups: 4,
      teams: 16,
      category: 'A',
      entryFee: 10,
      pricePool: 100,
      createdAt: '2025-03-20',
      completed: false,
    },
  ];

  filteredTournaments = [];

  constructor(
    private dialog: MatDialog,
    private sidebarService: SidebarService,
    private router: Router
  ) {
    this.sidebarService.resetToDefault();
  }

  ngOnInit(): void {
    this.filteredTournaments = this.tournaments;
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(TournamentDialogComponent, {
      width: '90%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.onDialogClosed(result);
    });
  }

  onPressedCreateTournament() {
    this.router.navigate(['/admin/tournament/create']);
  }

  editTournament(element: any) {
    const dialogRef = this.dialog.open(TournamentDialogComponent, {
      width: '90%',
      disableClose: true,
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.onDialogClosed(result);
    });
  }

  deleteTournament(element: any) {
    this.tournaments = this.tournaments.filter((t) => t !== element);
  }

  onDialogClosed(result: any) {
    if (!result) return;

    const existing = this.tournaments.find((t) => t.name === result.name);
    if (existing) {
      Object.assign(existing, result);
    } else {
      this.tournaments.push(result);
    }
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  applyFilters() {}
}
