import { Directive, HostBinding, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
    selector: '[appDraggable]',
})

export class DraggableDirective {

    @HostBinding('class.draggable') draggable = true;
    @HostBinding('class.dragging') dragging = false;

    @Output() dragStart = new EventEmitter<PointerEvent>();
    @Output() dragMove = new EventEmitter<PointerEvent>();
    @Output() dragEnd = new EventEmitter<PointerEvent>();

    @HostListener('pointerdown',['$event'])
    onPointerDown(event: PointerEvent) {
        this.dragging = true;
        this.dragStart.emit(event);
    }

    @HostListener('document:pointermove',['$event'])
    onPointerMove(event: PointerEvent) {
        event.preventDefault();
        if(!this.dragging){
            return;
        }
        this.dragMove.emit(event);
    }

    @HostListener('document:pointerup',['$event'])
    onPointerUp(event: PointerEvent) {
        if(!this.dragging){
            return;
        }
        this.dragging = false;
        this.dragEnd.emit(event);
    }
}