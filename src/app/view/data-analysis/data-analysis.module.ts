import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DataAnalysisRoutingModule } from './data-analysis.routing';
import { DataAnalysisService } from './data-analysis.service';
import { OverviewOneComponent } from './overview/overview-one/overview-one.component';
import { OverviewTwoComponent } from './overview/overview-two/overview-two.component';
import { OverviewThreeComponent } from './overview/overview-three/overview-three.component';

@NgModule({
    declarations: [
        OverviewOneComponent,
        OverviewTwoComponent,
        OverviewThreeComponent
    ],
    imports: [
        SharedModule,
        DataAnalysisRoutingModule,
    ],
    exports: [],
    providers: [DataAnalysisService],
})
export class DataAnalysisModule {}
