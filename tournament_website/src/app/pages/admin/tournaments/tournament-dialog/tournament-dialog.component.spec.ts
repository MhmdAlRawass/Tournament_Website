import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentDialogComponent } from './tournament-dialog.component';

describe('TournamentDialogComponent', () => {
  let component: TournamentDialogComponent;
  let fixture: ComponentFixture<TournamentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
