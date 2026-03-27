import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import Ball3D from './Ball3D'
import AlertDialog from '../mui/AlertDialog'
import type { IBall3DColor } from '../../../types/common'

interface Props {
    id: string
    numbers: string[]
    color: IBall3DColor
    onDelete: (id: string) => void
    onApply?: (numbers: string[]) => void
}

const FavoriteListRow: React.FC<Props> = (props) => {
    const { t } = useTranslation('common')
    const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false)

    const handleConfirmDelete = () => {
        props.onDelete(props.id)
        setOpenConfirmDeleteDialog(false)
    }

    return (
        <Stack direction='row' alignItems={'center'}>
            <Stack direction='row' flex={1} spacing={{ xs: 0.5, sm: 1, md: 1.5 }} mr={{ xs: 0.5, sm: 1, md: 1.5 }}>
                {props.numbers.map((number, index) => (
                    <Ball3D key={index} content={number} color={props.color} />
                ))}
            </Stack>
            <IconButton size='small' onClick={() => props.onApply?.(props.numbers)}>
                <ArrowOutwardIcon />
            </IconButton>
            <IconButton size='small' color='error' onClick={() => setOpenConfirmDeleteDialog(true)}>
                <DeleteOutlineIcon />
            </IconButton>
            <AlertDialog
                open={openConfirmDeleteDialog}
                onClose={() => setOpenConfirmDeleteDialog(false)}
                title={t('dialog.confirm')}
                onOk={handleConfirmDelete}
            >
                <Typography>{t('appBarGame.deleteRowFavoriteList')}</Typography>
            </AlertDialog>
        </Stack>
    )
}

export default FavoriteListRow
