const {fileWatchSubject} = require('./dist/fileWatchObservable');
const path = require('path');
const {distinctUntilChanged, flatMap, tap} = require('rxjs/operators');
const {from} = require('rxjs');
const cv = require('opencv4nodejs');

from([{filename: './images/1.png'}, {filename: './images/2.png'}, {filename: './images/3.png'}])
    .pipe(
        distinctUntilChanged((ii,jj) => ii.filename === jj.filename),
        flatMap(ii => cv.imreadAsync(ii.filename)),
        flatMap(ii => ii.bgrToGrayAsync()),
        distinctUntilChanged((ii,jj) => {
            let diff = ii.absdiff(jj);
            let threshold = ii.threshold(80, 255, cv.THRESH_BINARY)
            let difference = threshold.countNonZero();
            return difference < 1;
        })
    )
    .subscribe(async (ii) => {
        console.log('IMAGE')
        await cv.imwrite('./result.png', ii);
    });



const distinctImages => ({percentChange, threshold}) = (obs) =>{
    obs.
        distinctUntilChanged((ii,jj) => {
            let diff = ii.absdiff(jj);
            let threshold = ii.threshold(threshold, 255, cv.THRESH_BINARY)
            let difference = threshold.countNonZero();
            let pixelTotal = ii.rows * ii.cols;
            return difference < (pixelTotal * percentChange / 100);
        })
}
