import { Component, OnInit, Input } from '@angular/core';

import { NavigationSlideInOut } from '../navigation.animation';

@Component({
    selector: 'app-navigation-item',
    templateUrl: './navigation-item.component.html',
    styleUrls: ['./navigation-item.component.less'],
    animations: [NavigationSlideInOut],
})
export class NavigationItemComponent implements OnInit {
    @Input()
    navigation: any;

    isisCollapse = 0;

    constructor() { }

    ngOnInit(): void {
     }

     toggle(e) {
         this.isisCollapse = 1 - this.isisCollapse;
     }
}
