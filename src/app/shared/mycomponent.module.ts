import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';
import { BarLineComponent } from '../component/charts/bar-line/bar-line.component';
import { PieComponent } from '../component/charts/pie/pie.component';

@NgModule({
    declarations: [
        BarLineComponent,
        PieComponent,
    ],
    imports: [
        NgxEchartsModule,
    ],
    exports: [
        BarLineComponent,
        PieComponent,
    ],
    providers: [
    ],
})
export class MyComponentModule {}
