import { Directive, HostListener, ElementRef, Renderer2, Input } from '@angular/core';


@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[documentClose]',
})
export class DocumentCloseDirective {
    @Input('documentClose') documentClose;

    constructor(private el: ElementRef, private renderer2: Renderer2) {
    }

    @HostListener('document:click', ['$event'])
    onClick(event: MouseEvent) {
        if (this.el.nativeElement.contains(event.target)) {
          return true;
        }
        this.documentClose.close();
        return false;
    }
}
