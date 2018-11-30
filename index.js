
// const {distinctUntilChanged, flatMap, tap} = require('rxjs/operators');
const {distinctImages, matFromBufferObs, brgToGrayObs} = require ('./dist/imageProcessing');
const {interval} = require('rxjs');
const {takePicture, listCameras} = require('./dist/gphoto');
listCameras().then((cameras) => {
    let [camera] = cameras;
    interval(5000)
        .pipe(
            takePicture({camera}),
            // retry(100),
            matFromBufferObs(),
            brgToGrayObs(),
            distinctImages({percentChange:0.1})
        )
        .subscribe(async (ii) => {
            try {
                console.log('IMAGE');
             } catch {
                 console.info("caught error in the onNext function");
             }
            
            // await cv.imwrite('./result.png', ii);
        });
});




