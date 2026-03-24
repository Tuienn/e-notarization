import Ball3D from './Ball3D'
import Stack from '@mui/material/Stack'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useNotify } from '../../../stores/notification/notification.selector'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import type { IBall3DColor } from '../../../types/common'

interface Props {
    numbers: string[]
    color: IBall3DColor
    indexText?: string
    lastColor?: IBall3DColor
}

const TicketRow: React.FC<Props> = (props) => {
    const [isFavorite, setIsFavorite] = useState(false)
    const notify = useNotify()
    const { t } = useTranslation('common')

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite)
        notify(isFavorite ? t('favoriteNumberSequence.remove') : t('favoriteNumberSequence.add'), 'success')
    }

    return (
        <Stack direction='row' alignItems={'center'}>
            {props.indexText && (
                <Box minWidth={'4ch'}>
                    <Typography variant='h6' fontWeight={'bold'} color='text.secondary'>
                        {props.indexText}
                    </Typography>
                </Box>
            )}
            <Stack direction='row' spacing={{ xs: 0.5, sm: 1, md: 1.5 }} mr={{ xs: 0.5, sm: 1, md: 1.5 }}>
                {props.numbers.map((number, index) => (
                    <Ball3D
                        key={index}
                        content={number}
                        color={index === props.numbers.length - 1 && props.lastColor ? props.lastColor : props.color}
                    />
                ))}
            </Stack>
            <IconButton size='small' onClick={handleFavoriteClick}>
                {!isFavorite ? <FavoriteBorderIcon /> : <FavoriteIcon color='primary' />}
            </IconButton>
            <IconButton size='small' color='error'>
                <DeleteOutlineIcon />
            </IconButton>
        </Stack>
    )
}

export default TicketRow
