import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBracketComponent } from './test-bracket.component';

describe('TestBracketComponent', () => {
  let component: TestBracketComponent;
  let fixture: ComponentFixture<TestBracketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestBracketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestBracketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
