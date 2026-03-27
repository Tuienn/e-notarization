import Ball3D from './Ball3D'
import Stack from '@mui/material/Stack'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditNoteIcon from '@mui/icons-material/EditNote'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useNotify } from '../../../stores/notification/notification.selector'
import {
    useAddFavoriteItem,
    useFavoriteId,
    useRemoveFavoriteItem
} from '../../../stores/favoriteList/favoriteList.selector'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import type { IBall3DColor, IGameType } from '../../../types/common'

interface Props {
    numbers: string[]
    color: IBall3DColor
    indexText?: string
    lastColor?: IBall3DColor
    onDelete?: () => void
    onEdit?: () => void
    isEditing?: boolean
    gameType?: IGameType
}

const TicketRow: React.FC<Props> = (props) => {
    const notify = useNotify()
    const { t } = useTranslation('common')

    const favoriteId = useFavoriteId(props.gameType, props.numbers)
    const isFavorite = favoriteId !== null
    const addFavoriteItem = useAddFavoriteItem()
    const removeFavoriteItem = useRemoveFavoriteItem()

    const handleFavoriteClick = () => {
        if (!props.gameType) return
        if (isFavorite && favoriteId) {
            removeFavoriteItem(favoriteId)
            notify(t('favoriteNumberSequence.remove'), 'success')
        } else {
            addFavoriteItem({ type: props.gameType, numbers: props.numbers, color: props.color })
            notify(t('favoriteNumberSequence.add'), 'success')
        }
    }

    return (
        <Stack
            direction='row'
            alignItems={'center'}
        >
            {props.indexText && (
                <Box minWidth={'4ch'}>
                    <Typography
                        variant='h6'
                        fontWeight={'bold'}
                        color={props.isEditing ? 'primary.main' : 'text.secondary'}
                        sx={{ transition: 'color 0.2s ease' }}
                    >
                        {props.indexText}
                    </Typography>
                </Box>
            )}
            <Stack
                direction='row'
                spacing={{ xs: 0.5, sm: 1, md: 1.5 }}
                mr={{ xs: 0.5, sm: 1, md: 1.5 }}
                flex={1}
                onClick={props.onEdit}
                sx={{ cursor: props.onEdit ? 'pointer' : 'default' }}
            >
                {props.numbers.map((number, index) => (
                    <Ball3D
                        key={index}
                        content={number}
                        color={index === props.numbers.length - 1 && props.lastColor ? props.lastColor : props.color}
                    />
                ))}
            </Stack>
            <IconButton size='small' onClick={handleFavoriteClick} disabled={!props.gameType}>
                {isFavorite ? <FavoriteIcon color='primary' /> : <FavoriteBorderIcon />}
            </IconButton>
            <IconButton size='small' color='error' onClick={props.onDelete}>
                <DeleteOutlineIcon />
            </IconButton>
        </Stack>
    )
}

export default TicketRow
