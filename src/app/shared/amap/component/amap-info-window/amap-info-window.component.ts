import { Component, OnInit, Input, Output, EventEmitter, Inject, ElementRef,
     OnDestroy, OnChanges, SimpleChanges, AfterContentInit} from '@angular/core';
import { AmapService } from '../../amap.service';

const PLUGIN_NAME = 'AMap.InfoWindow';
const ALL_OPTIONS = [
    'isCustom',
    'autoMove',
    'closeWhenClickMap',
    'content',
    'size',
    'offset',
    'position',
    'showShadow'
];
const ALL_EVENT = [
    'isOpenChange',
    'windowOpen',
    'windowClose',
    'windowChange'
];

declare var  AMap: any;

@Component({
    selector: 'app-amap-info-window',
    templateUrl: './amap-info-window.component.html',
    styleUrls: ['./amap-info-window.component.scss'],
})
export class AmapInfoWindowComponent implements OnChanges, OnDestroy, AfterContentInit {

    // InfoWindowOptions
    @Input() isCustom: boolean;
    @Input() autoMove: boolean;
    @Input() closeWhenClickMap: boolean;
    @Input() size: any;
    @Input() offset: any;
    @Input() position: any;
    @Input() showShadow: boolean;

    @Input() isOpen: boolean;

    // events:
    @Output() isOpenChange = new EventEmitter();
    @Output() windowOpen = new EventEmitter();
    @Output() windowClose = new EventEmitter();
    @Output() windowChange = new EventEmitter();

    private listnerList: Array<any>; // 监听事件队列
    _infoWindow: any;

    constructor(
        private el: ElementRef,
        private amapService: AmapService,
        @Inject('amapApiLoaderService') private apiLoader) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this._infoWindow || !changes) {
            return;
        }

        if (changes['position']) {
            this.setPosition();
            this.setContent();
            this.open();
        }
    }

    ngOnDestroy() {
        if (!this.listnerList || this.listnerList.length < 1) {
            return;
        }
        this.listnerList.forEach(listner => {
            AMap.event.removeListener(listner);
        });
    }

    ngAfterContentInit() {
        this.initPlugin();
    }

     /**
     * 初始化地图
     */
    initPlugin() {
        let options = this.amapService.initOption(this, ALL_OPTIONS);
        let content = this.el.nativeElement.querySelector('.app-info-window-container');
        options['content'] = content;
        this.apiLoader.pluginLoad(PLUGIN_NAME).then(() => {
            if (options['offset']) {
                options['offset'] = new AMap.Pixel(options['offset'].x, options['offset'].y);
            }
            this._infoWindow = new AMap.InfoWindow(options);
            this.bindEvent();
            this.open();
        });
    }

    /**
     * 绑定事件
     */
    bindEvent() {
        let _this = this;
        this.listnerList = [];
        ALL_EVENT.forEach(event => {
            _this.listnerList.push(AMap.event.addListener(_this._infoWindow, event, e => {
                console.log(e);
                _this[event].emit(e);
            }));
        });
    }

    open() {
        this.amapService.getMapPromise().then(map => {
            this._infoWindow.open(map, this.position);
        });
    }

    close(): Promise<void> {
        return this._infoWindow.then(infoWindow => infoWindow.close());
    }

    setPosition() {
        this._infoWindow.setPosition(this.position);
    }

    setContent() {
        let content = this.el.nativeElement.querySelector('.app-info-window-container');
        this._infoWindow.setContent(content);
    }

}
