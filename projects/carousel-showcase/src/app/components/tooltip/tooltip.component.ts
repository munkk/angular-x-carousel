import { Component, Input } from '@angular/core';

@Component({
    selector: 'tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss']
})

export class Tooltip {
    @Input() text: string;
}
