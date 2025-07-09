import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tournament-detail-overview',
  imports: [CommonModule, MatIconModule],
  templateUrl: './tournament-detail-overview.component.html',
  styleUrl: './tournament-detail-overview.component.css',
})
export class TournamentDetailOverviewComponent
  implements OnInit, AfterViewInit
{
  @Input() tournament: any;
  @ViewChild('lottieContainer', { static: false }) lottieContainer!: ElementRef;

  formatList: { icon: string; title: string; text: string }[] = [];
  participantList: { title: string; count: number }[] = [];
  rankingList: { rank: number; prize: number }[] = [];

  // info
  informationList = [
    'Format: Round Robin - each team plays against all other teams in group stage.',
    'Matches are played as best of 3 sets.',
    'Top teams advance to the knockout stage based on games won and points difference.',
    'Teams must arrive 15 minutes before their scheduled match.',
    'Fair play and sportsmanship are mandatory throughout the tournament.',
  ];

  // prizeClaimList = [
  //   'Prize claims must be completed within 24 hours of the end of the tournament otherwise risk penalty of the prize.',
  //   'Claims can take up to 72 hours to be processed.',
  // ];

  rulesList = [
    'In the Group Stage, each match will consist of one set played to six games. If the score reaches 6-6, a tie-break to 7 points will be played, applying the golden point rule. The tie-break is considered open, allowing some flexibility.',
    '👉 Top 2 teams from each group will qualify to the Quarter Finals.',
    'During the Quarter Finals, matches will be played as one set to nine, using the golden point rule at deuce. If the score reaches 8-8, a super tie-break to 10 points will be played. This tie-break is fixed and must be applied as stated.',
    'The Semi - Finals will be played in a best-of-three sets format, with the 1 Ad rule in effect. If the match reaches one set each (1-1), a super tie-break to 10 points will be played to determine the winner. In case of 9-9 in tie break, it will be open till 15.',
    'The Final will be played in a best-of-three sets format, with the 1 Ad rule in effect. If the match reaches one set each (1-1), a full third set will be played to determine the winner.',
    '🚫 Disqualification Notice: Any player found to be registered in Category D or E while actively playing or having recently played in a higher category will be immediately disqualified from the tournament. Fair play is strictly enforced to maintain competitive integrity.',
  ];

  constructor() {}

  ngOnInit(): void {
    this.formatList = [
      {
        icon: 'sports_tennis',
        title: 'Game',
        text: 'Padel',
      },
      {
        icon: 'schedule',
        title: 'Date',
        text: new Date(this.tournament.startTime).toLocaleDateString(),
      },
      {
        icon: 'location_on',
        title: 'Location',
        text: 'Padel Square',
      },
      {
        icon: 'people',
        title: 'Participants',
        text: '16 Teams',
      },
    ];

    this.participantList = [
      { title: 'Registered', count: this.tournament.registeredParticipants },
      // { title: 'Available Slots', count: 15 },
    ];

    this.rankingList = [
      { rank: 1, prize: 300 },
      { rank: 2, prize: 200 },
      // { rank: 3, prize: 250 },
    ];
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    lottie.loadAnimation({
      container: this.lottieContainer.nativeElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/assets/animations/prizes.json',
    });
  }

  getSuffix(rank: number): string {
    if (rank === 1) return 'st';
    if (rank === 2) return 'nd';
    if (rank === 3) return 'rd';
    return 'th';
  }
}
