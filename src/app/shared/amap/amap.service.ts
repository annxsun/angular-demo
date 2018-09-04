import { Injectable, Inject } from '@angular/core';

declare var  AMap: any;

@Injectable()
export class AmapService {

    constructor(@Inject('amapApiLoaderService') private apiLoader) {
        console.log('sdxsadad');
    }

    private _mapPromise: Promise<any>;
    private _map: any;

    /**
     *  初始化地图参数
     */
    initOption(component, optionsArr) {
        let options = {};
        optionsArr.forEach(ele => {
            if (component[ele] !== null && component[ele] !== undefined) {
                options[ele] = component[ele];
            }
        });
        return options;
    }

    /**
     * 初始化地图
     */
    initMap(container, options) {
        this._mapPromise = new Promise<any>((resolve, reject) => {
            this.apiLoader.apiLoad().then(res => {
                console.log('options', options);
                this._map = new AMap.Map(container, options);
                resolve(this._map);
            }).catch(err => {
                reject(err);
            });
        });

        return this._mapPromise;
    }

    /**
     * 销毁地图
     */
    destroyMap() {
        this._map.clearMap();
        this._map.destroy();
      }

    /**
     * 获取地图
     */
    getMapPromise() {
        return this._mapPromise;
    }

    /**
     * 添加覆盖物
     * @param layer 覆盖物
     */
    mapAdd(layer) {
         this._mapPromise.then(map => {
            this._map.add(layer);
            // this._map.setFitView();
         });
    }

    /**
     * 根据覆盖物调整视野
     */
    mapFitView() {
        this._mapPromise.then(map => {
            this._map.setFitView();
        });
    }

     /**
     * 删除覆盖物
     * @param layer 覆盖物
     */
    mapRemove(layer) {
        this._mapPromise.then(map => {
            this._map.remove(layer);
        });
    }



}
