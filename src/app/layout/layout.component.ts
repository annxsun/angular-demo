import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    isOpen: Boolean;
    constructor() { }

    ngOnInit(): void {
        this.isOpen = true;
    }
}
