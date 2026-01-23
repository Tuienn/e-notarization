import { Box, Card, CardContent, Typography, Button, Chip, Stack } from '@mui/material'

interface GameSelectorItemProps {
    badge?: string
    gameName: string
    drawCode: string
    drawDate: string
    jackpot: string
    numbers: number[]
    countdown: {
        hours: number
        minutes: number
        seconds: number
    }
    onPlay?: () => void
}

export default function GameSelectorItem({
    badge,
    gameName,
    drawCode,
    drawDate,
    jackpot,
    numbers,
    countdown,
    onPlay
}: GameSelectorItemProps) {
    return (
        <Card
            sx={{
                width: 340,
                borderRadius: 3,
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                position: 'relative'
            }}
        >
            {/* Badge */}
            {badge && (
                <Chip
                    label={badge}
                    color='error'
                    size='small'
                    sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        fontWeight: 600
                    }}
                />
            )}

            <CardContent>
                {/* Header */}
                <Stack direction='row' justifyContent='space-between'>
                    <Box>
                        <Typography fontWeight={700}>{gameName}</Typography>
                        <Typography variant='caption' color='text.secondary'>
                            Kỳ {drawCode}
                        </Typography>
                    </Box>

                    <Typography variant='caption' color='text.secondary'>
                        {drawDate}
                    </Typography>
                </Stack>

                {/* Jackpot */}
                <Box mt={3} textAlign='center'>
                    <Typography variant='caption' color='text.secondary'>
                        Giá trị Jackpot
                    </Typography>
                    <Typography variant='h5' fontWeight={800} color='error.main' mt={0.5}>
                        {jackpot}
                    </Typography>
                </Box>

                {/* Countdown */}
                <Stack direction='row' justifyContent='center' spacing={2} mt={3}>
                    <TimeBox value={countdown.hours} label='Giờ' />
                    <TimeBox value={countdown.minutes} label='Phút' />
                    <TimeBox value={countdown.seconds} label='Giây' highlight />
                </Stack>

                {/* Play button */}
                <Button
                    fullWidth
                    size='large'
                    variant='contained'
                    color='error'
                    sx={{
                        mt: 3,
                        borderRadius: 3,
                        fontWeight: 700
                    }}
                    onClick={onPlay}
                >
                    Chơi ngay →
                </Button>
            </CardContent>
        </Card>
    )
}

/* ---------- Sub component ---------- */

function TimeBox({ value, label, highlight }: { value: number; label: string; highlight?: boolean }) {
    return (
        <Box textAlign='center'>
            <Box
                sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: highlight ? 'error.lighter' : 'grey.100',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    color: highlight ? 'error.main' : 'text.primary'
                }}
            >
                {value}
            </Box>
            <Typography variant='caption' color='text.secondary'>
                {label}
            </Typography>
        </Box>
    )
}
