import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateralSignComponent } from './lateral-sign.component';

describe('LateralSignComponent', () => {
  let component: LateralSignComponent;
  let fixture: ComponentFixture<LateralSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LateralSignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LateralSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
