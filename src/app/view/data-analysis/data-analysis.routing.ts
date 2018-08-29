import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { OverviewOneComponent } from './overview/overview-one/overview-one.component';

const routes: Routes = [
    { path: 'overview1', component: OverviewOneComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DataAnalysisRoutingModule {}
