import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { SignUpComponent } from './view/user/signup/sign-up.component';
import { SignInComponent } from './view/user/signin/sign-in.component';

const routes: Routes = [
    { path: '', redirectTo: '/signin', pathMatch: 'full' },
    { path: 'signin', component: SignInComponent },
    { path: 'signup', component: SignUpComponent },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
              path: 'http',
              loadChildren: './view/myhttp/myhttp.module#MyHttpModule'
            },
        ]
    },
    { path: '**', redirectTo: '', component: SignInComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class AppRoutingModule {}
