import { Component, OnInit, Inject, HostBinding } from '@angular/core';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.less'],

})
export class NotificationComponent implements OnInit {

    notifications = [];
    isOpen: boolean;
    _this = this;

    constructor(@Inject('notificationService') private service) {
    }

    ngOnInit(): void {
        this.getNotifications();
        this.isOpen = false;
    }

    // TODO 获取消息
    getNotifications() {
        this.notifications = this.service.getNotifications();
    }

    // TODO 移除消息
    removeNotifications(notification, event) {
        event.stopPropagation();
        this.notifications = this.service.removeNotifications(notification);
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
