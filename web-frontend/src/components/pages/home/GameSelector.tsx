import { Link } from '@tanstack/react-router'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'

interface Props {
    imageUrl: string
    primaryColor: string
    status: string
    time: {
        periodNumber: number
        weekday: string
        date: string
    }
    jackpotValue: string
    countdown: {
        hours: string
        minutes: string
        seconds: string
    }
    hrefTo: string
}

const GameSelector: React.FC<Props> = (props) => {
    return (
        <Paper elevation={3} sx={{ position: 'relative', overflow: 'hidden', borderRadius: 2, width: '100%', p: 2 }}>
            <Box
                position={'absolute'}
                top={0}
                left={0}
                zIndex={1}
                sx={{
                    borderBottomRightRadius: '8px'
                }}
                bgcolor={props.primaryColor}
                fontWeight={600}
                px={2}
                py={0.75}
                color='common.white'
            >
                {props.status}
            </Box>

            <Stack direction={'row'} alignItems='center'>
                <img src={props.imageUrl} alt='Game' width={'25%'} />

                <Stack flexGrow={1} gap={1} alignItems={'center'}>
                    <Typography variant='h5' fontWeight={600} color={props.primaryColor}>
                        {props.jackpotValue}
                    </Typography>

                    <Box
                        px={2}
                        py={0.5}
                        borderTop='1px solid #333'
                        borderBottom='1px solid #333'
                        fontFamily='monospace'
                        fontWeight={700}
                        fontSize={20}
                        letterSpacing={2}
                    >
                        {props.countdown.hours} : {props.countdown.minutes} : {props.countdown.seconds}
                    </Box>
                </Stack>
                <Stack spacing={1.5} alignItems={{ xs: 'center', sm: 'flex-end' }}>
                    <Box textAlign={'right'}>
                        <Typography fontSize={14}>
                            <strong>#{props.time.periodNumber}</strong>
                        </Typography>
                        <Typography fontSize={14}>{props.time.weekday}</Typography>
                        <Typography fontSize={14}>{props.time.date}</Typography>
                    </Box>

                    <Button component={Link} to={props.hrefTo} variant='contained' sx={{ bgcolor: props.primaryColor }}>
                        Chơi ngay
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    )
}

export default GameSelector
