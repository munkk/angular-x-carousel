import { Component, Input } from '@angular/core';

export interface Element {
    number: number
    name: string
    symbol: string
    atomic_mass: string
    'cpk-hex': string
    summary: string
}

@Component({
    selector: 'periodic-element',
    templateUrl: './periodic-element.component.html',
    styleUrls: ['./periodic-element.component.scss']
})

export class PeriodicElement {
    @Input() element: Element;
}
