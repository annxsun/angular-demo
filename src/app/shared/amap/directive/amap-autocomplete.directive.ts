import { Directive, Input, Output, EventEmitter, Inject, ElementRef, OnInit, OnChanges, SimpleChanges, OnDestroy} from '@angular/core';
import { AmapService } from '../amap.service';

const PLUGIN_NAME = 'AMap.Autocomplete';
const ALL_OPTIONS = [
    'type',
    'city',
    'datatype',
    'citylimit'
];

declare var  AMap: any;

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'input[amapAutocomplete]',
})
export class AmapAutocompleteDirective implements OnInit, OnChanges, OnDestroy {

    @Input() type: string; // 输入提示时限定POI类型，多个类型用“|”分隔，默认值：所有类别
    @Input() city: string; // 输入提示时限定城市
    @Input() datatype: string; // 返回的数据类型
    @Input() citylimit: boolean; // 是否强制限制在设置的城市内搜索

    // event
    private listnerList: Array<any>; // 监听事件队列
    @Output() ready = new EventEmitter();
    @Output() complete = new EventEmitter();
    @Output() error = new EventEmitter();
    @Output() select = new EventEmitter();
    @Output() choose = new EventEmitter();

    private _autocomplete: any; // 自动搜索队列

    constructor(
        private amapService: AmapService,
        @Inject('amapApiLoaderService') private apiLoader,
        private el: ElementRef
    ) {}

    ngOnInit(): void {
        this.initPlugin();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this._autocomplete || !changes) {
            return;
        }
        if (changes['type']) {
            this.setType(changes['type'].currentValue);
        }
        if (changes['city']) {
            this.setCity(changes['city'].currentValue);
        }
        if (changes['citylimit']) {
            let limit = (changes['citylimit'].currentValue === 'true' || changes['citylimit'].currentValue === true) ? true : false;
            this.setCityLimit(limit);
        }
    }

    ngOnDestroy() {
      this.listnerList.forEach(listner => {
        AMap.event.removeListener(listner);
      });
    }

    /**
     * 初始化插件
     */
    initPlugin() {
        let options = this.amapService.initOption(this, ALL_OPTIONS);
        options['input'] = this.el.nativeElement;
        this.apiLoader.pluginLoad(PLUGIN_NAME).then(() => {
            this._autocomplete = new AMap.Autocomplete(options);
            this.bindEvent();
        });
    }

    setCity(city: string) {
        this._autocomplete.setCity(city);
    }

    setType(type: string) {
        this._autocomplete.setType(type);
    }

    setCityLimit(limit: boolean) {
        this._autocomplete.setCityLimit(limit);
    }

    /**
     * 绑定事件
     */
    bindEvent() {
        this.listnerList = [];
        this.listnerList.push(AMap.event.addListener(this._autocomplete, 'select', e => {
            this.select.emit(e);
        }));
        this.listnerList.push(AMap.event.addListener(this._autocomplete, 'choose', e => {
            this.choose.emit(e);
        }));
        this.listnerList.push(AMap.event.addListener(this._autocomplete, 'error', e => {
            this.error.emit(e);
        }));
        this.listnerList.push(AMap.event.addListener(this._autocomplete, 'complete', e => {
            this.complete.emit(e);
        }));
        this.listnerList.push(AMap.event.addListener(this._autocomplete, 'ready', e => {
            this.ready.emit(e);
        }));
    }

    // /**
    //  * 搜索
    //  *
    //  * @param address 输入框输入的地址
    //  */
    // search(address: string): Promise<{status: string, result: any}> {
    //     return new Promise(resolve => this._autocomplete.search(address, (status, result) => {
    //         resolve({status, result});
    //     }));
    // }

}
