import { Component, OnInit } from '@angular/core';


import { navigations } from 'config/navigation';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.less'],
})
export class NavigationComponent implements OnInit {
    navigations = navigations;
    constructor() { }

    ngOnInit(): void {
        console.log(navigations);
    }
}
