import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FinalStageBracketComponent } from './final-stage-bracket/final-stage-bracket.component';
import { SidebarService } from '../../../../../services/sidebar.service';

@Component({
  selector: 'app-final-stage',
  standalone: true,
  imports: [CommonModule, FinalStageBracketComponent],
  templateUrl: './final-stage.component.html',
  styleUrl: './final-stage.component.css',
})
export class FinalStageComponent implements OnInit{
  isFullScreen = false;

  constructor(private sidebar: SidebarService) {}

  ngOnInit(): void {
    this.sidebar.tournamentSidebar(1);
  }

}
