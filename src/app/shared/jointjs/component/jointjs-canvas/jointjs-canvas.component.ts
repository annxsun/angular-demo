import { Component, ViewChild, ElementRef, Input } from "@angular/core"
import * as joint from "jointjs"
import * as $ from "jquery";

@Component({
    templateUrl: "./jointjs-canvas.component.html",
    selector: "app-jointjs-canvas",
    styleUrls: ["./jointjs-canvas.component.scss"]
})
export class JointjsCanvasComponent {
    mGraph: joint.dia.Graph;
    mPaper: joint.dia.Paper;

    @ViewChild("canvas")
    canvasRef: ElementRef;

    constructor() {
    }

    ngAfterViewInit() {
   

    }
    /**画布初始化 */
    initPaper(width:number,height:number) {
        //绘制当前模块
        this.mGraph = new joint.dia.Graph();
        this.mPaper = new joint.dia.Paper({
            el: this.canvasRef.nativeElement,
            width: 800,
            height: 800,
            model: this.mGraph,
            snapLinks: true,
            defaultLink: new (joint.shapes as any).pass.link(),
            interactive: false,
        });
    }

  
    onDragOver($event) {
        // alert(0);
        $event.preventDefault();
    }

    /**拖拽结束 */
    onDrop($event) {
        alert($event.dataTransfer.getData('name'));
        $event.preventDefault();
    }
}