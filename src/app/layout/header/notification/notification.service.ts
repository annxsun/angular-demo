import { Injectable } from '@angular/core';

import { natifactions } from '../../../../assets/mock/notifications';

@Injectable()
export class NotificationService {

    notifications: any;

    constructor() {
    }

    // TODO 获取消息列表
    getNotifications() {
        return this.notifications = natifactions;
    }

    // TODO 移除消息
    removeNotifications(notification) {
        const i = this.notifications.indexOf(notification);
        this.notifications = [
          ...this.notifications.slice(0, i),
          ...this.notifications.slice(i + 1)
        ];
        return this.notifications;
    }
}
