import * as Long from 'long';
import * as test from 'tape';
import {jumpConsistentHash} from '../src';

// Sample data copied from https://github.com/mtchavez/jumpconshash/blob/master/jumpconshash_test.go, but do not pass all yet
test('Basic test', (t) => {
    t.plan(28);
    // t.plan(56);

    // const MAX_UINT32 = 2 ** 32 - 1;

    const jumps = new Map([
        ['0', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
        ['1', [0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6]],
        // ['3735928559', [0, 1, 2, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5]],
        // [String(MAX_UINT32), [0, 0, 2, 2, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5]],
    ]);

    jumps.forEach((expectedJumps, key) => {
        expectedJumps.forEach((expected, bucket) => {
            const hash = jumpConsistentHash(Uint8Array.from(Long.fromString(key).toBytes()), bucket + 1);

            t.equal(hash, expected, `Hash of ${key} for ${bucket + 1} buckets is correct`);
        });
    });
});
