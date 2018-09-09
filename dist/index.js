(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "long"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Long = require("long");
    /**
     * @param {Uint8Array} key 8 bytes (represents uint64 number)
     * @param {number} numBuckets Up to 32-bit number
     *
     * @return {number} Bucket from `[0, numBuckets)` range
     */
    function jumpConsistentHash(key, numBuckets) {
        let keyLong = Long.fromBytes(Array.from(key), true);
        let b = -1;
        const OFFSET = Long.fromString('2862933555777941757');
        const MAX_INT = Math.pow(2, 31);
        let j = 0;
        while (j < numBuckets) {
            b = j;
            keyLong = keyLong.mul(OFFSET).add(1);
            j = Math.floor((b + 1) * (MAX_INT / keyLong.shiftRight(33).add(1).toInt()));
        }
        return b;
    }
    exports.jumpConsistentHash = jumpConsistentHash;
});
//# sourceMappingURL=index.js.map