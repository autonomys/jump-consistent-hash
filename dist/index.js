(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @param {Uint8Array} key 8 bytes (represents uint64 number)
     * @param {number} numBuckets Up to 32-bit number
     *
     * @return {number} Bucket from `[0, numBuckets)` range
     */
    function jumpConsistentHash(key, numBuckets) {
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
    exports.jumpConsistentHash = jumpConsistentHash;
});
//# sourceMappingURL=index.js.map