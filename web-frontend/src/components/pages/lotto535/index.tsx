import Container from '@mui/material/Container'
import PageHeader from '../../common/layout/PageHeader'
import MarqueeBanner from '../../common/layout/MarqueeBanner'
import Stack from '@mui/material/Stack'
import RowTicket from '../../common/common/RowTicket'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import AddIcon from '@mui/icons-material/Add'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import CustomDrawer from '../../common/mui/CustomDrawer'
import { useState } from 'react'
import RowFavoriteList from '../../common/common/RowFavoriteList'
import EmptyRowTicket from '../../common/common/EmptyRowTicket'

const Lotto535Page: React.FC = () => {
    const { t } = useTranslation('common')
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
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
                    <RowTicket indexText='A' numbers={['01', '60', '12', '01', '60', '12']} color='green' />
                    <RowTicket indexText='B' numbers={['01', '60', '12', '01', '60', '12']} color='green' />
                    <RowTicket indexText='C' numbers={['01', '60', '12', '01', '60', '12']} color='green' />
                    <EmptyRowTicket indexText='D' count={6} />
                    <Button variant='outlined' startIcon={<AddIcon />}>
                        {t('appBarGame.addSequence')} (3)
                    </Button>
                </Stack>
            </Container>
            <AppBar position='fixed' sx={{ top: 'auto', bottom: 0, bgcolor: 'background.paper' }}>
                <Stack direction='row' spacing={2} alignItems='center' justifyContent='center' py={1}>
                    <Button variant='outlined' startIcon={<FavoriteBorderIcon />} onClick={handleOpen}>
                        {t('appBarGame.favoriteList')}
                    </Button>
                    <Button variant='contained' startIcon={<ShoppingCartIcon />}>
                        {t('appBarGame.checkout')}
                    </Button>
                </Stack>
            </AppBar>
            <CustomDrawer open={open} onClose={handleClose} title={t('appBarGame.favoriteList') + ' (3)'}>
                <Stack spacing={1.5}>
                    <RowFavoriteList numbers={['01', '60', '12', '01', '60', '12']} color='green' />
                    <RowFavoriteList numbers={['01', '60', '12', '01', '60', '12']} color='green' />
                    <RowFavoriteList numbers={['01', '60', '12', '01', '60', '12']} color='green' />
                </Stack>
            </CustomDrawer>
        </main>
    )
}

export default Lotto535Page
