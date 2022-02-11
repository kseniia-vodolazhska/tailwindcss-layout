import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { EventImageComponent } from './event-image/event-image.component';
import { EventTitleComponent } from './event-title/event-title.component';
import { FunctionalityComponent } from './functionality/functionality.component';
import { EventDescriptionComponent } from './event-description/event-description.component';
import { PitchBookingComponent } from './pitch-booking/pitch-booking.component';
import { TimeSlotsComponent } from './time-slots/time-slots.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, EventImageComponent, EventTitleComponent, FunctionalityComponent, EventDescriptionComponent, PitchBookingComponent, TimeSlotsComponent, RegistrationFormComponent, BookingDetailsComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
