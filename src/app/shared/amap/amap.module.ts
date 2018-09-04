import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmapComponent } from './component/amap/amap.component';
import { AmapApiLoaderService } from './amap-loader.service';
import { AmapService } from './amap.service';
import { AmapAutocompleteDirective } from '../amap/directive/amap-autocomplete.directive';
import { AmapMarkerDirective } from '../amap/directive/amap-maker.directive';
import { AmapDrivingDirective } from '../amap/directive/amap-driving.direnctive';
import { AmapInfoWindowComponent } from '../amap/component/amap-info-window/amap-info-window.component';

@NgModule({
    declarations: [
        AmapComponent,
        AmapAutocompleteDirective,
        AmapMarkerDirective,
        AmapDrivingDirective,
        AmapInfoWindowComponent
    ],
    imports: [CommonModule],
    exports: [
        AmapComponent,
        AmapAutocompleteDirective,
        AmapMarkerDirective,
        AmapDrivingDirective,
        AmapInfoWindowComponent
    ],
    providers: [
        AmapService,
        {provide: 'amapApiLoaderService', useClass: AmapApiLoaderService},
        // {provide: 'amapService', useClass: AmapService},
    ],
})
export class AmapModule {}
