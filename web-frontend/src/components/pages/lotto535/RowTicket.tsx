import Ball3D from '../../common/common/Ball3D'
import Stack from '@mui/material/Stack'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import IconButton from '@mui/material/IconButton'

interface Props {
    numbers: string[]
    color: 'green' | 'blue' | 'orange'
}

const RowTicket: React.FC<Props> = (props) => {
    return (
        <Stack direction='row' alignItems={'center'}>
            <Stack direction='row' spacing={1} mr={1}>
                {props.numbers.map((number) => (
                    <Ball3D content={number} color={props.color} />
                ))}
            </Stack>
            <IconButton size='small'>
                <FavoriteBorderIcon />
            </IconButton>
            <IconButton size='small' color='error'>
                <DeleteOutlineIcon />
            </IconButton>
        </Stack>
    )
}

export default RowTicket
