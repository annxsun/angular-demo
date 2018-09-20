import { Component, ViewChild, ElementRef, Input } from "@angular/core"

@Component({
    templateUrl: "./jointjs-panel.component.html",
    selector: "app-jointjs-panel",
    styleUrls: ["./jointjs-panel.component.scss"]
})
export class JointjsPanelComponent {
 
    panelItems = [
        {
            type: 'topology',
            title: '拓扑设计',
            show: true,
            listDate: [
            {
                code: 'ConfigMap',
                fileName: 'Kubernetes.Application.ConfigMap',
                displayValue: 'ConfigMap'
            },
            {
                code: 'DaemonSet',
                fileName: 'Kubernetes.Application.DaemonSet',
                displayValue: 'DaemonSet'
            },
            {
                code: 'Deployment',
                fileName: 'Kubernetes.Application.Deployment',
                displayValue: 'Deployment'
            },
            {
                code: 'Endpoints',
                fileName: 'Kubernetes.Application.Endpoints',
                displayValue: 'Endpoints'
            },
            {
                code: 'ExternalComponent',
                fileName: 'Kubernetes.Application.ExternalComponent',
                displayValue: 'ExternalComponent'
            },
            {
                code: 'Group',
                fileName: 'Kubernetes.Application.Group',
                displayValue: 'Group'
            },
            {
                code: 'Ingress',
                fileName: 'Kubernetes.Application.Ingress',
                displayValue: 'Ingress'
            },
            {
                code: 'PersistentVolumeClaim',
                fileName: 'Kubernetes.Application.PersistentVolumeClaim',
                displayValue: 'PersistentVolumeClaim'
            }
            ]
        }
    ]
    constructor() {
    }

    ngAfterViewInit() {
   

    }

    onDragStart($event){
       console.log('START');
    }

    onDragMove(event) {
        console.log(`move-x: ${event.clientX}, move-y: ${event.clientY}`)
    }

    onDragEnd($event) {
       console.log('END');
    }
  
  
}