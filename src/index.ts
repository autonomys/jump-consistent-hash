/**
 * @param {Uint8Array} key 8 bytes (represents uint64 number)
 * @param {number} numBuckets Up to 32-bit number
 *
 * @return {number} Bucket from `[0, numBuckets)` range
 */
export function jumpConsistentHash(key: Uint8Array, numBuckets: number): number {
    let keyBigInt = Buffer.from(key).readBigUInt64BE();
    let b = -1n;
    let j = 0n;
    while (j < numBuckets) {
        b = j;
        // We fit the number after multiplication within 64-bit range, just like in C++ implementation from paper
        keyBigInt = (keyBigInt * 2862933555777941757n) % (2n ** 64n) + 1n;
        // Here we need to divide numbers as double (like in C++ implementation from paper), hence converting back to numbers for that
        // tslint:disable-next-line:no-bitwise
        j = BigInt(Math.floor((Number(b) + 1) * Number(1n << 31n) / Number((keyBigInt >> 33n) + 1n)));
    }
    return Number(b);
}
