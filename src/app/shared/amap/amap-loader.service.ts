import { Injectable } from '@angular/core';

declare var AMap: any;

@Injectable()
export class AmapApiLoaderService {

  private DEFAULT_URL = 'https://webapi.amap.com/maps';
  private DEFAULT_VERSION = '1.4.3';
  private DEFAULT_KEY = '9d1e78954fe6c8466a123e73cb4747ba';
  private DEFAULE_CALLBACK = 'ngxAMapAPILoader';
  private _mapLoaded: Promise<void>;

  constructor() {}

  /**
   * 加载api
   */
  apiLoad() {
    if (this._mapLoaded) {
      return this._mapLoaded;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = this.setScriptSrc(this.DEFAULE_CALLBACK);

    this._mapLoaded = new Promise<void>((resolve, reject) => {
      (window)[this.DEFAULE_CALLBACK] = () => {
        resolve();
      };
      script.onerror = (error: Event) => { reject(error); };
    });

    document.body.appendChild(script);
    return this._mapLoaded;
  }

  /**
   * 拼接 api 的参数
   *
   * @param callbackName 回掉函数
   */
  private setScriptSrc(callbackName: string) {
    const urlBase = this.DEFAULT_URL;
    const queryParams: {[key: string]: string | Array<string>} = {
      v: this.DEFAULT_VERSION,
      callback: callbackName,
      key: this.DEFAULT_KEY
    };
    const params = Object.keys(queryParams)
      .filter((k: string) => queryParams[k] != null)
      .filter((k: string) => {
        return !Array.isArray(queryParams[k]) ||
            (Array.isArray(queryParams[k]) && queryParams[k].length > 0);
      })
      .map((k: string) => {
        const i = queryParams[k];
        if (Array.isArray(i)) {
          return {key: k, value: i.join(',')};
        }
        return {key: k, value: queryParams[k]};
      })
      .map((entry: {key: string, value: string}) => `${entry.key}=${entry.value}`)
      .join('&');

    return `${urlBase}?${params}`;
  }

  /**
   * 加载插件
   *
   * @param name 插件名称
   */
  pluginLoad(name: string): Promise<any> {
    return this.apiLoad().then(() => {
      return new Promise(resolve => {
        AMap.plugin(name, () => resolve());
      });
    });
  }

}
