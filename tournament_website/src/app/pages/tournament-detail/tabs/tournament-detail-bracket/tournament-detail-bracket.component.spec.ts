import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentDetailBracketComponent } from './tournament-detail-bracket.component';

describe('TournamentDetailBracketComponent', () => {
  let component: TournamentDetailBracketComponent;
  let fixture: ComponentFixture<TournamentDetailBracketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentDetailBracketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentDetailBracketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
