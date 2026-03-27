import { useTranslation } from 'react-i18next'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import FavoriteListRow from './FavoriteListRow'
import CustomDrawer from '../mui/CustomDrawer'
import {
    useFavoritesByGameType,
    useRemoveFavoriteItem
} from '../../../stores/favoriteList/favoriteList.selector'
import type { IGameType } from '../../../types/common'

interface Props {
    open: boolean
    onClose: () => void
    gameType: IGameType
    onApply?: (numbers: string[]) => void
}

const FavoriteListDrawer: React.FC<Props> = (props) => {
    const { t } = useTranslation('common')
    const favorites = useFavoritesByGameType(props.gameType)
    const removeFavoriteItem = useRemoveFavoriteItem()

    const handleApply = (numbers: string[]) => {
        props.onApply?.(numbers)
    }

    return (
        <CustomDrawer
            open={props.open}
            onClose={props.onClose}
            title={`${t('appBarGame.favoriteList')} (${favorites.length})`}
        >
            {favorites.length === 0 ? (
                <Typography variant='body2' color='text.secondary' textAlign='center' py={4}>
                    {t('appBarGame.emptyFavoriteList')}
                </Typography>
            ) : (
                <Stack spacing={1.5}>
                    {favorites.map((item) => (
                        <FavoriteListRow
                            key={item.id}
                            id={item.id}
                            numbers={item.numbers}
                            color={item.color}
                            onDelete={removeFavoriteItem}
                            onApply={handleApply}
                        />
                    ))}
                </Stack>
            )}
        </CustomDrawer>
    )
}

export default FavoriteListDrawer
