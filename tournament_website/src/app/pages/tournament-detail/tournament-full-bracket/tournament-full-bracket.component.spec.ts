import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentFullBracketComponent } from './tournament-full-bracket.component';

describe('TournamentFullBracketComponent', () => {
  let component: TournamentFullBracketComponent;
  let fixture: ComponentFixture<TournamentFullBracketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentFullBracketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentFullBracketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
