import { AsyncLocalStorage } from 'async_hooks';

type Store = Map<string, any>;

export const cls = new (class {
  readonly als = new AsyncLocalStorage<Store>();

  run(fn: (...args: any[]) => void) {
    this.als.run(new Map(), fn);
  }

  set(key: string, value: any) {
    const store = this.als.getStore();
    if (store) store.set(key, value);
  }

  get<T>(key: string): T | undefined {
    const store = this.als.getStore();
    return store?.get(key);
  }
})();
