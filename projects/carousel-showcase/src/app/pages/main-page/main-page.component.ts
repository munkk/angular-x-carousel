import { Component } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

import { elements } from '../../../assets/periodic.json';
import { Element } from '../../components/periodic-element/periodic-element.component';

@Component({
    selector: 'main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
    elements: Element[];
    currentElement: Element;
    showTooltip: boolean;
    val: any;

    constructor() {
        this.elements = Array.from(elements).slice(0, 9) as any;
        this.currentElement = null;
        this.showTooltip = false;
    }

    handleChange(node) {
        this.currentElement = node.value.item;
    }

    setElements(change: MatSliderChange) {
        this.elements = Array.from(elements).slice(0, change.value) as any;
    }

    trackByFn(index: number, item: any) {
        return item.name;
    }
}
