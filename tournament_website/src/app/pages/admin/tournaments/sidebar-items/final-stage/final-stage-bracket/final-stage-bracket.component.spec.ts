import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalStageBracketComponent } from './final-stage-bracket.component';

describe('FinalStageBracketComponent', () => {
  let component: FinalStageBracketComponent;
  let fixture: ComponentFixture<FinalStageBracketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalStageBracketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalStageBracketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
