import { Directive, Input, AfterContentInit, Inject,
    OnDestroy, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { AmapService } from '../amap.service';

const PLUGIN_NAME = 'AMap.Marker';
const ALL_OPTIONS = [
    'position',
    'offset',
    'icon',
    'content',
    'topWhenClick',
    'bubble',
    'draggable',
    'raiseOnDrag',
    'cursor',
    'visible',
    'zIndex',
    'angle',
    'autoRotation',
    'shadow',
    'title',
    'clickable',
    'shape',
    'extData',
    'label'
];
const ALL_EVENT = [
    'click',
    'dblClick',
    'rightClick',
    'mouseMove',
    'mouseOver',
    'mouseOut',
    'mouseDown',
    'mouseUp',
    'dragStart',
    'dragging',
    'dragEnd',
    'touchStart',
    'touchMove',
    'touchEnd',
    'moving',
    'moveend',
    'movealong'
];
declare var  AMap: any;

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'amap-marker',
})

export class AmapMarkerDirective implements OnChanges, OnDestroy, AfterContentInit {

    // MarkerOptions
    @Input() position: any;
    @Input() offset: any;
    @Input() icon: any;
    @Input() content: any;
    @Input() topWhenClick: boolean;
    @Input() bubble: boolean;
    @Input() draggable: boolean;
    @Input() raiseOnDrag: boolean;
    @Input() cursor: string;
    @Input() visible: boolean;
    @Input() zIndex: number;
    @Input() angle: number;
    @Input() autoRotation: boolean;
    @Input() shadow: any;
    @Input() title: string;
    @Input() clickable: boolean;
    @Input() shape: any;
    @Input() extData: any;
    @Input() label: any;

    // events:
    @Output() click = new EventEmitter();
    @Output() dblClick = new EventEmitter();
    @Output() rightClick = new EventEmitter();
    @Output() mouseMove = new EventEmitter();
    @Output() mouseOver = new EventEmitter();
    @Output() mouseOut = new EventEmitter();
    @Output() mouseDown = new EventEmitter();
    @Output() mouseUp = new EventEmitter();
    @Output() dragStart = new EventEmitter();
    @Output() dragging = new EventEmitter();
    @Output() dragEnd = new EventEmitter();
    @Output() touchStart = new EventEmitter();
    @Output() touchMove = new EventEmitter();
    @Output() touchEnd = new EventEmitter();
    @Output() moving = new EventEmitter();
    @Output() moveend = new EventEmitter();
    @Output() movealong = new EventEmitter();

    @Output() complete = new EventEmitter();

    private listnerList: Array<any>; // 监听事件队列
    private _marker: any;

    constructor(
        private amapService: AmapService,
        @Inject('amapApiLoaderService') private apiLoader,
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (!this._marker && this.position) {
            this.initPlugin();
            return;
        }
        if (this.position) {
            this.setPosition(changes['position'].currentValue);
        }
    }

    ngOnDestroy() {
        if (!this.listnerList || this.listnerList.length < 1) {
            return;
        }
        this.listnerList.forEach(listner => {
            AMap.event.removeListener(listner);
        });
        this.amapService.mapRemove(this._marker);
        this._marker = null;
    }

    ngAfterContentInit() {

    }


    /**
     * 初始化插件
     */
    initPlugin() {
        let options = this.amapService.initOption(this, ALL_OPTIONS);
        this.apiLoader.pluginLoad(PLUGIN_NAME).then(() => {
            this._marker = new AMap.Marker(options);
            this.complete.emit(this._marker);
            this.bindEvent();
            this.amapService.mapAdd(this._marker);
        });
    }

    /**
     * 绑定事件
     */
    bindEvent() {
        this.listnerList = [];
        ALL_EVENT.forEach(event => {
            this.listnerList.push(AMap.event.addListener(this._marker, event, e => {
                console.log(e);
                this[event].emit(e);
            }));
        });
    }

    setPosition(position: any) {
        this._marker.setPosition(position);
        // this.amapService.mapFitView();
    }

}
