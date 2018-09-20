import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatIconModule } from '@angular/material';

import { JointjsPanelComponent } from './Component/jointjs-panel/jointjs-panel.component';
import { JointjsToolComponent } from './Component/jointjs-tool/jointjs-tool.component';
import { JointjsCanvasComponent } from './Component/jointjs-canvas/jointjs-canvas.component';
import { JointjsComponent } from './component/jointjs.component';
import { JointjsService } from './jointjs.service';
import { DraggableDirective } from './directive/draggable.directive';
import { MovableDirective } from './directive/movable.directive';

@NgModule({
    declarations: [
        JointjsPanelComponent,
        JointjsToolComponent,
        JointjsCanvasComponent,
        JointjsComponent,
        DraggableDirective,
        MovableDirective
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [
        JointjsComponent,
        DraggableDirective,
        MovableDirective
    ],
    providers: [
        JointjsService
    ],
})
export class JointjsModule {}
