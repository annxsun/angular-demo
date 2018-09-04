import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

    private show = false;
    private count = 0;

    constructor(private service: LoadingService) {
        this.service.source.subscribe(signal => {
            if (signal === 'start') {
                this.count ++;
                this.show = true;
            } else {
                this.count = this.count > 0 ? this.count - 1 :  0;
                if (this.count <= 0) {
                    this.show = false;
                }
            }
        });
    }

    ngOnInit(): void {

    }
}
