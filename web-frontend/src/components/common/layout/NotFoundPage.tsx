import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Link, useRouter } from '@tanstack/react-router'
import svg404 from '../../../assets/svg/404.svg'
import { useTranslation } from 'react-i18next'

const NotFoundPage: React.FC = () => {
    const { t } = useTranslation('layout')
    const router = useRouter()

    return (
        <Stack minHeight='100vh' alignItems='center' justifyContent='center' gap={1.5} px={2}>
            <img src={svg404} alt='404' width={220} />

            <Typography variant='h4' textAlign='center' fontWeight={600}>
                {t('notFound.title')}
            </Typography>

            <Typography variant='body1' color='text.secondary' textAlign='center'>
                {t('notFound.description')}
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} gap={1}>
                <Button onClick={() => router.history.back()} variant='outlined' size='large'>
                    {t('notFound.backButton')}
                </Button>
                <Button component={Link} to='/' variant='contained' size='large'>
                    {t('notFound.homeButton')}
                </Button>
            </Stack>
        </Stack>
    )
}

export default NotFoundPage
