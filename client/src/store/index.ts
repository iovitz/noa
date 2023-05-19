import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

export const pinia = createPinia();
pinia.use(
  createPersistedState({
    storage: {
      getItem(key: string): string | null {
        key = 'pinia_store_' + key
        return uni.getStorageSync(key)
      },
      setItem(key: string, value: string) {
        key = 'pinia_store_' + key
        uni.setStorageSync(key, value)
      },
    },
  }),
)
