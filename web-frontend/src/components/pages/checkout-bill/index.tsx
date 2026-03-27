import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import PaidIcon from '@mui/icons-material/Paid'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import { useTranslation } from 'react-i18next'
import { Route } from '../../../routes/checkout-bill'
import PageHeader from '../../common/layout/PageHeader'
import { useNotify } from '../../../stores/notification/notification.selector'

const CheckoutBillPage: React.FC = () => {
    const { t } = useTranslation('common')
    const { game, tickets, total } = Route.useSearch()
    const notify = useNotify()

    const handlePay = () => {
        // NOTE - Demo action only
        notify(t('checkoutBill.demoMode'), 'success')
    }

    return (
        <main>
            <PageHeader title={t('checkoutBill.title')} hasBackButton />
            <Container maxWidth='md' sx={{ py: { xs: 2, md: 4 } }}>
                <Stack spacing={2.5}>
                    <Box
                        sx={{
                            borderRadius: 4,
                            p: { xs: 2, md: 3 },
                            background:
                                'linear-gradient(145deg, rgba(var(--mui-palette-primary-mainChannel) / 0.11), rgba(var(--mui-palette-secondary-mainChannel) / 0.09))',
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow: '0 16px 36px rgba(0,0,0,0.10)',
                            animation: 'fadeSlideIn .45s ease',
                            '@keyframes fadeSlideIn': {
                                from: { opacity: 0, transform: 'translateY(12px)' },
                                to: { opacity: 1, transform: 'translateY(0)' }
                            }
                        }}
                    >
                        <Stack direction='row' justifyContent='space-between' alignItems='center' mb={2}>
                            <Typography variant='h5' fontWeight={800}>
                                {t('checkoutBill.title')}
                            </Typography>
                        </Stack>

                        <Stack spacing={1.5}>
                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                <Stack direction='row' spacing={1} alignItems='center'>
                                    <SportsEsportsIcon color='primary' fontSize='small' />
                                    <Typography color='text.secondary'>{t('checkoutBill.gameName')}</Typography>
                                </Stack>
                                <Typography fontWeight={700}>{game}</Typography>
                            </Stack>

                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                <Stack direction='row' spacing={1} alignItems='center'>
                                    <ConfirmationNumberIcon color='primary' fontSize='small' />
                                    <Typography color='text.secondary'>{t('checkoutBill.ticketCount')}</Typography>
                                </Stack>
                                <Typography fontWeight={700}>{tickets}</Typography>
                            </Stack>

                            <Divider />

                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                <Stack direction='row' spacing={1} alignItems='center'>
                                    <PaidIcon color='success' fontSize='small' />
                                    <Typography color='text.secondary'>{t('checkoutBill.totalAmount')}</Typography>
                                </Stack>
                                <Typography
                                    variant='h4'
                                    fontWeight={900}
                                    color='success.main'
                                    sx={{ textShadow: '0 3px 10px rgba(46,125,50,0.25)' }}
                                >
                                    {total.toFixed(2)}$
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>

                    <Button
                        variant='contained'
                        startIcon={<CreditCardIcon />}
                        size='large'
                        onClick={handlePay}
                        sx={{
                            py: 1.2,
                            fontWeight: 800,
                            borderRadius: 999,
                            textTransform: 'none',
                            boxShadow: '0 14px 26px rgba(25,118,210,0.35)',
                            transition: 'transform .2s ease, box-shadow .2s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 18px 30px rgba(25,118,210,0.45)'
                            }
                        }}
                    >
                        {t('checkoutBill.payNow')}
                    </Button>
                </Stack>
            </Container>
        </main>
    )
}

export default CheckoutBillPage
