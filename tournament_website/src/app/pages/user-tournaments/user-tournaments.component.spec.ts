import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTournamentsComponent } from './user-tournaments.component';

describe('HomeComponent', () => {
  let component: UserTournamentsComponent;
  let fixture: ComponentFixture<UserTournamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTournamentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTournamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
