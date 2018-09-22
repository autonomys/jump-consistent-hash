# Jump-consistent hash implementation
Read https://arxiv.org/abs/1406.2294 for details, this package works with 64-bit/8-byte inputs in form of `Uint8Array`s.

## How to install
```
npm install @subspace/jump-consistent-hash
```

## How to use
TypeScript:
```typescript
import {randomBytes} from 'crypto';
import {jumpConsistentHash} from '@subspace/jump-consistent-hash';

const bucket = jumpConsistentHash(randomBytes(8), 10);
```

## API
### jumpConsistentHash.jumpConsistentHash(key: Uint8Array, numBuckets: number): number
Takes a key and number of buckets and returns bucket from range `[0, numBuckets)`.

* `key` - 8 bytes key
* `numBuckets` - number of buckets to which keys should be distributed
