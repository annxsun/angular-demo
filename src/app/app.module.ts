import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { NgxEchartsModule } from 'ngx-echarts';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './view/user/user.module';
import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { HttpRequestService } from './service/http-request.service';
// TODO mock
import { UserMockService } from './service/mock/user-mock.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    UserModule,
    LayoutModule,
    AppRoutingModule,
    HttpClientModule,
    NgxEchartsModule,
    HttpClientInMemoryWebApiModule.forRoot(
      UserMockService, { dataEncapsulation: false }
    ),
  ],
  providers: [HttpRequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
