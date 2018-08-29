import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    isOpen: boolean;

    constructor(private router: Router) { }

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

    /** 退出登陆 */
    logout() {
        this.router.navigate(['/signin']);
    }
}
