import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SignInComponent } from './signin/sign-in.component';
import { SignUpComponent } from './signup/sign-up.component';

const routes: Routes = [
    { path: 'signin', component: SignInComponent },
    { path: 'signup', component: SignUpComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}
