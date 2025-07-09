import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Match,
  MatchesByGroup,
  Participant,
  ParticipantStat,
} from '../../../models/match.model';
import { TournamentService } from '../../../services/tournament.service';
import { Tournament } from '../../../models/tournament.model';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tournament-full-bracket',
  imports: [CommonModule, MatIconModule],
  templateUrl: './tournament-full-bracket.component.html',
  styleUrl: './tournament-full-bracket.component.css',
})
export class TournamentFullBracketComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  // @Input() groupedMatches?: MatchesByGroup;
  tournament!: Tournament;

  matches: Match[] = [];
  participants: Participant[] = [];
  groupedMatches: MatchesByGroup = {};
  groupedStats: { [groupId: string]: ParticipantStat[] } = {};
  selectedGroupId: string = '';
  isFullScreen: boolean = false;

  brands = [
    {
      name: '',
      image: { url: 'assets/images/carousel/Delta_Power_Logo.png' },
    },
    {
      name: '',
      image: { url: 'assets/images/carousel/RAW_logo.png' },
    },
    {
      name: '',
      image: { url: 'assets/images/carousel/HG_logo.png' },
    },
    {
      name: ' Armour',
      image: { url: 'assets/images/carousel/Kor_logo.png' },
    },
    {
      name: '',
      image: { url: 'assets/images/carousel/ML_logo.png' },
    },
    {
      name: '',
      image: { url: 'assets/images/carousel/production_logo_white.png' },
    },
    {
      name: '',
      image: { url: 'assets/images/carousel/padel_white.png' },
    },
    {
      name: '',
      image: { url: 'assets/images/carousel/South_Music_Band.png' },
    },
    {
      name: '',
      image: { url: 'assets/images/carousel/SlashHigh_logo.png' },
    },
    {
      name: '',
      image: { url: 'assets/images/carousel/AlNada.png' },
    },
    {
      name: '',
      image: { url: 'assets/images/carousel/stampa_logo.png' },
    },
    {
      name: '',
      image: { url: 'assets/images/carousel/Delta_Power_Logo.png' },
    },
    {
      name: '',
      image: { url: 'assets/images/carousel/images.png' },
    },
    {
      name: '',
      image: { url: 'assets/images/carousel/horizantal_BD.png' },
    },
    {
      name: '',
      image: { url: 'assets/images/carousel/PA_logo.png' },
    },
    {
      name: '',
      image: { url: 'assets/images/carousel/Soubra_Logo.png' },
    },
    {
      name: '',
      image: { url: 'assets/images/carousel/Puddles_Logo.png' },
    },
    {
      name: '',
      image: { url: 'assets/images/carousel/Siux-logo.png' },
    },
    {
      name: '',
      image: { url: 'assets/images/carousel/Sweet_Treats_Logo.png' },
    },
  ];

  timeSlots = {
    16435768: {
      0: ['8:00 PM', '8:00 PM', '9:00 PM', '9:00 PM'],
      1: ['10:00 PM', '10:00 PM'],
      2: ['Sun 8:00 PM'],
    },
    16435836: {
      //E
      0: ['3:00 PM', '3:00 PM', '4:00 PM', '4:00 PM'],
      1: ['5:00 PM', '5:00 PM'],
      2: ['6:30 PM'],
    },
  };

  @ViewChild('fullscreenContainer', { static: false })
  fullscreenContainer!: ElementRef;

  fullscreenChangeHandler = () => {
    const isFull =
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).msFullscreenElement;
    this.isFullScreen = !!isFull;
  };

  enterFullscreen() {
    const elem = this.fullscreenContainer?.nativeElement;
    if (!elem) return;

    const requestFullscreen =
      elem.requestFullscreen ||
      (elem as any).webkitRequestFullscreen ||
      (elem as any).msRequestFullscreen;

    if (requestFullscreen) {
      requestFullscreen
        .call(elem)
        .then(() => {
          this.onEnterFullscreen();
          this.isFullScreen = true;
        })
        .catch((err: any) => {
          console.error('Failed to enter fullscreen:', err);
        });
    }
  }

  isScoreNaN(score: number): boolean {
    return isNaN(score);
  }

  onEnterFullscreen() {
    setTimeout(() => {
      const particles = (window as any).tsParticles;
      if (particles?.dom?.length) {
        particles.dom[0].refresh();
      }
    }, 300);
  }

  bracketData = [
    // {
    //   matches: [
    //     {
    //       top: { seed: 6, name: 'Seattle Climbers', score: 2 },
    //       bottom: { seed: 11, name: 'Las Vegas Aces', score: 0 },
    //       winner: 'top',
    //     },
    //     {
    //       top: { seed: 3, name: 'San Francisco Porters', score: 2 },
    //       bottom: { seed: 14, name: 'Atlanta Eagles', score: 1 },
    //       winner: 'top',
    //     },
    //     {
    //       top: { seed: 7, name: 'Chicago Pistons', score: 2 },
    //       bottom: { seed: 10, name: 'Dallas Rangers', score: 1 },
    //       winner: 'top',
    //     },
    //     {
    //       top: { seed: 2, name: 'Denver Demon Horses', score: 2 },
    //       bottom: { seed: 15, name: 'Portland Paddlers', score: 0 },
    //       winner: 'top',
    //     },
    //   ],
    // },
    // {
    //   matches: [
    //     {
    //       top: { seed: 6, name: 'Seattle Climbers', score: 1 },
    //       bottom: { seed: 3, name: 'San Francisco Porters', score: 2 },
    //       winner: 'bottom',
    //     },
    //     {
    //       top: { seed: 7, name: 'Chicago Pistons', score: 0 },
    //       bottom: { seed: 2, name: 'Denver Demon Horses', score: 2 },
    //       winner: 'bottom',
    //     },
    //   ],
    // },
    // {
    //   matches: [
    //     {
    //       top: { seed: 3, name: 'San Francisco Porters', score: 2 },
    //       bottom: { seed: 2, name: 'Denver Demon Horses', score: 1 },
    //       winner: 'top',
    //     },
    //   ],
    // },
  ];

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService
  ) {}

  ngAfterViewInit(): void {
    const config = {
      background: { color: { value: '#0d1b1e' } },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: { enable: true, mode: 'bubble' },
          onHover: { enable: true, mode: 'grab' },
          resize: true,
        },
        modes: {
          bubble: { distance: 200, size: 15, duration: 2, opacity: 0.8 },
          grab: { distance: 140, links: { opacity: 0.6 } },
        },
      },
      particles: {
        color: { value: '#ffffff' },
        links: {
          color: '#4ade80',
          distance: 180,
          enable: true,
          opacity: 0.15,
          width: 1.5,
          triangles: {
            enable: true,
            color: '#10b981',
            opacity: 0.05,
          },
        },
        move: {
          enable: true,
          speed: 0.5,
          warp: true,
          outModes: { default: 'out' },
        },
        number: { density: { enable: true, area: 1000 }, value: 35 },
        opacity: {
          value: 0.6,
          animation: { enable: true, speed: 0.8, opacity_min: 0.2 },
        },
        shape: { type: 'circle' },
        size: {
          value: { min: 1, max: 3 },
          animation: { enable: true, speed: 1, size_min: 0.5 },
        },
      },
      detectRetina: true,
      fullScreen: false, // ⬅ important: so it stays inside container
    };
    // @ts-ignore
    tsParticles.load('tsparticles-fullscreen', config);
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Add event listeners once using the defined handler
    document.addEventListener('fullscreenchange', this.fullscreenChangeHandler);
    document.addEventListener(
      'webkitfullscreenchange',
      this.fullscreenChangeHandler
    );
    document.addEventListener(
      'MSFullscreenChange',
      this.fullscreenChangeHandler
    );
    this.tournamentService.getTournaments().subscribe({
      next: () => {
        this.tournament = this.tournamentService.getTournamentById(id)!;

        forkJoin({
          matches: this.tournamentService.getMatches(this.tournament.id),
          participants: this.tournamentService.getParticipants(
            this.tournament.id
          ),
          stat: this.tournamentService.getParticipantsStat(this.tournament.id),
        }).subscribe({
          next: ({ matches, participants, stat }) => {
            this.matches = matches;
            this.groupedMatches =
              this.tournamentService.groupMatchesByGroupAndRound(matches);
            this.participants = participants;
            this.groupedStats = this.groupByGroupId(stat);

            // Set the first groupId for bracket rendering (if exists)
            const groupIds = Object.keys(this.groupedMatches);
            this.selectedGroupId = groupIds.length > 0 ? groupIds[0] : '';

            // ✅ Generate bracketData only after groupedMatches is available
            this.bracketData = this.generateBracketData(this.groupedMatches);
          },
          error: (err) => {
            console.error('Error loading data: ', err);
          },
        });
      },
      error: (err) => console.error(err),
    });
  }

  ngOnDestroy() {
    document.removeEventListener(
      'fullscreenchange',
      this.fullscreenChangeHandler
    );
    document.removeEventListener(
      'webkitfullscreenchange',
      this.fullscreenChangeHandler
    );
    document.removeEventListener(
      'MSFullscreenChange',
      this.fullscreenChangeHandler
    );
  }

  groupByGroupId(stats: ParticipantStat[]): {
    [groupId: string]: ParticipantStat[];
  } {
    const grouped: { [groupId: string]: ParticipantStat[] } = {};

    stats.forEach((stat) => {
      if (!grouped[stat.group_id]) {
        grouped[stat.group_id] = [];
      }
      grouped[stat.group_id].push(stat);
    });
    return grouped;
  }

  generateBracketData(MatchesByGroup: MatchesByGroup): any[] {
    const bracketData: any = [];

    const finalStageRounds = MatchesByGroup['null'];

    if (!finalStageRounds) return [];

    const sortedRounds = Object.keys(finalStageRounds)
      .map(Number)
      .sort((a, b) => a - b);

    for (const round of sortedRounds) {
      const matches = finalStageRounds[round];
      const formattedMatches = matches.map((match) => {
        const [score1Str, score2Str] = match.scores_csv.split('-');
        const score1 = parseInt(score1Str ?? '0');
        const score2 = parseInt(score2Str ?? '0');

        const p1 = this.tournamentService.getParticipantByIdForFinalStage(
          match.player1_id
        );
        const p2 = this.tournamentService.getParticipantByIdForFinalStage(
          match.player2_id
        );

        const top = {
          seed: p1?.seed ?? 0,
          name: p1?.name ?? 'N/A',
          score: score1 ?? '',
        };

        const bottom = {
          seed: p2?.seed ?? 0,
          name: p2?.name ?? 'N/A',
          score: score2 ?? '',
        };

        let winner: 'top' | 'bottom' | undefined;
        if (match.winner_id === match.player1_id) {
          winner = 'top';
        } else if (match.winner_id === match.player2_id) {
          winner = 'bottom';
        }
        return {
          top,
          bottom,
          winner,
        };
      });

      bracketData.push({ matches: formattedMatches });
    }
    return bracketData;
  }
}
