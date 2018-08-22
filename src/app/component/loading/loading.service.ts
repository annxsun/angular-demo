import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoadingService {

    source: Subject<string> = new Subject<string> ();

    start() {
        this.source.next('start');
    }

    stop() {
        this.source.next('stop');
    }
}
