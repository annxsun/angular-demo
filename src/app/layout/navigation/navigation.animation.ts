import {
    trigger,
    animate,
    style,
    transition,
    state,
  } from '@angular/animations';

 export const NavigationSlideInOut = trigger('slideInOut', [
    state('*', style({
        height: '0px',
        display: 'none'
    })),
    state('active-style', style({
        height: '*',
        display: 'block'
    })),
    state('active-instyle', style({
        height: '*',
        display: 'block'
    })),
    transition('active-style => *', animate('300ms ease-out')),
    transition('* => active-style', animate('300ms ease-in')),
    transition('active-instyle => *', animate('300ms ease-out')),
    transition('* => active-instyle', animate('300ms ease-in'))
 ]);
