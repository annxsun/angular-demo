import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
// material module
import { MaterialComponentsModule } from './material.module';
// chart
import { NgxEchartsModule } from 'ngx-echarts';
import { BarLineComponent } from './charts/bar-line/bar-line.component';
import { PieComponent } from './charts/pie/pie.component';
// amap
import { AmapModule } from './amap/amap.module';

@NgModule({
    declarations: [
        BarLineComponent,
        PieComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        FlexLayoutModule,
        MaterialComponentsModule,
        NgxEchartsModule,
        AmapModule
     ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        FlexLayoutModule,
        MaterialComponentsModule,
        BarLineComponent,
        PieComponent,
        AmapModule
    ],
    providers: [],
})
export class SharedModule {}
