import Container from '@mui/material/Container'
import PageHeader from '../../common/layout/PageHeader'
import MarqueeBanner from '../../common/layout/MarqueeBanner'
import Stack from '@mui/material/Stack'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import AddIcon from '@mui/icons-material/Add'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import CustomDrawer from '../../common/mui/CustomDrawer'
import { useState } from 'react'
import FavoriteListRow from '../../common/common/FavoriteListRow'
import EmptyTicketRow from '../../common/common/EmptyTicketRow'
import Typography from '@mui/material/Typography'
import { formatNumberIdxToRowIdx } from '../../../lib/format'

const Lotto535Page: React.FC = () => {
    const { t } = useTranslation('common')
    const [open, setOpen] = useState(false)
    const [emptyTicketRows, setEmptyTicketRows] = useState<(number | null)[][]>([])

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleAddSequence = () => {
        setEmptyTicketRows((prev) => {
            const nextRows = [...prev, [null, null, null, null, null, null]]

            if (nextRows.length >= 9) {
                requestAnimationFrame(() => {
                    window.scrollTo({
                        top: document.documentElement.scrollHeight,
                        behavior: 'smooth'
                    })
                })
            }

            return nextRows
        })
    }

    const handleDeleteSequence = (index: number) => {
        setEmptyTicketRows((prev) => prev.filter((_, i) => i !== index))
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
                    {emptyTicketRows.map((_rowNumbers, index) => (
                        <EmptyTicketRow
                            key={index}
                            indexText={formatNumberIdxToRowIdx(index)}
                            count={6}
                            onDelete={() => handleDeleteSequence(index)}
                        />
                    ))}
                </Stack>
            </Container>
            <AppBar position='fixed' sx={{ top: 'auto', bottom: 0 }}>
                <Stack
                    direction='row'
                    spacing={2}
                    alignItems='center'
                    justifyContent='center'
                    py={1}
                    bgcolor='background.paper'
                >
                    <Button variant='outlined' startIcon={<FavoriteBorderIcon />} onClick={handleOpen}>
                        {t('appBarGame.favoriteList')}
                    </Button>

                    <Button variant='outlined' startIcon={<AddIcon />} onClick={handleAddSequence}>
                        {t('appBarGame.addSequence')} ({emptyTicketRows.length})
                    </Button>
                </Stack>
                <Stack
                    direction='row'
                    spacing={2}
                    alignItems='center'
                    justifyContent='center'
                    py={1}
                    bgcolor='background.paper'
                >
                    <Typography variant='body1' color='text.primary'>
                        123.12$
                    </Typography>
                    <Button variant='contained' startIcon={<ShoppingCartIcon />}>
                        {t('appBarGame.checkout')}
                    </Button>
                </Stack>
            </AppBar>
            <CustomDrawer open={open} onClose={handleClose} title={t('appBarGame.favoriteList') + ' (3)'}>
                <Stack spacing={1.5}>
                    <FavoriteListRow numbers={['01', '60', '12', '01', '60', '12']} color='green' />
                    <FavoriteListRow numbers={['01', '60', '12', '01', '60', '12']} color='green' />
                    <FavoriteListRow numbers={['01', '60', '12', '01', '60', '12']} color='green' />
                </Stack>
            </CustomDrawer>
        </main>
    )
}

export default Lotto535Page
