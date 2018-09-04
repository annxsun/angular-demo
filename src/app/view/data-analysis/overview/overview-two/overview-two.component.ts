import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-overview-two',
    templateUrl: './overview-two.component.html',
    styleUrls: ['./overview-two.component.scss']
})

export class OverviewTwoComponent implements OnInit {

    infoWindowPosition: any;
    contentStart = '<div class="marker-route marker-marker-bus-from"></div>';
    contentEnd = '<div class="marker-route marker-marker-bus-to"></div>';
    positionStart: any;
    positionEnd: any;
    searchValue: any;
    // infoWindowOffset = {
    //     x: 0,
    //     y: -25
    // };
    markers = [];
    info: string;

    constructor() { }

    ngOnInit() {
    }

    planning() {
      if (this.positionStart && this.positionEnd) {
        this.searchValue = [this.positionStart, this.positionEnd];
        this.planning();
      }
    }
    origin(event, type) {
        this.positionStart = event.poi.location;
        this.markers.push(this.positionStart);
    }
    destination(event, type) {
        this.positionEnd = event.poi.location;
        this.markers.push(this.positionEnd);
        this.planning();
    }
    mapClick(event, type) {
        if (event.lnglat) {
            // let location = [event.lnglat.lng, event.lnglat.lat];
            // this.markers.push(location);
            this.info = event.lnglat.lng + ',' + event.lnglat.lat;
            this.infoWindowPosition = [event.lnglat.lng, event.lnglat.lat];
        }
    }
    markClick(event, type, index) {
        console.log('marker event index:', type, event, index);
        this.markers = [
            ...this.markers.slice(0, index),
            ...this.markers.slice(index + 1)
          ];
        console.log(this.markers);
    }
}
