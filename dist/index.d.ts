/**
 * @param {Uint8Array} key 8 bytes (represents uint64 number)
 * @param {number} numBuckets Up to 32-bit number
 *
 * @return {number} Bucket from `[0, numBuckets)` range
 */
export declare function jumpConsistentHash(key: Uint8Array, numBuckets: number): number;
