import {Observable} from 'rxjs';
import {distinctUntilChanged, flatMap} from 'rxjs/operators'
import cv from 'opencv4nodejs';

export const distinctImages = ({percentChange = 10, minvalue = 80}) => (obs) => {
    return obs.pipe(
        distinctUntilChanged((ii,jj) => {
            let diff = ii.absdiff(jj);
            let threshold = diff.threshold(minvalue, 255, cv.THRESH_BINARY);
            let difference = threshold.countNonZero();
            let pixelTotal = ii.rows * ii.cols;
            return difference > (pixelTotal * percentChange / 100);
        }));
};

export const imreadObs = () => (obs) => obs.pipe(flatMap(fileName => cv.imreadAsync(fileName)));

export const brgToGrayObs = () => (obs) => obs.pipe(flatMap(mat => mat.bgrToGrayAsync()))
