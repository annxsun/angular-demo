import { Injectable, OnInit } from '@angular/core';

import { navigations } from 'config/navigation';

@Injectable()
export class NavigationService implements OnInit {

    // 记录 router 事件切换展开的导航
    private selectNavigation: Array<any>;
    // 记录临时展开的导航
    private selectTempNavigation: Array<any> = [];
    // 导航数组
    public navigations = navigations;

    constructor() {
        this.selectNavigation  = [];
        this.selectTempNavigation = [];
        this.modifyNavigationByAuth();
    }

    ngOnInit(): void {
    }

    getNavigations() {
        return this.navigations;
    }

    getSelectNavigation() {
        return this.selectNavigation;
    }

    setSelectNavigation(selArr) {
        this.selectNavigation = selArr;
    }

    getSelectTempNavigation() {
        return this.selectTempNavigation;
    }

    setSelectTempNavigation(sel) {
        this.selectTempNavigation.push(sel);
    }

    resetSelectTempNavigation() {
        this.selectTempNavigation.forEach(data => data.isOpen = 'inactive-instyle');
        this.selectTempNavigation = [];
    }

    resetNavigationsParams() {
        this.resetSelectTempNavigation();
        this.selectNavigation.forEach(data => data.isOpen = 'inactive-instyle');
        this.selectNavigation = [];
     }


    /**
     * 根据角色权限控制是否显示 navigation item
     */
    modifyNavigationByAuth() {
        // TODO
        const role = sessionStorage.getItem('role') || '1';
        this.navigationForEach(role, this.navigations);
    }

    /**
     * 遍历数组
     */
    navigationForEach(role, navigationArr) {
        navigationArr.forEach(element => {
            if (element.children && element.children.length > 0) {
                this.navigationForEach(role, element.children);
            }
            if (element['auth'] && element['auth'].indexOf(role) === -1) {
                element['hide'] = true;
            }
        });
    }

}
