import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { UserRoutingModule } from './user.routing';
import { SignInComponent } from './signin/sign-in.component';
import { SignUpComponent } from './signup/sign-up.component';
import { UserService } from './user.service';

@NgModule({
    declarations: [
        SignInComponent,
        SignUpComponent
    ],
    imports: [
        SharedModule,
        UserRoutingModule,
    ],
    exports: [],
    providers: [UserService],
})
export class UserModule {}
