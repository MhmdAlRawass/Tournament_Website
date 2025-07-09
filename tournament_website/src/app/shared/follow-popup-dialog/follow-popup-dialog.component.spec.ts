import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowPopupDialogComponent } from './follow-popup-dialog.component';

describe('FollowPopupDialogComponent', () => {
  let component: FollowPopupDialogComponent;
  let fixture: ComponentFixture<FollowPopupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowPopupDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowPopupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
