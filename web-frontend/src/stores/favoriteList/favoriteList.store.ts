import { create } from 'zustand'
import type { IFavoriteListState } from './favoriteList.types'

const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2)

export const useFavoriteListStore = create<IFavoriteListState>((set) => ({
    favoriteList: [],
    addFavoriteItem: (item) =>
        set((state) => ({
            favoriteList: [...state.favoriteList, { ...item, id: generateId() }]
        })),
    removeFavoriteItem: (id) =>
        set((state) => ({
            favoriteList: state.favoriteList.filter((item) => item.id !== id)
        }))
}))
