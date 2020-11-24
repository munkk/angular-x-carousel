import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CarouselComponent } from './carousel/carousel.component';
import { SlideDirective } from './slide/slide.directive';

@NgModule({
    declarations: [
        CarouselComponent,
        SlideDirective
    ],
    imports: [
        BrowserModule
    ],
    exports: [
        CarouselComponent,
        SlideDirective
    ],
    providers: [],
    bootstrap: [CarouselComponent]
})
export class CarouselModule { }
