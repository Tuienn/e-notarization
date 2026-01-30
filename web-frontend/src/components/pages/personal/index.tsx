import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AuthService from '../../../services/gin/auth.service'

const PersonalPage: React.FC = () => {
    const { t } = useTranslation('personal')

    const queryUserProfile = useQuery({
        queryKey: ['userProfile'],
        queryFn: () => AuthService.getUserProfile(),
        retry: 1
    })

    if (queryUserProfile.isLoading) {
        return (
            <Box display='flex' justifyContent='center' alignItems='center' minHeight='400px'>
                <CircularProgress />
            </Box>
        )
    }

    if (queryUserProfile.isError) {
        return (
            <Box display='flex' justifyContent='center' alignItems='center' minHeight='400px'>
                <Typography color='error'>{t('error.loadFailed')}</Typography>
            </Box>
        )
    }

    const user = queryUserProfile.data

    return (
        <Box p={3}>
            <Card>
                <Box p={2}>
                    <Stack spacing={2}>
                        <Typography variant='h5' fontWeight='bold'>
                            {t('title')}
                        </Typography>
                        <Stack spacing={1}>
                            <Typography variant='body1'>
                                <strong>{t('fields.name')}:</strong> {user?.name}
                            </Typography>
                            <Typography variant='body1'>
                                <strong>{t('fields.email')}:</strong> {user?.email}
                            </Typography>
                        </Stack>
                    </Stack>
                </Box>
            </Card>
        </Box>
    )
}

export default PersonalPage
