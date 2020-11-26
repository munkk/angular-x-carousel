import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-x-carousel';

  items = [
    {
      name: "Charlie",
      weight: "3.6",
      imageSrc: '../assets/cat-1.jpg',
    },
    {
      name: "Oscar",
      weight: "4.0",
      imageSrc: '../assets/cat-2.jpg',
    },
    {
      name: "Alfie",
      weight: "7.2",
      imageSrc: '../assets/cat-3.jpg',
    },
    {
      name: "Max",
      weight: "3.8",
      imageSrc: '../assets/cat-4.jpg',
    },
    {
      name: "Milo",
      weight: "5.3",
      imageSrc: '../assets/cat-5.jpg',
    },
    {
      name: "Jasper",
      weight: "4.1",
      imageSrc: '../assets/cat-6.jpg',
    },
    {
      name: "George",
      weight: "3.0",
      imageSrc: '../assets/cat-7.jpg',
    },
    {
      name: "Leo",
      weight: "3.9",
      imageSrc: '../assets/cat-8.jpg',
    },
  ];

  handleChange(node) {
    console.log(node)
  }
}
