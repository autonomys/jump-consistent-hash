import * as test from 'tape';
import {jumpConsistentHash} from '../src';

// Sample data copied from https://github.com/mtchavez/jumpconshash/blob/master/jumpconshash_test.go, but do not pass all yet
test('Basic test', (t) => {
    t.plan(56);

    const jumps = new Map([
        [0n, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
        [1n, [0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6]],
        [3735928559n, [0, 1, 2, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5]],
        [2n ** 32n - 1n, [0, 0, 2, 2, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5]],
    ]);

    jumps.forEach((expectedJumps, key) => {
        const buffer = new ArrayBuffer(8);
        const view = new DataView(buffer);
        view.setBigUint64(0, key, false);
        const uint8Key = new Uint8Array(buffer);
        expectedJumps.forEach((expected, bucket) => {
            const hash = jumpConsistentHash(uint8Key, bucket + 1);

            t.equal(hash, expected, `Hash of ${key} for ${bucket + 1} buckets is correct`);
        });
    });
});
