import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeDialogComponent } from './prize-dialog.component';

describe('PrizeDialogComponent', () => {
  let component: PrizeDialogComponent;
  let fixture: ComponentFixture<PrizeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrizeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrizeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
