import type { IBall3DColor, IGameType } from '../../types/common'

export interface IFavoriteItem {
    type: IGameType
    numbers: string[]
    color: IBall3DColor
}

export interface IFavoriteListState {
    favoriteList: IFavoriteItem[]
    addFavoriteItem: (favoriteItem: IFavoriteItem) => void
    removeFavoriteItem: (index: number) => void
}
