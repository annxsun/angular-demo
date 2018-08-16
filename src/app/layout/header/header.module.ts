import { NgModule } from '@angular/core';

import { DocumentCloseDirective } from '../../directive/documentclose.directive';
import { SharedModule } from '../../shared/shared.module';
import { UserComponent } from './user/user.component';
import { NotificationComponent } from './notification/notification.component';
import { HeaderComponent } from './header.component';
import { BrandComponent } from './brand/brand.component';
import { NotificationService } from './notification/notification.service';


@NgModule({
    declarations: [
        UserComponent,
        NotificationComponent,
        HeaderComponent,
        BrandComponent,
        DocumentCloseDirective
    ],
    imports: [SharedModule],
    exports: [HeaderComponent],
    providers: [
        {provide: 'notificationService', useClass: NotificationService}
    ],
})
export class HeaderModule {}
