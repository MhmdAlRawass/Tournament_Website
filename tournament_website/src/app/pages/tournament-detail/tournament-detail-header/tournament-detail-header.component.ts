import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tournament-detail-header',
  imports: [MatIconModule, CommonModule],
  templateUrl: './tournament-detail-header.component.html',
  styleUrl: './tournament-detail-header.component.css',
})
export class TournamentDetailHeaderComponent {
  @Input() tournament: any;
  @Output() tabChanged = new EventEmitter<string>();

  tabsList: string[] = ['overview', 'bracket', 'matches', 'participants'];
  selectedTab: string = 'overview';

  onPressedJoin(t: any) {}

  onSelectTab(tab: string) {
    this.selectedTab = tab;
    this.tabChanged.emit(tab);
  }
}
