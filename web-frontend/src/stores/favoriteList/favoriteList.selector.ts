import { useFavoriteListStore } from './favoriteList.store'

export const useFavoriteListState = () => useFavoriteListStore((state) => state.favoriteList)

export const useAddFavoriteItem = () => useFavoriteListStore((state) => state.addFavoriteItem)
export const useRemoveFavoriteItem = () => useFavoriteListStore((state) => state.removeFavoriteItem)
