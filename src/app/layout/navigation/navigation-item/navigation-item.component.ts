import { Component, OnInit, Input, Inject } from '@angular/core';

import { NavigationSlideInOut } from '../navigation.animation';
import { navigations } from 'config/navigation';

@Component({
    selector: 'app-navigation-item',
    templateUrl: './navigation-item.component.html',
    styleUrls: ['./navigation-item.component.scss'],
    animations: [NavigationSlideInOut],
})
export class NavigationItemComponent implements OnInit {
    @Input()
    navigation: any;
    @Input()
    // 嵌套深度
    depth: number;
    // 导航title样式
    titleClassName: string;
    navigations = navigations;

    constructor(@Inject('navigationService') private service) { }

    ngOnInit(): void {
        this.depth = this.depth ? this.depth : 1;
        this.depth = (this.depth <= 5) ? this.depth : 5;
        this.titleClassName = 'navigation-title-' + this.depth;
    }

    toggleState(event) {
        //////// 触发 router 事件，切换页面
        if (this.navigation.url && this.navigation.isOpen === 'inactive-instyle') {
            return;
        }
        //////// 没有触发  router 事件
        let navigationIndex  = this.service.getSelectNavigation();
        // 点击已展开的导航
        if (navigationIndex.indexOf(this.navigation) !== -1) {
            this.navigation['isOpen'] = this.navigation['isOpen'] === 'active-style' ? 'inactive-style' : 'active-style';
            this.service.resetSelectTempNavigation();
            return;
        }
        // 点击未展开的导航
        let templateNavigationIndex = this.service.getSelectTempNavigation();
        if (navigationIndex.length > 0) {
            navigationIndex[0]['isOpen'] = 'inactive-style';
        }
        for (let i = templateNavigationIndex.length - 1; i >= 0; i--) {
            // 点击的是展开目录 或者 展开目录的子集
            if (templateNavigationIndex[i] === this.navigation
                || (templateNavigationIndex[i].children && templateNavigationIndex[i].children.indexOf(this.navigation) !== -1)) {
                break;
            }
            templateNavigationIndex[i]['isOpen'] = 'inactive-instyle';
            templateNavigationIndex.pop();
        }
        this.navigation['isOpen'] = this.navigation['isOpen'] === 'active-instyle' ? 'inactive-instyle' : 'active-instyle' ;
        if (this.navigation['isOpen'] === 'active-instyle') {
            this.service.setSelectTempNavigation(this.navigation);
        }
    }
}
