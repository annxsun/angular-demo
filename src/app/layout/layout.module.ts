import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { HeaderModule } from './header/header.module';
import { NavigationeModule } from './navigation/navigation.module';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout.component';


@NgModule({
  imports: [
    SharedModule,
    NavigationeModule,
    HeaderModule,
    RouterModule
  ],
  declarations: [
    FooterComponent,
    LayoutComponent
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
