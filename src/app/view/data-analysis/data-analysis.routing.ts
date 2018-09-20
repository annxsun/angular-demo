import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { OverviewOneComponent } from './overview/overview-one/overview-one.component';
import { OverviewTwoComponent } from './overview/overview-two/overview-two.component';
import { OverviewThreeComponent } from './overview/overview-three/overview-three.component';

const routes: Routes = [
    { path: 'echarts/overview', component: OverviewOneComponent },
    { path: 'amap/overview', component: OverviewTwoComponent },
    { path: 'processon/overview', component: OverviewThreeComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DataAnalysisRoutingModule {}
