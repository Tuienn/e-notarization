import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useNavigate } from '@tanstack/react-router'
import PageHeader from '../../common/layout/PageHeader'
import MarqueeBanner from '../../common/layout/MarqueeBanner'
import FavoriteListDrawer from '../../common/common/FavoriteListDrawer'
import EmptyTicketRow from '../../common/common/EmptyTicketRow'
import TicketRow from '../../common/common/TicketRow'
import SelectTicketRow from './SelectTicketRow'
import { formatNumberIdxToRowIdx } from '../../../lib/format'

// NOTE - null = empty row awaiting number selection; string[] = confirmed numbers
type ITicketRowData = string[] | null

const PRICE_PER_TICKET = 10 // USD per confirmed ticket row
const DEFAULT_ROWS: ITicketRowData[] = [null, null, null]

const Lotto535Page: React.FC = () => {
    const { t } = useTranslation('common')
    const navigate = useNavigate()

    const [ticketRows, setTicketRows] = useState<ITicketRowData[]>(DEFAULT_ROWS)

    const totalPrice = useMemo(() => {
        const confirmedCount = ticketRows.filter((row) => row !== null).length
        return (confirmedCount * PRICE_PER_TICKET).toFixed(2)
    }, [ticketRows])
    const totalTickets = useMemo(() => ticketRows.filter((row) => row !== null).length, [ticketRows])
    const [favoriteDrawerOpen, setFavoriteDrawerOpen] = useState(false)
    const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null)

    const handleOpenFavorites = () => setFavoriteDrawerOpen(true)
    const handleCloseFavorites = () => setFavoriteDrawerOpen(false)

    const handleOpenSelect = (index: number) => setEditingRowIndex(index)
    const handleCloseSelect = () => setEditingRowIndex(null)

    const handleAddSequence = () => {
        setTicketRows((prev) => {
            const next = [...prev, null]
            if (next.length >= 9) {
                requestAnimationFrame(() => {
                    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
                })
            }
            return next
        })
    }

    const handleDeleteRow = (index: number) => {
        setTicketRows((prev) => prev.filter((_, i) => i !== index))
    }

    const handleRandomRow = (index: number) => {
        const pool = Array.from({ length: 35 }, (_, i) => i + 1)
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[pool[i], pool[j]] = [pool[j], pool[i]]
        }
        const numbers = pool.slice(0, 6).sort((a, b) => a - b).map((n) => String(n).padStart(2, '0'))
        setTicketRows((prev) => prev.map((row, i) => (i === index ? numbers : row)))
    }

    const handleConfirmNumbers = (numbers: string[]) => {
        if (editingRowIndex === null) return
        setTicketRows((prev) => prev.map((row, i) => (i === editingRowIndex ? numbers : row)))
    }

    const handleApplyFavorite = (numbers: string[]) => {
        setTicketRows((prev) => {
            const emptyIndex = prev.findIndex((row) => row === null)
            if (emptyIndex !== -1) {
                return prev.map((row, i) => (i === emptyIndex ? numbers : row))
            }
            return [...prev, numbers]
        })
    }

    const handleCheckout = () => {
        navigate({
            to: '/checkout-bill',
            search: {
                game: 'Lotto 5/35',
                tickets: totalTickets,
                total: Number(totalPrice)
            }
        })
    }

    return (
        <main>
            <PageHeader title='Lotto 5/35' hasBackButton />
            <MarqueeBanner
                content={[
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                ]}
            />
            <Container className='children-main-layout' maxWidth='lg'>
                <Stack spacing={1.5}>
                    {ticketRows.map((row, index) =>
                        row === null ? (
                            <EmptyTicketRow
                                key={index}
                                indexText={formatNumberIdxToRowIdx(index)}
                                count={6}
                                onDelete={() => handleDeleteRow(index)}
                                onSelectNumbers={() => handleOpenSelect(index)}
                                onRandom={() => handleRandomRow(index)}
                                isEditing={editingRowIndex === index}
                            />
                        ) : (
                            <TicketRow
                                key={index}
                                indexText={formatNumberIdxToRowIdx(index)}
                                numbers={row}
                                color='blue'
                                gameType='lotto535'
                                isEditing={editingRowIndex === index}
                                onEdit={() => handleOpenSelect(index)}
                                onDelete={() => handleDeleteRow(index)}
                            />
                        )
                    )}
                </Stack>
            </Container>

            <AppBar position='fixed' sx={{ top: 'auto', bottom: 0, backgroundColor: 'background.paper' }} component={'footer'}>
                <Container>
                    <Stack
                        gap={1}
                        py={1}
                    >
                        <Stack
                            direction='row'
                            spacing={2}
                            justifyContent={'center'}
                        >
                            <Button variant='outlined' startIcon={<FavoriteBorderIcon />} onClick={handleOpenFavorites}>
                                {t('appBarGame.favoriteList')}
                            </Button>
                            <Button variant='outlined' startIcon={<AddIcon />} onClick={handleAddSequence}>
                                {t('appBarGame.addSequence')} ({ticketRows.length})
                            </Button>
                        </Stack>
                        <Stack direction='row' spacing={2}>
                            <Stack spacing={0} minWidth={120}>
                                <Typography variant='caption' color='text.secondary' lineHeight={1.2}>
                                    {t('appBarGame.estimatedPrice')}
                                </Typography>
                                <Typography
                                    variant='h6'
                                    fontWeight='bold'
                                    color='primary.main'
                                    lineHeight={1.3}
                                    letterSpacing={0.5}
                                >
                                    {totalPrice}$
                                </Typography>
                            </Stack>
                            <Button
                                variant='contained'
                                startIcon={<ShoppingCartIcon />}
                                sx={{ flex: 1 }}
                                size='large'
                                onClick={handleCheckout}
                            >
                                {t('appBarGame.checkout')}
                            </Button>
                        </Stack>
                    </Stack>
                </Container>
            </AppBar>

            {/* SECTION - Favorite list drawer */}
            <FavoriteListDrawer
                open={favoriteDrawerOpen}
                onClose={handleCloseFavorites}
                gameType='lotto535'
                onApply={handleApplyFavorite}
            />

            {/* SECTION - Number selection drawer */}
            <SelectTicketRow
                open={editingRowIndex !== null}
                onClose={handleCloseSelect}
                onConfirm={handleConfirmNumbers}
                totalNumbers={35}
                selectCount={6}
                ballColor='blue'
                title={editingRowIndex !== null ? t('selectTicket.title') + ' (' + formatNumberIdxToRowIdx(editingRowIndex) + ')' : undefined}
                initialNumbers={
                    editingRowIndex !== null && ticketRows[editingRowIndex] !== null
                        ? (ticketRows[editingRowIndex] as string[])
                        : undefined
                }
            />
        </main>
    )
}

export default Lotto535Page
