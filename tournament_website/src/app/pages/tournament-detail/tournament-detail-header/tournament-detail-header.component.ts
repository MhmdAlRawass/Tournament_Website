declare var gtag: Function;

import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CountdownPipe } from '../../../pipes/countdown.pipe';

@Component({
  selector: 'app-tournament-detail-header',
  imports: [MatIconModule, CommonModule],
  templateUrl: './tournament-detail-header.component.html',
  styleUrls: ['./tournament-detail-header.component.css'],
})
export class TournamentDetailHeaderComponent implements OnInit, OnDestroy {
  @Input() tournament: any;
  @Output() tabChanged = new EventEmitter<string>();
  tomorrowNoon: Date = (() => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    return date;
  })();

  intervalId: any;

  tabsList: string[] = [
    'overview',
    'matches',
    'standings',
    'teams',
    // 'test-bracket',
  ];
  selectedTab: string = 'overview';

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    this.tomorrowNoon.setHours(12, 0, 0, 0);
  }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.cdr.markForCheck();
    }, 1000);

    // for tab selection
    const savedTab = localStorage.getItem('selectedTab');
    if (savedTab && this.tabsList.includes(savedTab)) {
      this.selectedTab = savedTab;
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  onPressedJoin() {
    this.trackRegistrationClick();
    this.router.navigate(['/tournament/register']);
  }

  trackRegistrationClick() {
    if (typeof gtag === 'function') {
      gtag('event', 'register_button_click', {
        event_category: 'engagement',
        event_label: 'Registration Button',
      });
    }
  }

  onSelectTab(tab: string) {
    localStorage.setItem('selectedTab', tab);
    this.selectedTab = tab;
    this.tabChanged.emit(tab);
  }

  onPressedShowBracket() {
    this.router.navigate([this.router.url, 'bracket-view']);
  }
}
