import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';
import { NavigationComponent } from './navigation.component';

@NgModule({
    imports: [SharedModule],
    declarations: [
        NavigationItemComponent,
        NavigationComponent
    ],
    exports: [NavigationComponent],
})
export class NavigationeModule {}
