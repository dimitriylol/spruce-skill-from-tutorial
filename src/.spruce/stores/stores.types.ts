import CatsStore from '../../stores/Cats.store'

declare module '@sprucelabs/data-stores/build/types/stores.types' {
	interface StoreMap {
                cats: CatsStore
	}

	interface StoreOptionsMap {
                cats: Omit<Parameters<typeof CatsStore['Store']>[0], keyof UniversalStoreOptions>   
        }
}