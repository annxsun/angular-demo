import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';
import { NavigationComponent } from './navigation.component';
import { NavigationService } from './navigation.service';

@NgModule({
    imports: [
        RouterModule,
        SharedModule
    ],
    declarations: [
        NavigationItemComponent,
        NavigationComponent
    ],
    exports: [NavigationComponent],
    providers: [
        {provide: 'navigationService', useClass: NavigationService}
    ]
})
export class NavigationeModule {}
