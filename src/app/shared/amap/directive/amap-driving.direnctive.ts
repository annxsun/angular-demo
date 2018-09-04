import { Directive, Input, AfterContentInit, Inject,
    OnDestroy, Output, EventEmitter, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { AmapService } from '../amap.service';

const PLUGIN_NAME = 'AMap.Driving';
const ALL_OPTIONS = [
    'policy',
    'extensions',
    'map',
    'panel',
    'hideMarkers',
    'showTraffic',
    'number',
    'isOutline',
    'outlineColor',
    'autoFitView',
];
const ALL_EVENT = [
    'error',
    'complete',
];
declare var  AMap: any;

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'div[amapdriving]',
})

export class AmapDrivingDirective implements OnChanges, OnDestroy, AfterContentInit {

    // DrivingOptions
    @Input() policy: any;
    @Input() extensions: String;
    @Input() map: any;
    @Input() panel: String|HTMLElement;
    @Input() hideMarkers: Boolean;
    @Input() showTraffic: Boolean;
    @Input() province: String;
    @Input() number: String;
    @Input() isOutline: Boolean;
    @Input() outlineColor: String;
    @Input() autoFitView: Boolean;

    @Input() searchValue: any;

    // event
    @Output() error = new EventEmitter();
    @Output() complete = new EventEmitter();

    private listnerList: Array<any>; // 监听事件队列
    private _driving: any;

    constructor(
        private amapService: AmapService,
        @Inject('amapApiLoaderService') private apiLoader,
        private el: ElementRef
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (!this._driving || !changes) {
            return;
        }
        if (changes['searchValue']) {
            this.search();
        }
    }

    ngOnDestroy() {
        this.listnerList.forEach(listner => {
            AMap.event.removeListener(listner);
        });
    }

    ngAfterContentInit() {
        this.initPlugin();
    }


    /**
     * 初始化插件
     */
    initPlugin() {
        let options = this.amapService.initOption(this, ALL_OPTIONS);
        this.amapService.getMapPromise().then(map => {
            options['map'] = map;
            options['panel'] = this.el.nativeElement;
            this.apiLoader.pluginLoad(PLUGIN_NAME).then(() => {
                this._driving = new AMap.Driving(options);
                this.bindEvent();
                this.amapService.mapAdd(this._driving);
            });
        });
    }

    /**
     * 绑定事件
     */
    bindEvent() {
        let _this = this;
        this.listnerList = [];
        ALL_EVENT.forEach(event => {
            _this.listnerList.push(AMap.event.addListener(_this._driving, event, e => {
                console.log(e);
                _this[event].emit(e);
            }));
        });
    }

    /**
     * 查询线路
     */
    search() {
        this._driving.search(this.searchValue[0], this.searchValue[1]);
    }

}
