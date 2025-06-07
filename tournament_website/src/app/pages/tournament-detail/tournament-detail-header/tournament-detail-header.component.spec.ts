import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentDetailHeaderComponent } from './tournament-detail-header.component';

describe('TournamentDetailHeaderComponent', () => {
  let component: TournamentDetailHeaderComponent;
  let fixture: ComponentFixture<TournamentDetailHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentDetailHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentDetailHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
