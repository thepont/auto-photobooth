import gphoto2 from 'gphoto2';
import {flatMap} from 'rxjs/operators';
import {from, of} from 'rxjs';
import {retryBackoff} from 'backoff-rxjs';
const GPhoto = new gphoto2.GPhoto2();

export function listCameras(){
    return new Promise((resolve) => {
        GPhoto.list(resolve);
    });
}
function takePicturePromise(camera){
    return new Promise((resolve, reject) => {
        camera.takePicture({
            download: true,
            keep: false
        },
        (err, data) => {
            console.log(typeof data);
            if(err)
                console.log('I GOT AN ERROR', err);
            return err ? reject(err): resolve(data);
        });
    });
}


export function takePicture({camera}){
    return (obs) => {
        return obs.pipe(
            flatMap(() => {
                return from(takePicturePromise(camera)).pipe(retryBackoff({initialInterval: 100}));
            })
        );
    };
}
