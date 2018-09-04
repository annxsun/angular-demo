import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ElementRef} from '@angular/core';
import { AmapService } from '../../amap.service';

const ALL_OPTIONS = [
    'view',
    'layers',
    'zoom',
    'center',
    'labelzIndex',
    'zooms',
    'lang',
    'cursor',
    'crs',
    'animateEnable',
    'isHotspot',
    'defaultLayer',
    'rotateEnable',
    'resizeEnable',
    'showIndoorMap',
    'indoorMap',
    'expandZoomRange',
    'dragEnable',
    'zoomEnable',
    'doubleClickZoom',
    'keyboardEnable',
    'jogEnable',
    'scrollWheel',
    'touchZoom',
    'mapStyle',
    'features',
    'showBuildingBlock',
    'viewMode',
    'pitch',
    'pitchEnable',
    'buildingAnimation',
    'skyColor',
    'gridMapForeign'
];

const ALL_EVENT = [
    'ready',
    'click',
    'dblClick',
    'complete',
    'mapmove',
    'movestart',
    'moveend',
    'zoomchange',
    'zoomstart',
    'zoomend',
    'resize',
    'rightClick',
    'mouseMove',
    'mouseOver',
    'mouseWheel',
    'mouseOut',
    'mouseUp',
    'mouseDown',
    'touchStart',
    'touchMove',
    'touchEnd',
    'hotspotClick',
    'hotspotOver',
    'hotspotOut',
    'dragStart',
    'dragging',
    'dragEnd',

];

declare var  AMap: any;

@Component({
    selector: 'app-amap',
    templateUrl: './amap.component.html',
    styleUrls: ['./amap.component.scss'],
    providers: [AmapService],
})
export class AmapComponent implements OnInit, OnDestroy {

    @Input() view: any;
    @Input() layers: any[];
    @Input() zoom: number;
    @Input() center: Array<number>;
    @Input() labelzIndex: number;
    @Input() zooms: number[];
    @Input() lang: string;
    @Input() cursor: string;
    @Input() crs: string;
    @Input() animateEnable: boolean;
    @Input() isHotspot: boolean;
    @Input() defaultLayer: any;
    @Input() rotateEnable: boolean;
    @Input() resizeEnable: boolean;
    @Input() showIndoorMap: boolean;
    @Input() indoorMap: any;
    @Input() expandZoomRange: boolean;
    @Input() dragEnable: boolean;
    @Input() zoomEnable: boolean;
    @Input() doubleClickZoom: boolean;
    @Input() keyboardEnable: boolean;
    @Input() jogEnable: boolean;
    @Input() scrollWheel: boolean;
    @Input() touchZoom: boolean;
    @Input() mapStyle: string;
    @Input() features: string[];
    @Input() showBuildingBlock: boolean;
    @Input() viewMode: string;
    @Input() pitch: number;
    @Input() pitchEnable: boolean;
    @Input() buildingAnimation: boolean;
    @Input() skyColor: string;
    @Input() gridMapForeign: boolean;

    // ngx-amap events:
    @Output() ready = new EventEmitter();
    @Output() click = new EventEmitter();
    @Output() dblClick = new EventEmitter();
    @Output() complete = new EventEmitter();
    @Output() mapmove = new EventEmitter();
    @Output() movestart = new EventEmitter();
    @Output() moveend = new EventEmitter();
    @Output() zoomchange = new EventEmitter();
    @Output() zoomstart = new EventEmitter();
    @Output() zoomend = new EventEmitter();
    @Output() resize = new EventEmitter();
    @Output() rightClick = new EventEmitter();
    @Output() mouseMove = new EventEmitter();
    @Output() mouseOver = new EventEmitter();
    @Output() mouseWheel = new EventEmitter();
    @Output() mouseOut = new EventEmitter();
    @Output() mouseUp = new EventEmitter();
    @Output() mouseDown = new EventEmitter();
    @Output() touchStart = new EventEmitter();
    @Output() touchMove = new EventEmitter();
    @Output() touchEnd = new EventEmitter();
    @Output() hotspotClick = new EventEmitter();
    @Output() hotspotOver = new EventEmitter();
    @Output() hotspotOut = new EventEmitter();
    @Output() dragStart = new EventEmitter();
    @Output() dragging = new EventEmitter();
    @Output() dragEnd = new EventEmitter();

    private listnerList: Array<any>; // 监听事件队列
    private map: any;

    constructor(
        private el: ElementRef,
        private amapService: AmapService) {
    }

    ngOnInit(): void {
        this.initMap();
    }

    ngOnDestroy() {
        if (!this.listnerList || this.listnerList.length < 1) {
            return;
        }
        this.listnerList.forEach(listner => {
            AMap.event.removeListener(listner);
        });
    }

    /**
     * 初始化地图
     */
    initMap() {
        let options = this.amapService.initOption(this, ALL_OPTIONS);
        let container = this.el.nativeElement.querySelector('div.app-amap-container');
        this.amapService.initMap(container, options).then(map => {
            this.map = map;
            this.bindEvent();
             console.log(' this.map ',  this.map );
        });
    }

    /**
     * 绑定事件
     */
    bindEvent() {
        this.listnerList = [];
        ALL_EVENT.forEach(event => {
            AMap.event.addListener(this.map, event, e => { console.log('e==', e); this[event].emit(e); });
        });
    }



}
