import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { UserComponent } from './user/user.component';
import { NotificationComponent } from './notification/notification.component';
import { HeaderComponent } from './header.component';
import { BrandComponent } from './brand/brand.component';

@NgModule({
    declarations: [
        UserComponent,
        NotificationComponent,
        HeaderComponent,
        BrandComponent
    ],
    imports: [SharedModule],
    exports: [HeaderComponent],
    providers: [],
})
export class HeaderModule {}
