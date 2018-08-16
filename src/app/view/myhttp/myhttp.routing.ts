import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
    { path: 'list', component: ListComponent },
    { path: 'create', component: CreateComponent },
    { path: 'upload', component: UploadComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MyHttpRoutingModule {}
