
class TimeLimitedCache {
  private cache: Map<number, { value: number, expiresAt: number }>;

  constructor() {
      this.cache = new Map();
  }
  
  set(key: number, value: number, duration: number): boolean {
      const now = Date.now();
      const isExisting = this.cache.has(key) && this.cache.get(key)!.expiresAt > now;

      // Calculate expiration time and update cache
      const expiresAt = now + duration;
      this.cache.set(key, { value, expiresAt });

      // Schedule removal of the key after the duration has passed
      setTimeout(() => {
          if (this.cache.has(key) && this.cache.get(key)!.expiresAt <= Date.now()) {
              this.cache.delete(key);
          }
      }, duration);

      return isExisting;
  }
  
  get(key: number): number {
      const now = Date.now();
      const entry = this.cache.get(key);

      // Check if entry exists and is unexpired
      if (entry && entry.expiresAt > now) {
          return entry.value;
      } else {
          return -1;
      }
  }
  
  count(): number {
      const now = Date.now();
      let activeCount = 0;

      // Count entries that are still unexpired
      for (const { expiresAt } of this.cache.values()) {
          if (expiresAt > now) {
              activeCount++;
          }
      }
      
      return activeCount;
  }
}

/**
* Example Usage:
* const timeLimitedCache = new TimeLimitedCache();
* timeLimitedCache.set(1, 42, 100); // false
* timeLimitedCache.get(1); // 42
* timeLimitedCache.count(); // 1
*/
const timeLimitedCache = new TimeLimitedCache();
console.log(timeLimitedCache)
//console.log(timeLimitedCache.set(1, 42, 1000));

console.log(timeLimitedCache)
console.log(timeLimitedCache.get(1));
console.log(timeLimitedCache.count())
console.log(timeLimitedCache.get(1));



console.log(Date.now())
console.log(timeLimitedCache)
