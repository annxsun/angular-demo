import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { HeaderModule } from './header/header.module';
import { NavigationeModule } from './navigation/navigation.module';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout.component';
import { LoadingComponent } from '../shared/loading/loading.component';
import { LoadingService } from '../shared/loading/loading.service';

@NgModule({
  imports: [
    SharedModule,
    NavigationeModule,
    HeaderModule,
    RouterModule
  ],
  declarations: [
    FooterComponent,
    LayoutComponent,
    LoadingComponent
  ],
  exports: [LayoutComponent],
  providers: [LoadingService]
})
export class LayoutModule { }
