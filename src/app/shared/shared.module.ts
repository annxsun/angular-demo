import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialComponentsModule } from './material.module';
import { MyComponentModule } from './mycomponent.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialComponentsModule,
        MyComponentModule
     ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormsModule,
        FlexLayoutModule,
        MaterialComponentsModule,
        MyComponentModule
    ],
    providers: [],
})
export class SharedModule {}
