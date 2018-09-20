import { Directive, HostBinding, HostListener } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Directive({
    selector: '[appMovable]',
})

export class MovableDirective extends DraggableDirective {

    private startPosition: Position = {x: 0, y: 0};
    private position: Position = {x: 0, y: 0};
    private lastPoinstion: Position = {x: 0, y: 0};

    constructor(private sanitizer: DomSanitizer) {
        super();
    }

    @HostBinding('style.transform') 
    get transform(): SafeStyle {
        return this.sanitizer.bypassSecurityTrustStyle(
            `translateX(${this.position.x}px) translateY(${this.position.y}px)`
        );
    }

    @HostListener('dragStart', ['$event'])
    onDragStart(event: PointerEvent){
    //    console.log(event);
       console.log('start - startSation', this.startPosition);
       console.log(`start - cline, x:${event.clientX}, y:${event.clientY}`);
       this.startPosition = {
           x: event.clientX - this.startPosition.x,
           y: event.clientY - this.startPosition.y
       }
    }

    @HostListener('dragMove', ['$event'])
    onDragMove(event: PointerEvent){
        // console.log(event);
        console.log(`move - cline, x:${event.clientX}, y:${event.clientY}`);
        console.log('move - startSation', this.startPosition);
        console.log('move - endSation', this.position);
       this.position = {
           x: event.clientX - this.startPosition.x,
           y: event.clientY - this.startPosition.y
       }
    }

    @HostListener('dragEnd', ['$event'])
    onDragEnd(event: PointerEvent){
        console.log(`end - cline, x:${event.clientX}, y:${event.clientY}`);
        console.log('end - startSation', this.startPosition);
        console.log('end - endSation', this.position);
        // this.startPosition = {x:0, y: 0};
        // this.lastPoinstion.x = this.lastPoinstion.x + this.position.x;
        // this.lastPoinstion.y = this.lastPoinstion.y + this.position.y;
    }
   
}

interface Position {
    x: number;
    y: number;
}
