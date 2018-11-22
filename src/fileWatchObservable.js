import {Subject} from 'rxjs';
import fs from 'fs';

export function fileWatchSubject(path){
    let fileWatchSubject = new Subject();
    fs.watch(path, (eventType, filename) => {
        fileWatchSubject.next({
            eventType,
            filename
        });
    })
    return fileWatchSubject;
}
