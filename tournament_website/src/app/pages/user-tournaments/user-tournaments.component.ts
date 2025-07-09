import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Tournament } from '../../models/tournament.model';
import { CommonModule, NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TournamentService } from '../../services/tournament.service';
import { CountdownPipe } from '../../pipes/countdown.pipe';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { FollowPopupDialogComponent } from '../../shared/follow-popup-dialog/follow-popup-dialog.component';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    CountdownPipe,
  ],
  templateUrl: './user-tournaments.component.html',
  styleUrl: './user-tournaments.component.css',
})
export class UserTournamentsComponent implements OnInit, AfterViewInit {
  @ViewChild('lottieContainer', { static: false }) lottieContainer!: ElementRef;

  tournaments: Tournament[] = [];

  category = ['D', 'E'];
  prizes = ['$600', '$400'];

  isLoading: boolean = false;

  constructor(
    private router: Router,
    private tournamentService: TournamentService,
    private dialog: MatDialog,
    private overlay: Overlay
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.tournamentService.getTournaments().subscribe({
      next: (data) => {
        const now = new Date();
        this.tournaments = data.filter(
          (t: Tournament) =>
            new Date(t.startTime) > now || new Date(t.startTime) < now
        );
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Failed to load tournaments', err);
      },
    });
  }

  ngAfterViewInit(): void {
    if (this.lottieContainer) {
      // @ts-ignore
      lottie.loadAnimation({
        container: this.lottieContainer.nativeElement,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/animations/loading.json',
      });
    } else {
      // console.warn('Lottie container not available');
    }
    setTimeout(() => {
      const dialogRef = this.dialog.open(FollowPopupDialogComponent, {
        disableClose: true,
        panelClass: 'custom-fullscreen-dialog',
        hasBackdrop: true,
        scrollStrategy: this.overlay.scrollStrategies.noop(),
      });
      setTimeout(() => dialogRef.close(), 70000);
    }, 1000);
  }

  viewTournamentDetails(tournament: Tournament) {
    this.router.navigate(['/tournament', tournament.id]);
  }
}
