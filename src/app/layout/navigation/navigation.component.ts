import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { navigationsIndexTable } from '../../../../config/navigation';
@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.less'],
})
export class NavigationComponent implements OnInit {

    navigations: any;
    navigationsIndexTable: any;

    constructor(private router: Router, @Inject('navigationService') private service) {
        this.navigationsIndexTable = navigationsIndexTable;
        this.navigations = this.service.getNavigations();
        this.navigationListener();
    }

    ngOnInit(): void {
    }

    navigationListener() {
        this.router.events.subscribe(obj => {
            if (obj instanceof NavigationEnd) {
                // 没有展开任何导航
                if (obj.urlAfterRedirects === '/') {
                    return;
                }
                // 展开了某个导航
                this.service.resetNavigationsParams();
                let urlAfterRedirects = obj.urlAfterRedirects;
                let urlAfterRedirectsArr = this.getUrlAfterRedirectsArr(urlAfterRedirects);
                let indexArr = [this.navigations.find(data => data.id === urlAfterRedirectsArr[0])];
                indexArr[0]['isOpen'] = 'active-style';
                for (let i = 1; i < urlAfterRedirectsArr.length; i++) {
                     const select = indexArr[i - 1].children.find(data => data.id === urlAfterRedirectsArr[i]);
                     if (select) {
                         select['isOpen'] = 'active-style';
                         indexArr[i] = select;
                     }
                }
                this.service.setSelectNavigation(indexArr);
            }
        });
    }

    /**
     * 将浏览器的url,解析成对应模块id
     *
     * @param urlAfterRedirects 路由地址 =
     */
    getUrlAfterRedirectsArr(urlAfterRedirects) {
        let obj = this.navigationsIndexTable.find(data => urlAfterRedirects.startsWith(data.path));
        if (obj) {
            return obj.idArr;
        }
        return [...urlAfterRedirects.split('/').slice(1)];
    }
}
