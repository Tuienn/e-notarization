import { useShallow } from 'zustand/react/shallow'
import { useFavoriteListStore } from './favoriteList.store'
import type { IGameType } from '../../types/common'

export const useFavoriteListState = () => useFavoriteListStore((state) => state.favoriteList)

export const useAddFavoriteItem = () => useFavoriteListStore((state) => state.addFavoriteItem)

export const useRemoveFavoriteItem = () => useFavoriteListStore((state) => state.removeFavoriteItem)

// NOTE - useShallow prevents infinite loop: .filter() creates a new array reference every render,
// shallow comparison checks element-by-element instead of reference equality
export const useFavoritesByGameType = (gameType: IGameType) =>
    useFavoriteListStore(
        useShallow((state) => state.favoriteList.filter((item) => item.type === gameType))
    )

// NOTE - Returns the id of the matched favorite, or null if not favorited
// Returns a primitive so reference equality is safe here (no useShallow needed)
export const useFavoriteId = (gameType: IGameType | undefined, numbers: string[]) => {
    const key = numbers.join(',')
    return useFavoriteListStore((state) => {
        if (!gameType) return null
        return state.favoriteList.find((item) => item.type === gameType && item.numbers.join(',') === key)?.id ?? null
    })
}
