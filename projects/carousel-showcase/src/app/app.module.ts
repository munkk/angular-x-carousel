import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselModule } from 'projects/angular-x-carousel/src/public-api';
import { PeriodicElement } from './components/periodic-element/periodic-element.component';
import { Tooltip } from './components/tooltip/tooltip.component';

@NgModule({
  declarations: [
    AppComponent,
    PeriodicElement,
    Tooltip,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    NoopAnimationsModule,
    MatSliderModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
