import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tournament-detail-overview',
  imports: [CommonModule, MatIconModule],
  templateUrl: './tournament-detail-overview.component.html',
  styleUrl: './tournament-detail-overview.component.css',
})
export class TournamentDetailOverviewComponent implements OnInit {
  @Input() tournament: any;
  formatList: { icon: string; title: string; text: string }[] = [];
  participantList: { title: string; count: number }[] = [];
  rankingList: { rank: number; prize: number }[] = [];

  // info
  informationList = [
    'Map pool: Selected Aim Maps',
    'All kind of cheating will result in a permanent suspension from Begam.',
    'Playing with a cheater will result in a 3 month suspension from Begam.',
    'Toxic behaviour will cause warnings and in severe cases both disqualifications and suspensions.',
  ];

  prizeClaimList = [
    'Prize claims must be completed within 24 hours of the end of the tournament otherwise risk penalty of the prize.',
    'Claims can take up to 72 hours to be processed.',
  ];

  rulesList = [
    'Please be respectful to your host and other participants. If any malicious behavior is reported, you will be removed from the tournament.',
    'Please be on time for your registration and for the actual tournament. You (and your team) will be disqualified on no-show.',
    'You and all of your teammates must be registered to qualify for the event.',
    'You can play in this tournament only if your registered and in-game names match, otherwise you will be disqualified.',
  ];

  constructor() {}

  ngOnInit(): void {
    this.formatList = [
      {
      icon: 'sports_esports',
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
      text: 'Stadium Padel',
      },
      {
      icon: 'people',
      title: 'Participants',
      text: '16 Teams',
      },
    ];

    this.participantList = [
      { title: 'Registered', count: this.tournament.registeredParticipants },
      { title: 'Available Slots', count: 15 },
    ];

    this.rankingList = [
      { rank: 1, prize: 1000 },
      { rank: 2, prize: 500 },
      { rank: 3, prize: 250 },
    ];
  }

  getSuffix(rank: number): string {
    if (rank === 1) return 'st';
    if (rank === 2) return 'nd';
    if (rank === 3) return 'rd';
    return 'th';
  }
}
