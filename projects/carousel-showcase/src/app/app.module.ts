import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
