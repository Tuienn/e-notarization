import { create } from 'zustand'
import type { IFavoriteListState } from './favoriteList.types'

export const useFavoriteListStore = create<IFavoriteListState>((set) => ({
    favoriteList: [],
    addFavoriteItem: (favoriteItem) =>
        set((state) => ({
            favoriteList: [...state.favoriteList, favoriteItem]
        })),
    removeFavoriteItem: (index) =>
        set((state) => ({
            favoriteList: state.favoriteList.filter((_, i) => i !== index)
        }))
}))
