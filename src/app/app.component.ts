import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-x-carousel';

  items = [
    '../assets/space-1.jpg',
    './assets/space-2.jpg',
    './assets/space-3.jpg',
    './assets/space-4.jpg',
    './assets/space-5.jpg',
    './assets/space-6.jpg',
    './assets/space-7.jpg',
    './assets/space-8.jpg',
  ]

  handleRotate(node) {
    console.log(node)
  }
}
