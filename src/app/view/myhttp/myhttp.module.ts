import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { MyHttpRoutingModule } from './myhttp.routing';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { UploadComponent } from './upload/upload.component';
import { MyHttpService } from './myhttp.service';

@NgModule({
    declarations: [
        CreateComponent,
        ListComponent,
        UploadComponent
    ],
    imports: [
        SharedModule,
        MyHttpRoutingModule
    ],
    exports: [],
    providers: [MyHttpService],
})
export class MyHttpModule {}
