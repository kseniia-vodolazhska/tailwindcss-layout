import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PitchBookingComponent } from './pitch-booking.component';

describe('PitchBookingComponent', () => {
  let component: PitchBookingComponent;
  let fixture: ComponentFixture<PitchBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PitchBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PitchBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
