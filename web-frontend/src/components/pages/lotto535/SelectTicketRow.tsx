import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import CustomDrawer from '../../common/mui/CustomDrawer'
import Ball3D from '../../common/common/Ball3D'
import type { IBall3DColor } from '../../../types/common'

interface Props {
    open: boolean
    onClose: () => void
    onConfirm: (numbers: string[]) => void
    title?: string
    totalNumbers?: number
    selectCount?: number
    ballColor?: IBall3DColor
    initialNumbers?: string[]
}

const SelectTicketRow: React.FC<Props> = (props) => {
    const { t } = useTranslation('common')
    const totalNumbers = props.totalNumbers ?? 35
    const selectCount = props.selectCount ?? 6
    const ballColor = props.ballColor ?? 'blue'

    const [selected, setSelected] = useState<number[]>([])

    useEffect(() => {
        if (props.open) {
            setSelected(
                props.initialNumbers
                    ? props.initialNumbers.map((n) => parseInt(n, 10)).sort((a, b) => a - b)
                    : []
            )
        } else {
            setSelected([])
        }
    }, [props.open])

    const handleToggle = (num: number) => {
        setSelected((prev) => {
            if (prev.includes(num)) return prev.filter((n) => n !== num)
            if (prev.length >= selectCount) return prev
            return [...prev, num].sort((a, b) => a - b)
        })
    }

    const handleRandom = () => {
        const pool = Array.from({ length: totalNumbers }, (_, i) => i + 1)
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
                ;[pool[i], pool[j]] = [pool[j], pool[i]]
        }
        setSelected(pool.slice(0, selectCount))
    }

    const handleReset = () => {
        setSelected([])
    }

    const handleConfirm = () => {
        if (selected.length !== selectCount) return
        const sorted = [...selected].sort((a, b) => a - b)
        props.onConfirm(sorted.map((n) => String(n).padStart(2, '0')))
        setSelected([])
        props.onClose()
    }

    const handleClose = () => {
        setSelected([])
        props.onClose()
    }

    const isComplete = selected.length === selectCount

    return (
        <CustomDrawer
            open={props.open}
            onClose={handleClose}
            title={props.title ?? t('selectTicket.title')}
            footer={
                <Stack direction='row' spacing={1}>
                    <Button variant='outlined' startIcon={<RestartAltIcon />} onClick={handleReset} disabled={selected.length === 0}>
                        {t('selectTicket.reset')}
                    </Button>
                    <Button variant='outlined' startIcon={<ShuffleIcon />} onClick={handleRandom} >
                        {t('selectTicket.random')}
                    </Button>
                    <Button
                        variant='contained'
                        startIcon={<CheckCircleOutlineIcon />}
                        onClick={handleConfirm}
                        disabled={!isComplete}
                        sx={{ flex: 1 }}
                    >
                        {t('selectTicket.confirm')}
                    </Button>
                </Stack>
            }
        >
            <Stack direction='row' alignItems='center' justifyContent='space-between' mb={1.5}>
                <Typography variant='body2' color='text.secondary'>
                    {t('selectTicket.hint', { count: selectCount })}
                </Typography>
                <Chip
                    label={`${selected.length} / ${selectCount}`}
                    color={isComplete ? 'success' : 'default'}
                    size='small'
                    variant={isComplete ? 'filled' : 'outlined'}
                />
            </Stack>

            {/* SECTION - Preview selected balls */}
            <Stack direction='row' spacing={{ xs: 0.5, sm: 0.75 }} mb={2.5}>
                {Array.from({ length: selectCount }).map((_, i) => (
                    <Ball3D
                        key={i}
                        content={selected[i] !== undefined ? String(selected[i]).padStart(2, '0') : undefined}
                        color={selected[i] !== undefined ? ballColor : 'gray'}
                    />
                ))}
            </Stack>

            {/* SECTION - Number picker grid */}
            <Box display='grid' gridTemplateColumns='repeat(7, 1fr)' gap={0.75} pb={9}>
                {Array.from({ length: totalNumbers }, (_, i) => i + 1).map((num) => {
                    const isSelected = selected.includes(num)
                    const isDisabled = !isSelected && selected.length >= selectCount

                    return (
                        <Box
                            key={num}
                            onClick={() => !isDisabled && handleToggle(num)}
                            sx={{
                                aspectRatio: '1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                cursor: isDisabled ? 'not-allowed' : 'pointer',
                                bgcolor: isSelected ? 'primary.main' : 'action.hover',
                                color: isSelected ? 'primary.contrastText' : 'text.primary',
                                fontWeight: 'bold',
                                fontSize: { xs: 13, md: 15 },
                                opacity: isDisabled ? 0.3 : 1,
                                transition: 'background-color 0.15s ease, transform 0.1s ease, opacity 0.15s ease',
                                userSelect: 'none',
                                '&:hover': !isDisabled
                                    ? {
                                        transform: 'scale(1.12)',
                                        bgcolor: isSelected ? 'primary.dark' : 'action.selected'
                                    }
                                    : {}
                            }}
                        >
                            {String(num).padStart(2, '0')}
                        </Box>
                    )
                })}
            </Box>
        </CustomDrawer>
    )
}

export default SelectTicketRow
