import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[slide]'
})

export class SlideDirective {
  @Input() data: any;

  constructor(public element: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.addClass(this.element.nativeElement, 'x-carousel__slide');
  }
}