import {
  AfterViewInit,
  Compiler,
  Component,
  Injector,
  NgModule,
  NgModuleRef,
  OnInit, ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { ComponentMetadata } from './models/component-metadata.model';
import { ComponentAlignment } from './models/component-configuration.model';
import { TemplateMetadataToHtmlTranspiler } from './services/template-metadata-to-html.transpiler';
import { from, map, take } from 'rxjs';
import { AppComponent } from './app.component';
import { EventImageComponent } from './event-image/event-image.component';
import { EventTitleComponent } from './event-title/event-title.component';
import { FunctionalityComponent } from './functionality/functionality.component';
import { EventDescriptionComponent } from './event-description/event-description.component';
import { PitchBookingComponent } from './pitch-booking/pitch-booking.component';
import { TimeSlotsComponent } from './time-slots/time-slots.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';

/* eslint-disable */

@Component({
  selector: 'tailwindcss-fun-nx-welcome',
  templateUrl: "nx-welcome.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent implements OnInit, AfterViewInit {
  metadata: ComponentMetadata[] = [];

  @ViewChild('templateContent', { read: ViewContainerRef, static: false })
  // @ts-ignore
  public _container: ViewContainerRef;

  constructor(private _compiler: Compiler,
              private _injector: Injector,
              private _m: NgModuleRef<any>) {
    this.metadata = [
      {
        row: 1,
        column: 1,
        name: "tailwindcss-fun-event-image",
        configuration: {
          alignment: ComponentAlignment.Center
        }
      },
      {
        row: 2,
        column: 1,
        name: "tailwindcss-fun-event-title",
        configuration: {
          alignment: ComponentAlignment.Left
        }
      },
      {
        row: 3,
        column: 1,
        name: "tailwindcss-fun-functionality"
      },
      {
        row: 4,
        column: 1,
        name: "tailwindcss-fun-event-description",
        configuration: {
          alignment: ComponentAlignment.Center
        }
      },
      {
        row: 5,
        column: 1,
        name: "tailwindcss-fun-pitch-booking"
      },
      {
        row: 6,
        column: 1,
        name: "tailwindcss-fun-time-slots"
      },
      {
        row: 7,
        column: 1,
        name: "tailwindcss-fun-registration-form"
      },
      {
        row: 7,
        column: 2,
        name: "tailwindcss-fun-booking-details"
      }
    ];

    // this.metadata = [
    //   {
    //     row: 2,
    //     column: 2,
    //     name: "tailwindcss-fun-event-image",
    //     configuration: {
    //       alignment: ComponentAlignment.Center
    //     }
    //   },
    //   {
    //     row: 1,
    //     column: 1,
    //     name: "tailwindcss-fun-event-title",
    //     configuration: {
    //       alignment: ComponentAlignment.Left
    //     }
    //   },
    //   {
    //     row: 3,
    //     column: 2,
    //     name: "tailwindcss-fun-functionality"
    //   },
    //   {
    //     row: 2,
    //     column: 1,
    //     name: "tailwindcss-fun-event-description",
    //     configuration: {
    //       alignment: ComponentAlignment.Center
    //     }
    //   },
    //   {
    //     row: 3,
    //     column: 1,
    //     name: "tailwindcss-fun-pitch-booking",
    //     configuration: {
    //       orderId: 1
    //     }
    //   },
    //   {
    //     row: 3,
    //     column: 1,
    //     name: "tailwindcss-fun-time-slots",
    //     configuration: {
    //       orderId: 2
    //     }
    //   },
    //   {
    //     row: 4,
    //     column: 1,
    //     name: "tailwindcss-fun-registration-form"
    //   },
    //   {
    //     row: 4,
    //     column: 2,
    //     name: "tailwindcss-fun-booking-details"
    //   }
    // ];
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const transpiler = new TemplateMetadataToHtmlTranspiler();
    const template = transpiler.convert(this.metadata);

    const templateComponentSelector = "templateComponent";
    const templateComponent = Component({selector: templateComponentSelector , template: template})(class {
    });
    const tmpModule = NgModule({
      declarations: [templateComponent, NxWelcomeComponent, EventImageComponent, EventTitleComponent, FunctionalityComponent, EventDescriptionComponent, PitchBookingComponent, TimeSlotsComponent, RegistrationFormComponent, BookingDetailsComponent],
      exports: [NxWelcomeComponent, EventImageComponent, EventTitleComponent, FunctionalityComponent, EventDescriptionComponent, PitchBookingComponent, TimeSlotsComponent, RegistrationFormComponent, BookingDetailsComponent]
    })(class {});

    from(this._compiler.compileModuleAndAllComponentsAsync(tmpModule)).pipe(
      take(1),
      map((factories) => {
        const f = factories.componentFactories.find(v => v.selector === templateComponentSelector);
        const cmpRef = f!.create(this._injector, [], null, this._m);

        cmpRef.instance.name = templateComponentSelector;
        this._container.insert(cmpRef.hostView);

        return cmpRef;
      })
    ).subscribe();
  }
}
