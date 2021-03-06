import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ContentChild, ContentChildren, EventEmitter, Input, OnChanges, OnDestroy, Output, QueryList, Renderer2, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import LinkedList from '../../models/LinkedList';
import Slide from '../../models/Slide';

import { SlideDirective } from '../slide/slide.directive';

declare var ResizeObserver: any;;

const classes = {
    itemCurrent: "x-current",
    itemPast: "x-prev",
    itemFuture: "x-next",
};

const classRemover = new RegExp(
    "\\b(" +
    classes.itemCurrent +
    "|" +
    classes.itemPast +
    "|" +
    classes.itemFuture +
    ")(.*?)(\\s|$)",
    "g"
);

const whiteSpaceRemover = new RegExp("\\s\\s+", "g");

const noop = () => null;

@Component({
    selector: 'carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
    list: LinkedList;
    theta: number = 0;
    radius: number = 0;
    cellsCount: number = 0;
    currentIndex: number = 0;
    private resizeObserver: typeof ResizeObserver;
    private slides: QueryList<SlideDirective>;

    @ViewChild('scene') sceneRef: any;
    @ViewChild('wrapper') carouselWrapperRef: any;
    @ContentChildren(SlideDirective) set queryListSlides(slides: QueryList<SlideDirective>) {
        this.slides = slides;

        //means user changes slides
        if (this.carouselWrapperRef) {
            this.renderer.setStyle(this.carouselWrapperRef.nativeElement, 'transition', 'transform 0s');
            this.buildList();
            this.calculateDimension();
            this.setCellsDimensions();
            this.changeCarousel();
            setTimeout(
                () => (this.renderer.setStyle(this.carouselWrapperRef.nativeElement, 'transition', 'transform 1s')),
                0
            )
        }
    }
    @Output() onChange: EventEmitter<any> = new EventEmitter();

    constructor(private renderer: Renderer2, private cdRef: ChangeDetectorRef) { }

    ngAfterViewInit() {
        if (!this.sceneRef) return;

        this.buildList();
        this.calculateDimension();
        this.setCellsDimensions();
        this.setResizeListener();
        this.changeCarousel();
    }

    ngOnDestroy() {
        this.resizeObserver.unobserve(this.sceneRef.nativeElement);
    }

    buildList() {
        if (!this.slides.length) return;

        this.list = new LinkedList();
        this.slides.forEach((item, idx) => {
            const slide = new Slide(idx, item.data, item.element.nativeElement)
            this.list.push(slide);
        })

        this.list.connectTailWithHead();
    }

    calculateDimension() {
        const { width } = this.sceneRef.nativeElement.getBoundingClientRect();

        this.cellsCount = this.list.length;
        this.theta = 360 / this.cellsCount;
        this.radius = Math.round(width / 2 / Math.tan(Math.PI / this.cellsCount));
    }

    setCellsDimensions() {
        const { width, height } = this.sceneRef.nativeElement.getBoundingClientRect();

        this.slides.forEach((item, idx) => {
            this.renderer.setStyle(item.element.nativeElement, 'width', width + 'px');
            this.renderer.setStyle(item.element.nativeElement, 'height', height + 'px');
        })
    }

    setResizeListener() {
        this.resizeObserver = new ResizeObserver(entries => {
            entries.forEach(scene => {
                this.renderer.setStyle(this.carouselWrapperRef.nativeElement, 'transition', 'transform 0s');
                this.calculateDimension();
                this.setCellsDimensions();
                this.changeCarousel();
                setTimeout(
                    () => (this.renderer.setStyle(this.carouselWrapperRef.nativeElement, 'transition', 'transform 1s')),
                    0
                )
            });
        });

        this.resizeObserver.observe(this.sceneRef.nativeElement);
    }

    changeCarousel() {
        if (!this.list.length) return;

        let currentNode = this.list.getNodeAtIndex(0);
        while (true) {
            const cellAngle = this.theta * currentNode.value.id;

            if (currentNode.value.element) {
                this.renderer.setStyle(currentNode.value.element, 'transform', 'rotateY' + '(' + cellAngle + 'deg) translateZ(' + this.radius + 'px)');
            }

            if (currentNode.value.id === this.list.length - 1) break;

            currentNode = currentNode.next;
        }

        this.rotateCarousel();
    }

    rotateCarousel() {
        if (!this.carouselWrapperRef) return;

        const angle = this.theta * this.currentIndex * -1;
        this.renderer.setStyle(this.carouselWrapperRef.nativeElement, 'transform', "translateZ(" + -this.radius + "px) " + "rotateY" + "(" + angle + "deg)");


        setTimeout(
            () => (
                this.renderer.setStyle(this.carouselWrapperRef.nativeElement, 'transition', "transform 1s")
            ),
            0
        );

        this.updateClassList();
        this.onChange.emit(this.getCurrentNode());
    }

    getActualIndex() {
        return Math.sign(this.currentIndex) < 0
            ? this.list.length - Math.abs(this.currentIndex)
            : this.currentIndex % this.list.length;
    }

    getCurrentNode() {
        const idx = this.getActualIndex();

        return this.list.getNodeAtIndex(idx);
    }

    moveRight = () => {
        this.currentIndex++;
        this.rotateCarousel();
    };

    moveLeft = () => {
        this.currentIndex--;
        this.rotateCarousel();
    };

    handleLeftControlClick = () => {
        this.moveLeft();
    };

    handleRightControlClick = () => {
        this.moveRight();
    };

    removeExtraClasses(element) {
        return element.className = element.className
            .replace(classRemover, "")
            .replace(whiteSpaceRemover, " ");
    }

    updateClassList() {
        const centerNode = this.getCurrentNode();
        const centerElement = centerNode.value.element;

        this.removeExtraClasses(centerElement);
        centerElement.classList.add("x-current");

        let counter = 0;
        const max = Math.floor(this.list.length / 2);
        let currentNode = centerNode;
        while (counter < max) {
            const element = currentNode.next.value.element;
            this.removeExtraClasses(element);
            element.classList.add("x-next-" + counter);
            currentNode = currentNode.next;
            counter++;
        }

        counter = 0;
        currentNode = centerNode;
        while (counter < max) {
            const element = currentNode.prev.value.element;
            this.removeExtraClasses(element);
            element.classList.add("x-prev-" + counter);
            currentNode = currentNode.prev;
            counter++;
        }
    }

}
