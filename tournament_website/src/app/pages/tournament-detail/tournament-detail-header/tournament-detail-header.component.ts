import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tournament-detail-header',
  imports: [MatIconModule, CommonModule],
  templateUrl: './tournament-detail-header.component.html',
  styleUrls: ['./tournament-detail-header.component.css'],
})
export class TournamentDetailHeaderComponent {
  @Input() tournament: any;
  @Output() tabChanged = new EventEmitter<string>();

  constructor(private router: Router) {}

  tabsList: string[] = [
    'overview',
    'bracket',
    'matches',
    'participants',
    'test-bracket',
  ];
  selectedTab: string = 'overview';

  onPressedJoin(t: any) {}

  onSelectTab(tab: string) {
    this.selectedTab = tab;
    this.tabChanged.emit(tab);
  }

  onPressedShowBracket() {
    this.router.navigate([this.router.url, 'bracket-view']);
  }
}
