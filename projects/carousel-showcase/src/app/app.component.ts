import { Component } from '@angular/core';

import { elements } from '../assets/periodic.json';
import { Element } from './components/periodic-element/periodic-element.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  elements: Element[];
  currentElement: Element;
  showTooltip: boolean;

  constructor() {
    this.elements = Array.from(elements).slice(0, 9) as any;
    this.currentElement = null;
    this.showTooltip = false;
  }

  handleChange(node) {
    this.currentElement = node.value.item;
  }
}
