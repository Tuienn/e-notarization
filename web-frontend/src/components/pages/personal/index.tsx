import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
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
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress />
            </Box>
        )
    }

    if (queryUserProfile.isError) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <Typography color="error">{t('error.loadFailed')}</Typography>
            </Box>
        )
    }

    const user = queryUserProfile.data

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {t('title')}
                </Typography>
                <Box sx={{ mt: 3 }}>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        <strong>{t('name')}:</strong> {user?.name}
                    </Typography>
                    <Typography variant="body1">
                        <strong>{t('email')}:</strong> {user?.email}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    )
}

export default PersonalPage
