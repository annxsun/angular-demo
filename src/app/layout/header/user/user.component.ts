import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {

    isOpen: boolean;
    constructor() { }

    ngOnInit(): void {
        this.isOpen = false;
     }

    /**
     * 点击显示消息弹出框,再次点击消息弹出框
     */
    toggleDropdown() {
        this.isOpen = !this.isOpen;
    }

    /**
     * 点击关闭按钮，关闭消息弹出框
     */
    close() {
        this.isOpen = false;
    }
}
