import Ball3D from './Ball3D'
import Stack from '@mui/material/Stack'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CachedIcon from '@mui/icons-material/Cached'

interface Props {
    indexText?: string
    count: number
    onDelete: () => void
}

const EmptyTicketRow: React.FC<Props> = (props) => {
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
                {Array.from({ length: props.count }).map((_, index) => (
                    <Ball3D key={index} color='gray' />
                ))}
            </Stack>
            <IconButton size='small'>
                <CachedIcon />
            </IconButton>
            <IconButton size='small' color='error' onClick={props.onDelete}>
                <DeleteOutlineIcon />
            </IconButton>
        </Stack>
    )
}

export default EmptyTicketRow
