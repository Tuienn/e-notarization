import type { IBall3DColor, IGameType } from '../../types/common'

export interface IFavoriteItem {
    id: string
    type: IGameType
    numbers: string[]
    color: IBall3DColor
}

export interface IFavoriteListState {
    favoriteList: IFavoriteItem[]
    addFavoriteItem: (item: Omit<IFavoriteItem, 'id'>) => void
    removeFavoriteItem: (id: string) => void
}
