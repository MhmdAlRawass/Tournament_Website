import { Component } from '@angular/core';
import { SidebarService } from '../../../../../services/sidebar.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BracketComponent } from './bracket/bracket.component';

@Component({
  selector: 'app-group-stage',
  imports: [FormsModule, CommonModule, BracketComponent],
  templateUrl: './group-stage.component.html',
  styleUrl: './group-stage.component.css',
})
export class GroupStageComponent {
  participants = [
    { id: 1, name: 'Player 1' },
    { id: 2, name: 'Player 2' },
    { id: 3, name: 'Player 3' },
    { id: 4, name: 'Player 4' },
    { id: 5, name: 'Player 5' },
    { id: 6, name: 'Player 6' },
    { id: 7, name: 'Player 7' },
    { id: 8, name: 'Player 8' },
  ];

  groups = [
    {
      name: 'A',
      participants: [
        { id: 1, name: 'Player 1' },
        { id: 2, name: 'Player 2' },
      ],
    },
  ];

  // tab
  groupTab: 'standings' | 'matches' = 'standings';
  tabs: ('standings' | 'matches')[] = ['standings', 'matches'];

  constructor(private sidebarService: SidebarService) {
    sidebarService.tournamentSidebar(12312);
  }

  onPressedTab(tab: 'standings' | 'matches') {
    this.groupTab = tab;
  }
}
