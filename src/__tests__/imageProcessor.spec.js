/* global describe, it, expect */
import {distinctImages, imreadObs, brgToGrayObs} from '../imageProcessing';
import {of, from} from 'rxjs';
import {first, count} from 'rxjs/operators';
import path from 'path';

describe('imreadObs', () => {
    it('load images from the disk', async () => {
        let result = await of(path.resolve(__dirname, './test-white.png'))
            .pipe(
                imreadObs(),
                first()
            ).toPromise();
        expect(result.rows).toEqual(100);
    });
});

describe('brgToGrayObs', () => {
    it('turns an image into a grayscale', async () => {
        let result = await of(path.resolve(__dirname, './test-white.png'))
            .pipe(
                imreadObs(),
                brgToGrayObs(),
                first()
            ).toPromise();
        expect(result.channels).toEqual(1);
    });
});

describe('distinctImages', () => {
    it('returns a list of images that are distinct to each other', async () => {
        let cnt = await from([
            path.resolve(__dirname, './test-white.png'),
            path.resolve(__dirname, './test-white.png'),
            path.resolve(__dirname, './test-black.png'),
            path.resolve(__dirname, './test-black.png'),
            path.resolve(__dirname, './test-black.png'),
            path.resolve(__dirname, './test-white.png')

        ])
            .pipe(
                imreadObs(),
                brgToGrayObs(),
                distinctImages({}),
                count()
            ).toPromise();
        expect(cnt).toEqual(3);
    });
});