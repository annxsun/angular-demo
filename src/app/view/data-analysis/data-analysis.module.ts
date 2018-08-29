import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { DataAnalysisRoutingModule } from './data-analysis.routing';
import { DataAnalysisService } from './data-analysis.service';
import { OverviewOneComponent } from './overview/overview-one/overview-one.component';

@NgModule({
    declarations: [
        OverviewOneComponent,
    ],
    imports: [
        SharedModule,
        DataAnalysisRoutingModule,
    ],
    exports: [],
    providers: [DataAnalysisService],
})
export class DataAnalysisModule {}
