import Ball3D from './Ball3D'
import Stack from '@mui/material/Stack'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import IconButton from '@mui/material/IconButton'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import AlertDialog from '../mui/AlertDialog'
import Typography from '@mui/material/Typography'
import type { IBall3DColor } from '../../../types/common'

interface Props {
    numbers: string[]
    color: IBall3DColor
}

const RowFavoriteList: React.FC<Props> = (props) => {
    const { t } = useTranslation('common')
    const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false)
    return (
        <Stack direction='row' alignItems={'center'}>
            <Stack direction='row' flex={1} spacing={{ xs: 0.5, sm: 1, md: 1.5 }} mr={{ xs: 0.5, sm: 1, md: 1.5 }}>
                {props.numbers.map((number) => (
                    <Ball3D content={number} color={props.color} />
                ))}
            </Stack>
            <IconButton size='small'>
                <ArrowOutwardIcon />
            </IconButton>
            <IconButton size='small' color='error' onClick={() => setOpenConfirmDeleteDialog(true)}>
                <DeleteOutlineIcon />
            </IconButton>
            <AlertDialog
                open={openConfirmDeleteDialog}
                onClose={() => setOpenConfirmDeleteDialog(false)}
                title={t('dialog.confirm')}
                onOk={() => setOpenConfirmDeleteDialog(false)}
            >
                <Typography>{t('appBarGame.deleteRowFavoriteList')}</Typography>
            </AlertDialog>
        </Stack>
    )
}

export default RowFavoriteList
