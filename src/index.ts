import * as Long from 'long';

/**
 * @param {Uint8Array} key 8 bytes (represents uint64 number)
 * @param {number} numBuckets Up to 32-bit number
 *
 * @return {number} Bucket from `[0, numBuckets)` range
 */
export function jumpConsistentHash(key: Uint8Array, numBuckets: number): number {
    let keyLong = Long.fromBytes(Array.from(key), true);
    let b = -1;
    const OFFSET = Long.fromString('2862933555777941757');
    const MAX_INT = 2 ** 31;
    let j = 0;
    while (j < numBuckets) {
        b = j;
        keyLong = keyLong.mul(OFFSET).add(1);
        j = Math.floor(
            (b + 1) * (MAX_INT / keyLong.shiftRight(33).add(1).toInt()),
        );
    }
    return b;
}
